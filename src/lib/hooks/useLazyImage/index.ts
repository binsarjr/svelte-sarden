import type { LazyImageOptions } from './types'

const imageComplete = (imageURL: string) =>
	new Promise((resolve, reject) => {
		let image = new Image();
		image.onload = () => resolve(image);
		image.onerror = () => reject(image);

		image.src = imageURL;
	});

const promiseTimeout = async (ms: number, promise: Promise<any>, timeoutMessage?: string) => {
	let timerID: any;

	const timer = new Promise((resolve, reject) => {
		timerID = setTimeout(() => reject(timeoutMessage), ms);
	});

	const result = await Promise.race([promise, timer]);
	clearTimeout(timerID);
	return result;
};

export function lazyimage(
	node: HTMLImageElement,
	{
		root = null,
		rootMargin = '0px 0px 0px 0px',
		threshold = 0.0,
		msCache = 25,
		cache = true
	}: Partial<LazyImageOptions> = {}
) {
	const dataSrc = node.dataset?.src as string;
	const dataAlt = (node.dataset?.alt || node.getAttribute('alt')) as string;

	node.setAttribute('alt', dataAlt);

	const imageLoadOrCache = async () => {
		if (cache) {
			try {
				// check has cache when try get img under msCachhe milliseconds. if true, that perfectfly cached
				await promiseTimeout(msCache, imageComplete(dataSrc), 'Not Loaded from cache');
				node.src = dataSrc;
				node.dispatchEvent(new CustomEvent('cacheload'));
			} catch (e) {
				node.src = dataSrc;
				node.dispatchEvent(new CustomEvent('imgload'));
			}
		} else {
			node.src = dataSrc;
			setTimeout(() => {
				// i don't know why if not do like this. event dispatch imgload from this else scope not working well
				node.dispatchEvent(new CustomEvent('imgload'));
			}, 0);
		}
	};

	// 	if intersection observer support
	if (window && 'IntersectionObserver' in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(async (entry) => {
					if (entry.isIntersecting && entry.target === node) {
						const image = entry.target as HTMLImageElement;

						if (image.dataset.src) {
							await imageLoadOrCache();
						}

						if (image.dataset.srcset) {
							image.srcset = image.dataset.srcset;
						}

						observer.unobserve(image);
					}
				});
			},
			{
				root,
				rootMargin,
				threshold
			}
		);
		observer.observe(node);

		return {
			update(options: Partial<LazyImageOptions>) {
				if (options?.cache) cache = options.cache;
				if (options?.msCache) msCache = options.msCache;
				if (options?.root) root = options.root;
				if (options?.rootMargin) rootMargin = options.rootMargin;
				if (options?.threshold) threshold = options.threshold;
			},
			destroy() {
				if (observer) {
					observer.unobserve(node);
				}
			}
		};
	} else {
		imageLoadOrCache();
	}
}
