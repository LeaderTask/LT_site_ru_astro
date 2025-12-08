import type { Collection } from 'tinacms';

export const CasesCollection: Collection = {
	name: 'cases',
	label: 'Кейсы',
	path: 'src/content/cases',
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
		{ type: 'datetime', name: 'date', label: 'Date' },
		{ type: 'string', name: 'industry', label: 'Industry' },
		{ type: 'string', name: 'company', label: 'Company' },
		{ type: 'string', name: 'author', label: 'Author' },
		{ type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
		{ type: 'image', name: 'coverImage', label: 'Cover Image' },
		{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
	],
};

