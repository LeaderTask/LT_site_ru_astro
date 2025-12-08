import type { Template } from 'tinacms';

export const richTextTemplates: Template[] = [
	{
		name: 'img',
		label: 'Image',
		ui: {
			itemProps: (item) => {
				return { label: `Image: ${item?.alt || 'Untitled'}` };
			},
		},
		fields: [
			{
				name: 'src',
				label: 'Image',
				type: 'image',
				required: true,
			},
			{
				name: 'alt',
				label: 'Alt Text',
				type: 'string',
			},
			{
				name: 'variant',
				label: 'Variant',
				type: 'string',
				options: ['full', 'short', 'icon'],
			},
		],
	},
	{
		name: 'button',
		label: 'Button',
		ui: {
			itemProps: (item) => {
				return { label: `Button: ${item?.text || 'Click'}` };
			},
			defaultItem: {
				variant: 'primary',
				size: 'md',
				target: '_self',
			},
		},
		fields: [
			{
				name: 'text',
				label: 'Button Text',
				type: 'string',
				required: true,
			},
			{
				name: 'url',
				label: 'URL',
				type: 'string',
				required: true,
			},
			{
				name: 'variant',
				label: 'Variant',
				type: 'string',
				options: ['primary', 'secondary', 'primary-stroke', 'dark', 'white'],
			},
			{
				name: 'size',
				label: 'Size',
				type: 'string',
				options: ['sm', 'md', 'lg'],
			},
			{
				name: 'target',
				label: 'Target',
				type: 'string',
				options: ['_self', '_blank'],
			},
			{
				name: 'center',
				label: 'Center',
				type: 'boolean',
			},
			{
				name: 'class',
				label: 'Custom CSS Class',
				type: 'string',
			},
		],
	},
	{
		name: 'ctablock',
		label: 'CTA Block',
		ui: {
			itemProps: (item) => {
				return { label: `CTA: ${item?.title || 'Call to Action'}` };
			},
		},
		fields: [
			{
				name: 'title',
				label: 'Title',
				type: 'string',
			},
			{
				name: 'description',
				label: 'Description',
				type: 'string',
			},
			{
				name: 'buttonText',
				label: 'Button Text',
				type: 'string',
			},
			{
				name: 'buttonLink',
				label: 'Button Link',
				type: 'string',
			},
		],
	},
	{
		name: 'imgblock',
		label: 'Image Block',
		ui: {
			itemProps: (item) => {
				return { label: `Image Block: ${item?.text || 'No Text'}` };
			},
			defaultItem: {
				textPosition: 'right',
				textType: 'p',
			},
		},
		fields: [
			{
				name: 'src',
				label: 'Image',
				type: 'image',
				required: true,
			},
			{
				name: 'alt',
				label: 'Alt Text',
				type: 'string',
			},
			{
				name: 'variant',
				label: 'Variant',
				type: 'string',
				options: ['full', 'short', 'icon'],
			},
			{
				name: 'text',
				label: 'Text',
				type: 'string',
				required: true,
			},
			{
				name: 'textPosition',
				label: 'Text Position',
				type: 'string',
				options: ['left', 'right'],
			},
			{
				name: 'textType',
				label: 'Text Type',
				type: 'string',
				options: ['p', 'a'],
			},
			{
				name: 'href',
				label: 'Link URL',
				type: 'string',
			},
		],
	},
	{
		name: 'customlink',
		label: 'Custom Link',
		ui: {
			itemProps: (item) => {
				return { label: `Link: ${item?.text || 'Untitled'}` };
			},
			defaultItem: {
				target: '_self',
			},
		},
		fields: [
			{
				name: 'href',
				label: 'URL',
				type: 'string',
				required: true,
			},
			{
				name: 'text',
				label: 'Link Text',
				type: 'string',
				required: true,
			},
			{
				name: 'target',
				label: 'Target',
				type: 'string',
				options: ['_self', '_blank'],
			},
			{
				name: 'rel',
				label: 'Rel',
				type: 'string',
			},
			{
				name: 'aria_label',
				nameOverride: 'aria-label',
				label: 'Aria Label',
				type: 'string',
			},
			{
				name: 'title',
				label: 'Title',
				type: 'string',
			},
		],
	},
	{
		name: 'headinglink',
		label: 'Heading Link',
		ui: {
			itemProps: (item) => {
				return { label: `Heading: ${item?.text || 'Untitled'}` };
			},
			defaultItem: {
				level: 'h3',
			},
		},
		fields: [
			{
				name: 'level',
				label: 'Level',
				type: 'string',
				options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			},
			{
				name: 'href',
				label: 'URL',
				type: 'string',
				required: true,
			},
			{
				name: 'text',
				label: 'Text',
				type: 'string',
				required: true,
			},
			{
				name: 'id',
				label: 'ID',
				type: 'string',
			},
			{
				name: 'target',
				label: 'Target',
				type: 'string',
				options: ['_self', '_blank'],
			},
		],
	},
	{
		name: 'faqblock',
		label: 'FAQ Block',
		ui: {
			itemProps: (item) => {
				return { label: `FAQ: ${item?.question || 'Untitled'}` };
			},
		},
		fields: [
			{
				name: 'question',
				label: 'Question',
				type: 'string',
				required: true,
			},
			{
				name: 'answer',
				label: 'Answer',
				type: 'string',
				required: true,
			},
			{
				name: 'userName',
				label: 'User Name',
				type: 'string',
			},
			{
				name: 'userAvatar',
				label: 'User Avatar',
				type: 'image',
			},
		],
	},
];
