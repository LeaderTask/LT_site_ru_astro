import type { Collection } from 'tinacms';

export const TagsCollection: Collection = {
	name: 'tags',
	label: 'Tags',
	path: 'src/content/tags',
	format: 'mdx',
	ui: {
		filename: {
			slugify: (values: Record<string, unknown>) => {
				const title = typeof values?.title === 'string' ? values.title : '';
				return title
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, '');
			},
		},
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Tag Name',
			required: true,
		},
	],
};
