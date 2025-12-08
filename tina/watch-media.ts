/* eslint-env node */
/* global console, process, setTimeout */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { watch } from 'node:fs';
import { convertToWebP } from '../src/shared/scripts/convert-to-webp.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DIR = join(__dirname, '../public');

async function processFile(filePath: string): Promise<void> {
	try {
		const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
		const result = await convertToWebP(filePath, webpPath);
		if (result) {
			if (result.alreadyExists) {
				console.log(`✓ ${result.source} -> удален (WebP уже существует)`);
			} else {
				console.log(`✓ Конвертировано в WebP: ${result.source}`);
			}
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (!errorMessage.includes('ENOENT')) {
			console.warn(`Ошибка при обработке файла ${filePath}:`, errorMessage);
		}
	}
}

function startMediaWatcher(): void {
	if (typeof watch !== 'function') {
		console.warn('File watching не поддерживается в этой версии Node.js');
		return;
	}

	console.log('Запущен watcher для автоматической конвертации изображений в WebP...');

	const watcher = watch(PUBLIC_DIR, { recursive: true }, async (eventType, filename) => {
		if (!filename || eventType !== 'rename') {
			return;
		}

		const filePath = join(PUBLIC_DIR, filename);

		const fileExists = await import('node:fs/promises').then(({ stat }) =>
			stat(filePath)
				.then(() => true)
				.catch(() => false)
		);
		if (!fileExists) {
			return;
		}

		setTimeout(async () => {
			try {
				await processFile(filePath);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				if (!errorMessage.includes('ENOENT')) {
					console.warn(`Ошибка при обработке файла в watcher:`, errorMessage);
				}
			}
		}, 500);
	});

	process.on('SIGINT', () => {
		watcher.close();
		process.exit(0);
	});

	process.on('SIGTERM', () => {
		watcher.close();
		process.exit(0);
	});
}

startMediaWatcher();
