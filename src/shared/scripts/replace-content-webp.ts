import process from 'node:process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONTENT_DIR = join(__dirname, '../../content');
const TEXT_EXTENSIONS = new Set(['.md', '.mdx', '.json']);
const ABSOLUTE_IMAGE_REGEX = /(?<![:/])\/[A-Za-z0-9._/-]+?\.(?:png|jpe?g)/gi;
const logger = globalThis.console;

async function collectFiles(dirPath: string): Promise<string[]> {
	const entries = await readdir(dirPath, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dirPath, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await collectFiles(fullPath)));
		} else if (TEXT_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
			files.push(fullPath);
		}
	}

	return files;
}

function replaceAbsoluteImagePaths(content: string): { updated: string; replacements: number } {
	let replacements = 0;
	const updated = content.replace(ABSOLUTE_IMAGE_REGEX, (match) => {
		replacements += 1;
		return match.replace(/\.(?:png|jpe?g)$/i, '.webp');
	});
	return { updated, replacements };
}

async function processContent(): Promise<void> {
	const files = await collectFiles(CONTENT_DIR);
	let totalReplacements = 0;

	for (const file of files) {
		const original = await readFile(file, 'utf-8');
		const { updated, replacements } = replaceAbsoluteImagePaths(original);
		if (replacements > 0) {
			await writeFile(file, updated, 'utf-8');
			totalReplacements += replacements;
			logger.log(`✓ ${file.replace(CONTENT_DIR, '').replace(/\\/g, '/')} — ${replacements}`);
		}
	}

	if (totalReplacements === 0) {
		logger.log('Изменений не найдено.');
		return;
	}

	logger.log(`Обновлено ссылок: ${totalReplacements}`);
}

processContent().catch((error) => {
	logger.error('Ошибка переписывания ссылок:', error);
	process.exit(1);
});
