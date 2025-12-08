import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const rehypeAutoImportComponents: Plugin<[]> = () => (tree) => {
	const tagMapping: Record<string, string> = {
		button: 'Button',
		ctablock: 'CtaBlock',
		img: 'Img',
		imgblock: 'ImgBlock',
		customlink: 'CustomLink',
		faqblock: 'FaqBlock',
		headinglink: 'HeadingLink',
	};

	visit(tree, (node) => {
		if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
			if ('name' in node && typeof node.name === 'string' && tagMapping[node.name.toLowerCase()]) {
				node.name = tagMapping[node.name.toLowerCase()];
			}
		}

		if (node.type === 'element' && 'tagName' in node && typeof node.tagName === 'string') {
			if (tagMapping[node.tagName.toLowerCase()]) {
				node.tagName = tagMapping[node.tagName.toLowerCase()];
			}
		}
	});
};
