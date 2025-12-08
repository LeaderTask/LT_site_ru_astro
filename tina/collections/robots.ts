import type { Collection } from 'tinacms';

export const RobotsCollection: Collection = {
	name: 'robots',
	label: 'Robots.txt',
	path: 'src/content/robots',
	format: 'md',
	ui: {
		filename: {
			readonly: true,
			slugify: () => 'robots',
		},
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Title',
			isTitle: true,
			required: true,
			ui: {
				component: 'hidden',
			},
		},
		{
			type: 'string',
			name: 'body',
			label: 'Содержимое',
			isBody: true,
			ui: {
				component: 'textarea',
			},
		},
	],
};
