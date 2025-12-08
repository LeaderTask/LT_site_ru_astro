import eslintJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
	eslintJs.configs.recommended,
	{
		ignores: ['dist/**', 'node_modules/**', '.astro/**', 'tina/__generated__/**'],
	},
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				project: './tsconfig.json',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			...tseslint.configs.recommended.rules,
		},
	},
	{
		files: ['**/*.astro'],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
			},
		},
		plugins: {
			astro: astroPlugin,
		},
		rules: {
			...astroPlugin.configs.recommended.rules,
		},
	},
	...vuePlugin.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			'vue/require-default-prop': 'off',
			'no-undef': 'off',
			ignorePattern: '^html',
			'vue/multi-word-component-names': 'off',
			'vue/attribute-hyphenation': 'off',
		},
	},
	{
		plugins: {
			prettier: prettier,
		},
		rules: {
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 4,
					singleQuote: true,
					semi: true,
					trailingComma: 'es5',
					printWidth: 132,
					arrowParens: 'always',
					endOfLine: 'lf',
					singleAttributePerLine: true,
					vueIndentScriptAndStyle: true,
				},
			],
		},
	},
	prettierConfig,
];
