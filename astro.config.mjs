// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import tinaDirective from './astro-tina-directive/register';
import path from 'path';
import process from 'process';
import { config } from 'dotenv';
import { rehypeAutoImportComponents } from './src/shared/plugins/rehypeAutoImportComponents.ts';
import { rehypeAddHeadingIds } from './src/shared/plugins/rehypeAddHeadingIds.ts';
import { robotsGenerator } from './astro-integrations/robots-generator.ts';
import { cssPreload } from './astro-integrations/css-preload.ts';

config();

// https://astro.build/config
export default defineConfig({
	site: process.env.VITE_SITE_URL,
	trailingSlash: 'never',
	image: {
		service: {
			entrypoint: 'astro/assets/services/sharp',
		},
		domains: [],
		remotePatterns: [],
	},
	integrations: [
		mdx({
			rehypePlugins: [rehypeAutoImportComponents, rehypeAddHeadingIds],
		}),
		sitemap({
			serialize: (item) => {
				if (item.url.endsWith('/') && item.url !== '/') {
					item.url = item.url.replace(/\/$/, '');
				}
				return item;
			},
		}),
		vue(),
		tinaDirective(),
		robotsGenerator(),
		cssPreload(),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'@': path.resolve('./src'),
				'@tina': path.resolve('./tina'),
			},
		},
		server: {
			fs: {
				allow: ['..'],
			},
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						if (id.includes('node_modules')) {
							if (id.includes('swiper')) {
								return 'swiper';
							}
							if (id.includes('vue')) {
								return 'vue';
							}
							return 'vendor';
						}
					},
				},
			},
			chunkSizeWarningLimit: 1000,
			cssCodeSplit: true,
			minify: 'esbuild',
		},
	},
});
