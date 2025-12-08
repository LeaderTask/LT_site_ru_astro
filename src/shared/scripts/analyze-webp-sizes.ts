/* eslint-env node */
/* global console, process */
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '../../../public');

interface WebPFile {
	path: string;
	size: number;
}

async function processDirectory(dirPath: string, basePath = ''): Promise<WebPFile[]> {
	const entries = await readdir(dirPath, { withFileTypes: true });
	const results: WebPFile[] = [];

	for (const entry of entries) {
		const fullPath = join(dirPath, entry.name);
		const relativePath = join(basePath, entry.name).replace(/\\/g, '/');

		if (entry.isDirectory()) {
			const subResults = await processDirectory(fullPath, relativePath);
			results.push(...subResults);
		} else if (entry.name.toLowerCase().endsWith('.webp')) {
			const stats = await stat(fullPath);
			results.push({
				path: relativePath,
				size: stats.size,
			});
		}
	}

	return results;
}

function formatSize(bytes: number): string {
	if (bytes >= 1024 * 1024) {
		return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
	}
	if (bytes >= 1024) {
		return `${(bytes / 1024).toFixed(2)} KB`;
	}
	return `${bytes} B`;
}

async function main(): Promise<void> {
	console.log('Анализ размеров .webp файлов в папке public...\n');

	try {
		const files = await processDirectory(PUBLIC_DIR);

		if (files.length === 0) {
			console.log('WebP файлы не найдены.');
			return;
		}

		files.sort((a, b) => b.size - a.size);

		const totalSize = files.reduce((sum, f) => sum + f.size, 0);
		const topCount = Math.min(20, files.length);

		console.log(`Всего найдено: ${files.length} файлов`);
		console.log(`Общий размер: ${formatSize(totalSize)}\n`);
		console.log(`Топ-${topCount} самых тяжелых файлов:\n`);

		for (let i = 0; i < topCount; i++) {
			const file = files[i];
			const percentage = ((file.size / totalSize) * 100).toFixed(2);
			console.log(`${(i + 1).toString().padStart(2)}. ${file.path}`);
			console.log(`    Размер: ${formatSize(file.size)} (${percentage}% от общего)`);
		}

		if (files.length > topCount) {
			console.log(`\n... и еще ${files.length - topCount} файлов`);
		}
	} catch (error) {
		console.error('Ошибка:', error);
		process.exit(1);
	}
}

main();
