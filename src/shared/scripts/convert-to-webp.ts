/* eslint-env node */
/* global console, process */
import { readdir, stat } from 'node:fs/promises';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
	convertImageToWebP,
	optimizeWebP,
	IMAGE_EXTENSIONS,
	MAX_WEBP_SIZE_KB,
	type ConversionResult,
} from '../helpers/imageConverter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '../../../public');

export async function convertToWebP(sourcePath: string, targetPath: string): Promise<ConversionResult | null> {
	const relativePath = sourcePath.replace(PUBLIC_DIR, '').replace(/\\/g, '/');
	return convertImageToWebP(sourcePath, targetPath, relativePath);
}

async function processDirectory(dirPath: string, basePath = ''): Promise<ConversionResult[]> {
	const entries = await readdir(dirPath, { withFileTypes: true });
	const results: ConversionResult[] = [];

	for (const entry of entries) {
		const fullPath = join(dirPath, entry.name);
		const relativePath = join(basePath, entry.name).replace(/\\/g, '/');

		if (entry.isDirectory()) {
			const subResults = await processDirectory(fullPath, relativePath);
			results.push(...subResults);
		} else {
			const ext = extname(entry.name).toLowerCase();
			if (IMAGE_EXTENSIONS.includes(ext)) {
				const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

				const result = await convertToWebP(fullPath, webpPath);
				if (result) {
					results.push(result);
					if (result.alreadyExists) {
						console.log(`✓ ${result.source} -> удален (WebP уже существует)`);
					} else {
						console.log(
							`✓ Конвертировано в WebP: ${result.source} -> ${(result.originalSize / 1024).toFixed(1)}KB -> ${(result.newSize / 1024).toFixed(1)}KB (${result.ratio} меньше)`
						);
					}
				}
			} else if (ext === '.webp') {
				const fileStats = await stat(fullPath);
				if (fileStats.size > MAX_WEBP_SIZE_KB * 1024) {
					const result = await optimizeWebP(fullPath, relativePath);
					if (result) {
						results.push(result);
						console.log(
							`✓ Оптимизировано WebP: ${result.source} -> ${(result.originalSize / 1024).toFixed(1)}KB -> ${(result.newSize / 1024).toFixed(1)}KB (${result.ratio} меньше)`
						);
					}
				}
			}
		}
	}

	return results;
}

async function main(): Promise<void> {
	console.log('Начинаю конвертацию изображений в WebP и оптимизацию существующих WebP...\n');

	try {
		const results = await processDirectory(PUBLIC_DIR);

		if (results.length === 0) {
			console.log('Изображения не найдены.');
			return;
		}

		console.log(`\n✓ Конвертировано: ${results.length} изображений`);

		const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
		const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
		const avgRatio = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1);

		console.log(`Общий размер до: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
		console.log(`Общий размер после: ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
		console.log(`Средняя экономия: ${avgRatio}%`);
	} catch (error) {
		console.error('Критическая ошибка:', error);
		process.exit(1);
	}
}

main();
