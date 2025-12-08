import type { Collection } from 'tinacms';

export const VacanciesCollection: Collection = {
	name: 'vacancies',
	label: 'Вакансии',
	path: 'src/content/vacancies',
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
		{ type: 'string', name: 'department', label: 'Department' },
		{ type: 'string', name: 'location', label: 'Location' },
		{ type: 'string', name: 'format', label: 'Format' },
		{ type: 'string', name: 'salary', label: 'Salary' },
		{ type: 'string', name: 'description', label: 'Description', ui: { component: 'textarea' } },
		{ type: 'rich-text', name: 'body', label: 'Body', isBody: true },
	],
};
