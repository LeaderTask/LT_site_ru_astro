/// <reference types="astro/client" />

declare module '*.mdx' {
	let MDXComponent: typeof import('astro').MarkdownInstance;
	export default MDXComponent;
}

declare module 'astro' {
	interface AstroBuiltin {
		button: typeof import('@tina/components/Button.astro').default;
		ctablock: typeof import('@tina/components/CtaBlock.astro').default;
		img: typeof import('@tina/components/Img.astro').default;
		imgblock: typeof import('@tina/components/ImgBlock.astro').default;
	}
}
