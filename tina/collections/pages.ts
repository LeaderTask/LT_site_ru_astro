import type { Collection } from 'tinacms';
import { richTextTemplates } from '../fields-configs/rich-text.config';

export const PageCollection: Collection = {
	name: 'pages',
	label: 'Pages',
	path: 'src/content/pages',
	format: 'mdx',
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Title',
			isTitle: true,
			required: true,
		},
		{
			type: 'string',
			name: 'slug',
			label: 'Slug',
			required: true,
			description: 'URL path for the page (e.g., "about", "platforms/windows")',
		},
		{
			type: 'datetime',
			name: 'date',
			label: 'Date',
			required: true,
		},
		{
			type: 'string',
			name: 'description',
			label: 'Description',
			description: 'Meta description for SEO',
		},
		{
			type: 'boolean',
			name: 'isFollow',
			label: 'Is Follow',
			description: 'Is follow the page',
		},
		{
			type: 'string',
			name: 'keywords',
			label: 'Keywords',
			description: 'SEO keywords (comma-separated)',
		},
		{
			type: 'boolean',
			name: 'setBody',
			label: 'Set Body',
			description: 'Set the body for the page',
		},
		{
			type: 'rich-text',
			name: 'body',
			label: 'Body',
			isBody: true,
			templates: richTextTemplates,
		},
	],
};
