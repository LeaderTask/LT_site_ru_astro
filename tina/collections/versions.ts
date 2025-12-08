import type { Collection } from 'tinacms';
import { richTextTemplates } from '../fields-configs/rich-text.config';

export const VersionsCollection: Collection = {
	name: 'versions',
	label: 'Versions',
	path: 'src/content/versions',
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
			label: 'Title',
			isTitle: true,
			required: true,
		},
		{
			type: 'datetime',
			name: 'date',
			label: 'Date',
			required: true,
		},
		{
			type: 'string',
			name: 'type',
			label: 'Type',
			required: true,
			options: ['Mobile', 'Windows', 'Web app'],
		},
		{
			type: 'rich-text',
			name: 'body',
			label: 'Body',
			isBody: true,
			templates: richTextTemplates,
		},
		{
			type: 'string',
			name: 'linkableHeadings',
			label: 'Linkable Headings',
			list: true,
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		},
		{
			type: 'object',
			name: 'rightSidebar',
			label: 'Right Sidebar',
			fields: [
				{
					type: 'string',
					name: 'title',
					label: 'Title',
				},
				{
					type: 'string',
					name: 'description',
					label: 'Description',
				},
				{
					type: 'string',
					name: 'linkText',
					label: 'Link Text',
				},
				{
					type: 'string',
					name: 'linkUrl',
					label: 'Link URL',
				},
			],
		},
	],
};
