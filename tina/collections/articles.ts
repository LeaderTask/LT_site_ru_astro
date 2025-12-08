import type { Collection } from 'tinacms';
import { richTextTemplates } from '../fields-configs/rich-text.config';

export const ArticlesCollection: Collection = {
	name: 'articles',
	label: 'Articles',
	path: 'src/content/articles',
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
			required: false,
		},
		{
			type: 'string',
			name: 'h1',
			label: 'H1',
			required: false,
		},
		{
			type: 'string',
			name: 'breadcrumb',
			label: 'Breadcrumb',
			required: false,
		},
		{
			type: 'datetime',
			name: 'date',
			label: 'Date',
			required: true,
		},
		{
			type: 'datetime',
			name: 'updatedAt',
			label: 'Updated At',
		},
		{
			type: 'reference',
			name: 'author',
			label: 'Author',
			collections: ['authors'],
			ui: {
				optionComponent: (props: { firstName?: string; lastName?: string }, _internalSys: { path: string }) => {
					const fullName = props.firstName && props.lastName ? `${props.firstName} ${props.lastName}` : _internalSys.path;
					return fullName;
				},
			},
		},
		{
			type: 'string',
			name: 'description',
			label: 'Description',
			description: 'Meta description for SEO',
			required: false,
			ui: {
				component: 'textarea',
			},
		},
		{
			type: 'image',
			name: 'coverImage',
			label: 'Cover Image',
		},
		{
			type: 'boolean',
			name: 'isFollow',
			label: 'Is Follow',
			description: 'Is follow the page',
		},
		{
			type: 'object',
			name: 'tags',
			label: 'Tags',
			list: true,
			ui: {
				itemProps: (item) => {
					const tagName = item?.tag?.split('/').pop()?.replace('.mdx', '') || 'Untitled Tag';
					return { label: tagName };
				},
			},
			fields: [
				{
					type: 'reference',
					name: 'tag',
					label: 'Tag',
					collections: ['tags'],
					ui: {
						optionComponent: (props: { title?: string }, _internalSys: { path: string }) => {
							return props.title || _internalSys.path;
						},
					},
				},
			],
		},
		{
			type: 'rich-text',
			name: 'body',
			label: 'Body',
			isBody: true,
			templates: richTextTemplates,
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
		{
			type: 'object',
			name: 'recommendation',
			label: 'Recommendation',
			list: true,
			ui: {
				max: 3,
				itemProps: (item) => {
					const articleTitle = item?.article?.split('/').pop()?.replace('.mdx', '') || 'Untitled Article';
					return { label: articleTitle };
				},
			},
			fields: [
				{
					type: 'reference',
					name: 'article',
					label: 'Article',
					collections: ['articles'],
					ui: {
						optionComponent: (props: { title?: string }, _internalSys: { path: string }) => {
							return props.title || _internalSys.path;
						},
					},
				},
			],
		},
	],
};
