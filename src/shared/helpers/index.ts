export const getMdxContentName = (value: string) => {
	return value.split('/').pop()?.replace('.mdx', '');
};

export const getMdxId = (value: string) => value.replace('.mdx', '');

export const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
};

export const renderTextElement = (textType: 'p' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', text: string, href?: string) => {
	switch (textType) {
		case 'a':
			return { tag: 'a', href, text };
		case 'h1':
			return { tag: 'h1', text };
		case 'h2':
			return { tag: 'h2', text };
		case 'h3':
			return { tag: 'h3', text };
		case 'h4':
			return { tag: 'h4', text };
		case 'h5':
			return { tag: 'h5', text };
		case 'h6':
			return { tag: 'h6', text };
		default:
			return { tag: 'p', text };
	}
};

export const getLinkToGetStarted = (device: 'web' | 'android' | 'ios') => {
	switch (device) {
		case 'web':
			return 'https://www.leadertask.com/web/login';
		case 'android':
			return '/platforms/android';
		case 'ios':
			return '/platforms/ios';
	}
	return 'https://www.leadertask.com/web/login';
};

/* eslint-env node */
export const getImageDimensions = async (
	imagePath: string,
	maxWidth?: number,
	maxHeight?: number
): Promise<{ width: number; height: number }> => {
	if (!imagePath.startsWith('/')) {
		return { width: 800, height: 600 };
	}

	try {
		const sharp = (await import('sharp')).default;
		const { join } = await import('node:path');
		const { existsSync } = await import('node:fs');
		/* global process */
		const publicPath = join(process.cwd(), 'public', imagePath.slice(1));

		if (!existsSync(publicPath)) {
			return { width: 800, height: 600 };
		}

		const metadata = await sharp(publicPath).metadata();
		if (!metadata.width || !metadata.height) {
			return { width: 800, height: 600 };
		}

		let width = metadata.width;
		let height = metadata.height;

		if (maxWidth || maxHeight) {
			const aspectRatio = width / height;
			let targetWidth = width;
			let targetHeight = height;

			if (maxWidth && width > maxWidth) {
				targetWidth = maxWidth;
				targetHeight = Math.round(maxWidth / aspectRatio);
			}

			if (maxHeight && targetHeight > maxHeight) {
				targetHeight = maxHeight;
				targetWidth = Math.round(maxHeight * aspectRatio);
			}

			if (targetWidth < width || targetHeight < height) {
				width = targetWidth;
				height = targetHeight;
			}
		}

		return { width, height };
	} catch {
		// fallback to default dimensions
	}

	return { width: 800, height: 600 };
};
