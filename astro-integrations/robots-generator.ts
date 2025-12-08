import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

export function robotsGenerator() {
	return {
		name: 'robots-generator',
		hooks: {
			'astro:build:done': async ({ dir }: { dir: URL }) => {
				try {
					const robotsMdPath = join(process.cwd(), 'src/content/robots/robots.md');
					const content = await readFile(robotsMdPath, 'utf-8');

					const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
					const bodyMatch = content.match(frontmatterRegex);
					const body = bodyMatch ? bodyMatch[2].trim() : content.trim();

					const distPath = fileURLToPath(dir);
					const outputPath = join(distPath, 'robots.txt');
					await writeFile(outputPath, body, 'utf-8');
				} catch (error) {
					// eslint-disable-next-line no-undef
					console.error('Failed to generate robots.txt:', error);
				}
			},
		},
	};
}
