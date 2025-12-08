import { defineConfig } from 'tinacms';
import {
	AuthorsCollection,
	PageCollection,
	ArticlesCollection,
	TagsCollection,
	VersionsCollection,
	RobotsCollection,
	CasesCollection,
	ComparisonsCollection,
	PartnersCollection,
	VacanciesCollection,
	ClientsCollection,
	ChecklistsCollection,
} from './collections';

declare const process: {
	env: Record<string, string | undefined>;
};

const env = {
	TINA_BRANCH: process.env.TINA_BRANCH,
	TINA_CLIENT_ID: process.env.PUBLIC_TINA_CLIENT_ID,
	TINA_TOKEN: process.env.TINA_TOKEN,
	TINA_SEARCH_TOKEN: process.env.TINA_SEARCH_TOKEN,
};

export default defineConfig({
	branch: env.TINA_BRANCH,
	clientId: env.TINA_CLIENT_ID,
	token: env.TINA_TOKEN,

	build: {
		outputFolder: 'admin',
		publicFolder: 'public',
	},
	media: {
		tina: {
			publicFolder: 'public',
			mediaRoot: '',
			static: false,
		},
	},
	schema: {
		collections: [
			AuthorsCollection,
			ArticlesCollection,
			PageCollection,
			TagsCollection,
			VersionsCollection,
			RobotsCollection,
			CasesCollection,
			ComparisonsCollection,
			PartnersCollection,
			VacanciesCollection,
			ClientsCollection,
			ChecklistsCollection,
		],
	},
	search: {
		tina: {
			indexerToken: env.TINA_SEARCH_TOKEN,
			stopwordLanguages: ['rus'],
		},
		indexBatchSize: 100,
		maxSearchIndexFieldLength: 100,
	},
});
