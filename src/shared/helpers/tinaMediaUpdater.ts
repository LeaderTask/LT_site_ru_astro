/* eslint-env node */
/* global process */
import { readFile, writeFile, utimes } from 'node:fs/promises';
import { join } from 'node:path';

function getStaticMediaPath(): string {
	try {
		if (typeof process !== 'undefined' && process.cwd) {
			return join(process.cwd(), 'tina', '__generated__', 'static-media.json');
		}
		return 'tina/__generated__/static-media.json';
	} catch {
		return 'tina/__generated__/static-media.json';
	}
}

const STATIC_MEDIA_PATH = getStaticMediaPath();

interface MediaFile {
	id: string;
	filename: string;
	src: string;
}

export async function updateTinaMediaPath(oldPath: string, newPath: string): Promise<void> {
	try {
		const content = await readFile(STATIC_MEDIA_PATH, 'utf-8');
		let mediaFiles: MediaFile[] = [];

		try {
			mediaFiles = JSON.parse(content);
		} catch {
			mediaFiles = [];
		}

		if (!Array.isArray(mediaFiles)) {
			return;
		}

		const normalizedOldPath = oldPath.startsWith('/') ? oldPath : `/${oldPath}`;
		const normalizedNewPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
		const oldFileName = normalizedOldPath.split('/').pop() || '';
		const newFileName = normalizedNewPath.split('/').pop() || '';

		let updated = false;
		for (const file of mediaFiles) {
			if (file.src === normalizedOldPath || file.src === oldPath || file.filename === oldFileName) {
				file.src = normalizedNewPath;
				file.filename = newFileName;
				if (file.id === oldFileName) {
					file.id = newFileName;
				}
				updated = true;
			}
		}

		if (updated) {
			await writeFile(STATIC_MEDIA_PATH, JSON.stringify(mediaFiles, null, 2), 'utf-8');
			const now = new Date();
			await utimes(STATIC_MEDIA_PATH, now, now);
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		if (!errorMessage.includes('ENOENT')) {
			globalThis.console?.warn(`Не удалось обновить путь в TinaCMS: ${errorMessage}`);
		}
	}
}
