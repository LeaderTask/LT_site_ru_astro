/* eslint-env node */
/* global process */
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function onRequest(context: any, next: () => Promise<Response>) {
	const url = new URL(context.request.url);
	const pathname = url.pathname;

	if (pathname.match(/\.(png|jpg|jpeg)$/i)) {
		const webpPath = pathname.replace(/\.(png|jpg|jpeg)$/i, '.webp');
		const webpPathNormalized = webpPath.startsWith('/') ? webpPath.slice(1) : webpPath;

		const distDir = join(process.cwd(), 'dist', webpPathNormalized);
		const publicDir = join(process.cwd(), 'public', webpPathNormalized);

		const webpFile = existsSync(join(process.cwd(), 'dist')) ? distDir : publicDir;

		if (existsSync(webpFile)) {
			return context.redirect(webpPath, 301);
		}
	}

	const response = await next();

	if (response instanceof Response) {
		const contentType = response.headers.get('content-type') || '';

		if (contentType.includes('text/html')) {
			const newHeaders = new Headers(response.headers);
			newHeaders.set('Cache-Control', 'public, max-age=3600, must-revalidate');
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders,
			});
		}

		if (contentType.includes('text/css') || contentType.includes('application/javascript')) {
			const newHeaders = new Headers(response.headers);
			newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders,
			});
		}

		if (pathname.match(/\.(webp|woff2|woff|ttf|svg)$/i)) {
			const newHeaders = new Headers(response.headers);
			newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
			return new Response(response.body, {
				status: response.status,
				statusText: response.statusText,
				headers: newHeaders,
			});
		}
	}

	return response;
}
