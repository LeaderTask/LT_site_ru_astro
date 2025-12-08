declare const document: Document;
declare const window: Window & typeof globalThis;

export function initBreadcrumbs() {
	const supportsDom = typeof window !== 'undefined' && typeof document !== 'undefined';

	if (supportsDom) {
		const containers = Array.from(document.querySelectorAll<HTMLElement>('[data-breadcrumbs]'));

		if (containers.length > 0) {
			const updateLinkSizes = () => {
				const windowWidth = window.innerWidth;

				containers.forEach((container) => {
					const links = container.querySelectorAll<HTMLAnchorElement>('a');
					const breadcrumbsCount = links.length;

					if (windowWidth < 768) {
						const elemWidth = 60 * (breadcrumbsCount - 1);
						const MOBILE_PADDING = 40;
						const linkSize = Math.max(windowWidth - elemWidth - MOBILE_PADDING, 0);
						links.forEach((link) => {
							link.style.maxWidth = `${linkSize}px`;
						});
					} else {
						links.forEach((link) => {
							link.style.maxWidth = 'none';
						});
					}
				});
			};

			const initBreadcrumbs = () => {
				updateLinkSizes();
				window.addEventListener('resize', updateLinkSizes);
			};

			if (document.readyState === 'loading') {
				document.addEventListener('DOMContentLoaded', initBreadcrumbs, { once: true });
			} else {
				initBreadcrumbs();
			}
		}
	}
}
