import type { Collection } from 'tinacms';

export const ClientsCollection: Collection = {
	name: 'clients',
	label: 'Клиенты',
	path: 'src/content/clients',
	format: 'mdx',
	ui: {
		filename: {
			slugify: (values: Record<string, unknown>) => {
				const slug = typeof values?.slug === 'string' ? values.slug : '';
				return slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
			},
		},
	},
	fields: [
		{ type: 'string', name: 'title', label: 'Title', isTitle: true, required: true },
		{ type: 'string', name: 'slug', label: 'Slug' },
		{ type: 'string', name: 'industry', label: 'Industry' },
		{ type: 'image', name: 'logo', label: 'Logo' },
		{ type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
		{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
	],
};

