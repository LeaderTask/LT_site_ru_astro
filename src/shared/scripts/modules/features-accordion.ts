declare const document: Document;
declare const window: Window & typeof globalThis;

export function initFeaturesAccordion() {
	function initAccordion(root: HTMLElement) {
		const accordionId = root.dataset.accordionId;

		if (!accordionId) {
			return;
		}

		const reverse = root.dataset.accordionReverse === 'true';
		const desktopContainer = document.getElementById(`${accordionId}-desktop`);
		const imageContainer = document.getElementById(`${accordionId}-image-container`);
		let activeIndex = 0;

		if (!(desktopContainer && imageContainer)) {
			return;
		}

		const updateImage = (newIndex: number) => {
			if (newIndex === activeIndex) {
				return;
			}

			const allImages = imageContainer.querySelectorAll('[data-image-index]');

			allImages.forEach((imgWrapper, index) => {
				if (imgWrapper instanceof HTMLElement) {
					if (index === newIndex) {
						imgWrapper.style.opacity = '1';
						imgWrapper.style.pointerEvents = 'auto';
					} else {
						imgWrapper.style.opacity = '0';
						imgWrapper.style.pointerEvents = 'none';
					}
				}
			});
		};

		const updateReverse = () => {
			if (window.innerWidth >= 1280) {
				if (reverse) {
					desktopContainer.classList.add('xl:flex-row-reverse');
					desktopContainer.classList.remove('xl:flex-row');
				} else {
					desktopContainer.classList.remove('xl:flex-row-reverse');
					desktopContainer.classList.add('xl:flex-row');
				}
			}
		};

		desktopContainer.addEventListener('accordion-toggle', (e) => {
			const newIndex = (e as CustomEvent).detail.index;

			if (activeIndex === newIndex) {
				return;
			}

			updateImage(newIndex);
			activeIndex = newIndex;

			const itemNodes = desktopContainer.querySelectorAll('[data-item-index]');

			itemNodes.forEach((item, index) => {
				if (item instanceof HTMLElement) {
					const isActive = index === activeIndex;
					item.setAttribute('data-active', isActive.toString());
					item.dispatchEvent(
						new CustomEvent('set-active', {
							detail: { isActive },
							bubbles: false,
						})
					);
				}
			});
		});

		updateReverse();
		window.addEventListener('resize', updateReverse);
	}

	const accordionRoots = document.querySelectorAll('section[data-features-accordion]');

	accordionRoots.forEach((root) => {
		if (root instanceof HTMLElement) {
			initAccordion(root);
		}
	});
}
