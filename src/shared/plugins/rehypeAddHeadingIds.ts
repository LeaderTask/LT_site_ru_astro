import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

export const rehypeAddHeadingIds: Plugin<[]> = () => (tree) => {
	const textToSlug = (text: string): string => {
		return text
			.trim()
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '');
	};

	const slugCounts: Record<string, number> = {};

	visit(tree, (node) => {
		if (node.type === 'element' && 'tagName' in node && typeof node.tagName === 'string') {
			const tagName = node.tagName.toLowerCase();
			if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
				const textContent = extractTextContent(node);
				if (textContent) {
					const baseSlug = textToSlug(textContent);
					const count = slugCounts[baseSlug] || 0;
					const finalSlug = count === 0 ? baseSlug : `${baseSlug}-${count}`;

					slugCounts[baseSlug] = count + 1;

					if (!node.properties) {
						node.properties = {};
					}
					node.properties.id = finalSlug;
				}
			}
		}
	});
};

function extractTextContent(node: any): string {
	if (node.type === 'text') {
		return node.value || '';
	}

	if (node.children && Array.isArray(node.children)) {
		return node.children.map(extractTextContent).join('');
	}

	return '';
}
