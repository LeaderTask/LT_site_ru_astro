import type { Collection } from 'tinacms';

export const AuthorsCollection: Collection = {
	name: 'authors',
	label: 'Authors',
	path: 'src/content/authors',
	format: 'mdx',
	ui: {
		filename: {
			slugify: (values: Record<string, unknown>) => {
				const firstName = typeof values?.firstName === 'string' ? values.firstName : '';
				const lastName = typeof values?.lastName === 'string' ? values.lastName : '';
				const fullName = `${firstName}-${lastName}`.toLowerCase();
				return fullName.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
			},
		},
	},
	fields: [
		{
			type: 'string',
			name: 'firstName',
			label: 'Имя',
			required: true,
		},
		{
			type: 'string',
			name: 'lastName',
			label: 'Фамилия',
			required: true,
		},
		{
			type: 'string',
			name: 'position',
			label: 'Должность',
		},
		{
			type: 'string',
			name: 'bio',
			label: 'Описание',
			ui: {
				component: 'textarea',
			},
		},
		{
			type: 'string',
			name: 'description',
			label: 'SEO description',
			description: 'Meta description for SEO',
			ui: {
				component: 'textarea',
			},
		},
		{
			type: 'image',
			name: 'avatar',
			label: 'Аватар',
		},
		{
			type: 'boolean',
			name: 'isFollow',
			label: 'Is Follow',
			description: 'Is follow the page',
		},
	],
};
