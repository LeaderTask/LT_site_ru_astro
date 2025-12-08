import type { Collection } from 'tinacms';

export const ChecklistsCollection: Collection = {
	name: 'checklists',
	label: 'Чек-листы',
	path: 'src/content/checklists',
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
		{ type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
		{ type: 'image', name: 'coverImage', label: 'Cover Image' },
		{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
	],
};
