import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	const image = url.searchParams.get('url')?.toString() || '';
	const resp = await fetch(image);
	await new Promise((resolve) => setTimeout(resolve, 2000));
	// @ts-ignore
	return new Response(await resp.blob(), {
		headers: {
			'cache-control': 'no-cache'
		}
	});
};
