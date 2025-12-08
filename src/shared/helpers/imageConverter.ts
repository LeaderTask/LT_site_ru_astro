/* eslint-env node */
/* global process */
import sharp from 'sharp';
import { readFile, writeFile, unlink, mkdir, stat } from 'node:fs/promises';
import { dirname, extname, relative, join } from 'node:path';
import { updateTinaMediaPath } from './tinaMediaUpdater.js';

function getPublicDir(): string {
	try {
		if (typeof process !== 'undefined' && process.cwd) {
			return join(process.cwd(), 'public');
		}
		return 'public';
	} catch {
		return 'public';
	}
}

const PUBLIC_DIR = getPublicDir();

export const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
export const WEBP_QUALITY = 80;
export const MAX_WEBP_SIZE_KB = 100;

export interface ConversionResult {
	source: string;
	originalSize: number;
	newSize: number;
	ratio: string;
	alreadyExists: boolean;
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		const stats = await stat(filePath);
		return stats.isFile();
	} catch {
		return false;
	}
}

export async function convertImageToWebP(
	sourcePath: string,
	targetPath: string,
	relativePath?: string
): Promise<ConversionResult | null> {
	try {
		const ext = extname(sourcePath).toLowerCase();
		if (!IMAGE_EXTENSIONS.includes(ext)) {
			return null;
		}

		const sourceExists = await fileExists(sourcePath);
		if (!sourceExists) {
			return null;
		}

		const targetExists = await fileExists(targetPath);
		if (targetExists) {
			const sourceStats = await stat(sourcePath);
			const targetStats = await stat(targetPath);

			if (relativePath) {
				const normalizedSource = relativePath.replace(/\\/g, '/');
				const normalizedTarget = normalizedSource.replace(/\.(png|jpg|jpeg)$/i, '.webp');
				const relativeSource = normalizedSource.startsWith('/') ? normalizedSource : `/${normalizedSource}`;
				const relativeTarget = normalizedTarget.startsWith('/') ? normalizedTarget : `/${normalizedTarget}`;
				await updateTinaMediaPath(relativeSource, relativeTarget);
			} else {
				const sourceRelative = '/' + relative(PUBLIC_DIR, sourcePath).replace(/\\/g, '/');
				const targetRelative = '/' + relative(PUBLIC_DIR, targetPath).replace(/\\/g, '/');
				await updateTinaMediaPath(sourceRelative, targetRelative);
			}

			try {
				await unlink(sourcePath);
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				globalThis.console?.error(`Ошибка удаления файла ${sourcePath}:`, errorMessage);
			}
			return {
				source: relativePath || sourcePath,
				originalSize: sourceStats.size,
				newSize: targetStats.size,
				ratio: '0%',
				alreadyExists: true,
			};
		}

		const sourceStats = await stat(sourcePath);
		const originalSize = sourceStats.size;
		const fileBuffer = await readFile(sourcePath);
		const webpBuffer = await sharp(fileBuffer).webp({ quality: WEBP_QUALITY }).toBuffer();

		await mkdir(dirname(targetPath), { recursive: true });
		await writeFile(targetPath, webpBuffer);

		const targetStats = await stat(targetPath);
		if (!targetStats.isFile()) {
			return null;
		}

		const newSize = targetStats.size;
		const ratio = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

		if (relativePath) {
			const normalizedSource = relativePath.replace(/\\/g, '/');
			const normalizedTarget = normalizedSource.replace(/\.(png|jpg|jpeg)$/i, '.webp');
			const relativeSource = normalizedSource.startsWith('/') ? normalizedSource : `/${normalizedSource}`;
			const relativeTarget = normalizedTarget.startsWith('/') ? normalizedTarget : `/${normalizedTarget}`;
			await updateTinaMediaPath(relativeSource, relativeTarget);
		} else {
			const sourceRelative = '/' + relative(PUBLIC_DIR, sourcePath).replace(/\\/g, '/');
			const targetRelative = '/' + relative(PUBLIC_DIR, targetPath).replace(/\\/g, '/');
			await updateTinaMediaPath(sourceRelative, targetRelative);
		}

		try {
			await unlink(sourcePath);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			globalThis.console?.error(`Ошибка удаления файла ${sourcePath}:`, errorMessage);
		}

		return {
			source: relativePath || sourcePath,
			originalSize,
			newSize,
			ratio: `${ratio}%`,
			alreadyExists: false,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (!errorMessage.includes('ENOENT')) {
			globalThis.console?.error(`Ошибка конвертации ${sourcePath} в WebP:`, errorMessage);
		}
		return null;
	}
}

export async function optimizeWebP(
	webpPath: string,
	relativePath?: string,
	maxSizeKB: number = MAX_WEBP_SIZE_KB
): Promise<ConversionResult | null> {
	try {
		const webpExists = await fileExists(webpPath);
		if (!webpExists) {
			return null;
		}

		const originalStats = await stat(webpPath);
		const originalSize = originalStats.size;
		const maxSizeBytes = maxSizeKB * 1024;

		if (originalSize <= maxSizeBytes) {
			return null;
		}

		const fileBuffer = await readFile(webpPath);
		const image = sharp(fileBuffer);
		const metadata = await image.metadata();
		let quality = WEBP_QUALITY;
		let optimizedBuffer: Uint8Array;
		let newSize = originalSize;
		let width = metadata.width;
		let height = metadata.height;

		let iterations = 0;
		const maxIterations = 50;

		while (newSize > maxSizeBytes && iterations < maxIterations) {
			iterations++;
			let processingImage = image.clone();

			if (width && height) {
				const currentRatio = newSize / maxSizeBytes;
				const needsResize = currentRatio > 1.2 || width > 1600 || height > 1600;

				if (needsResize) {
					const aspectRatio = width / height;
					const targetRatio = Math.sqrt(maxSizeBytes / newSize);
					const resizeFactor = Math.min(0.8, targetRatio * 0.9);

					if (width > height) {
						width = Math.max(600, Math.floor(width * resizeFactor));
						height = Math.floor(width / aspectRatio);
					} else {
						height = Math.max(600, Math.floor(height * resizeFactor));
						width = Math.floor(height * aspectRatio);
					}

					processingImage = processingImage.resize(width, height, { withoutEnlargement: true });
				}
			}

			if (quality > 20) {
				quality = Math.max(20, quality - 10);
			} else if (quality > 10) {
				quality = Math.max(10, quality - 5);
			} else if (quality > 5) {
				quality = Math.max(5, quality - 2);
			} else {
				quality = Math.max(1, quality - 1);
			}

			optimizedBuffer = await processingImage.webp({ quality }).toBuffer();
			newSize = optimizedBuffer.length;

			if (newSize <= maxSizeBytes) {
				break;
			}
		}

		if (newSize >= originalSize) {
			return null;
		}

		if (newSize > maxSizeBytes) {
			return null;
		}

		await writeFile(webpPath, optimizedBuffer!);

		const ratio = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

		return {
			source: relativePath || webpPath,
			originalSize,
			newSize,
			ratio: `${ratio}%`,
			alreadyExists: false,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (!errorMessage.includes('ENOENT')) {
			globalThis.console?.error(`Ошибка оптимизации ${webpPath}:`, errorMessage);
		}
		return null;
	}
}
