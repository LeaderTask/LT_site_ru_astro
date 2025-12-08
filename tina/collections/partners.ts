import type { Collection } from 'tinacms';

export const PartnersCollection: Collection = {
	name: 'partners',
	label: 'Партнеры',
	path: 'src/content/partners',
	format: 'mdx',
	ui: {
		filename: {
			slugify: (values: Record<string, unknown>) => {
				const slug = typeof values?.slug === 'string' ? values.slug : '';
				return slug
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, '');
			},
		},
	},
	fields: [
		{ type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
		{ type: 'string', name: 'slug', label: 'Slug' },
		{ type: 'string', name: 'website', label: 'Website' },
		{ type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
		{ type: 'image', name: 'logo', label: 'Logo' },
		{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
	],
};
