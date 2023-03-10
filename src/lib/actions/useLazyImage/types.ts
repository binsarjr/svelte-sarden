export interface LazyImageOptions {
	root: Element | Document | null | undefined;
	rootMargin: string;
	threshold: number;
	msCache: number;
	cache: boolean;
}
