declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;

export function initPlatformHeroBlock() {
	function updateImage() {
		const image = document.getElementById('platform-hero-image');
		if (!image) return;

		const isMobile = window.innerWidth < 768;
		const imageMobile = image.getAttribute('data-mobile');
		const imageDesktop = image.getAttribute('data-desktop');

		if (isMobile && imageMobile) {
			(image as HTMLImageElement).src = imageMobile;
			image.classList.add('pl-4');
		} else if (imageDesktop) {
			(image as HTMLImageElement).src = imageDesktop;
			image.classList.remove('pl-4');
		}
	}

	function init() {
		const image = document.getElementById('platform-hero-image');
		if (image) {
			image.setAttribute('data-desktop', (image as HTMLImageElement).src);
			const imageMobile = image.getAttribute('data-mobile-src');
			if (imageMobile) {
				image.setAttribute('data-mobile', imageMobile);
			}
			updateImage();
		}

		window.addEventListener('resize', updateImage);
	}

	setTimeout(init, 100);
}
