import type { Collection } from 'tinacms';

export const AuthorsCollection: Collection = {
	name: 'authors',
	label: 'Authors',
	path: 'src/content/authors',
	format: 'mdx',
	ui: {
		filename: {
			slugify: (values: Record<string, unknown>) => {
				const transliterate = (text: string): string => {
					const cyrillicToLatin: Record<string, string> = {
						а: 'a',
						б: 'b',
						в: 'v',
						г: 'g',
						д: 'd',
						е: 'e',
						ё: 'yo',
						ж: 'zh',
						з: 'z',
						и: 'i',
						й: 'y',
						к: 'k',
						л: 'l',
						м: 'm',
						н: 'n',
						о: 'o',
						п: 'p',
						р: 'r',
						с: 's',
						т: 't',
						у: 'u',
						ф: 'f',
						х: 'h',
						ц: 'ts',
						ч: 'ch',
						ш: 'sh',
						щ: 'sch',
						ъ: '',
						ы: 'y',
						ь: '',
						э: 'e',
						ю: 'yu',
						я: 'ya',
						А: 'A',
						Б: 'B',
						В: 'V',
						Г: 'G',
						Д: 'D',
						Е: 'E',
						Ё: 'Yo',
						Ж: 'Zh',
						З: 'Z',
						И: 'I',
						Й: 'Y',
						К: 'K',
						Л: 'L',
						М: 'M',
						Н: 'N',
						О: 'O',
						П: 'P',
						Р: 'R',
						С: 'S',
						Т: 'T',
						У: 'U',
						Ф: 'F',
						Х: 'H',
						Ц: 'Ts',
						Ч: 'Ch',
						Ш: 'Sh',
						Щ: 'Sch',
						Ъ: '',
						Ы: 'Y',
						Ь: '',
						Э: 'E',
						Ю: 'Yu',
						Я: 'Ya',
					};
					return text
						.split('')
						.map((char) => cyrillicToLatin[char] || char)
						.join('');
				};

				const firstName = typeof values?.firstName === 'string' ? values.firstName : '';
				const lastName = typeof values?.lastName === 'string' ? values.lastName : '';
				const fullName = `${firstName}-${lastName}`;
				const transliterated = transliterate(fullName);
				const slug = transliterated
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/[^a-z0-9-]/g, '')
					.replace(/-+/g, '-')
					.replace(/^-+|-+$/g, '');

				if (!slug || slug.length === 0) {
					return 'author';
				}

				return slug;
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
