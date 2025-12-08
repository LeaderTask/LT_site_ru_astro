import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

export function cssPreload() {
	return {
		name: 'css-preload',
		hooks: {
			'astro:build:done': async ({ dir }: { dir: URL }) => {
				try {
					const distPath = fileURLToPath(dir);
					await processHtmlFiles(distPath);
				} catch (error) {
					// eslint-disable-next-line no-undef
					console.error('Failed to add CSS preload:', error);
				}
			},
		},
	};
}

async function processHtmlFiles(dirPath: string) {
	const files = await getAllHtmlFiles(dirPath);

	for (const filePath of files) {
		let html = await readFile(filePath, 'utf-8');
		const stylesheetRegex = /<link\s+rel="stylesheet"\s+href="([^"]+)">/g;
		const preloadedUrls = new Set<string>();
		const replacements: Array<{ original: string; replacement: string }> = [];

		let match;
		while ((match = stylesheetRegex.exec(html)) !== null) {
			const href = match[1];
			if (!preloadedUrls.has(href) && !href.startsWith('data:')) {
				preloadedUrls.add(href);
				const preloadTag = `\t\t<link rel="preload" href="${href}" as="style">\n`;
				replacements.push({
					original: match[0],
					replacement: preloadTag + match[0],
				});
			}
		}

		for (const { original, replacement } of replacements.reverse()) {
			html = html.replace(original, replacement);
		}

		if (replacements.length > 0) {
			await writeFile(filePath, html, 'utf-8');
		}
	}
}

async function getAllHtmlFiles(dirPath: string): Promise<string[]> {
	const files: string[] = [];

	async function walkDir(currentPath: string) {
		const entries = await readdir(currentPath, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = join(currentPath, entry.name);

			if (entry.isDirectory()) {
				await walkDir(fullPath);
			} else if (entry.isFile() && entry.name.endsWith('.html')) {
				files.push(fullPath);
			}
		}
	}

	await walkDir(dirPath);
	return files;
}
