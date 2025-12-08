declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;
declare const clearTimeout: (id: number) => void;

export async function initPlatformsSliders() {
	const { default: Swiper } = await import('swiper');

	const swiperInstances = new Map<HTMLElement, typeof Swiper>();

	function parseSliderData(container: HTMLElement) {
		return {
			desktop: JSON.parse(container.getAttribute('data-desktop') || '[]'),
			mobile: JSON.parse(container.getAttribute('data-mobile') || '[]'),
			slidePerView: Number(container.getAttribute('data-slide-per-view') || '1'),
			slidePerViewMobile: Number(container.getAttribute('data-slide-per-view-mobile') || '1'),
			spaceBetween: Number(container.getAttribute('data-space-between') || '0'),
			initialSlide: Number(container.getAttribute('data-initial-slide') || '0'),
		};
	}

	function renderSlides(container: HTMLElement, slides: string[]) {
		const wrapper = container.querySelector('.swiper-wrapper');
		if (!wrapper) return;

		wrapper.innerHTML = slides
			.map(
				(slide: string, index: number): string => `
					<div class="swiper-slide w-full h-full">
						<div class="w-full h-full flex items-center justify-center">
							<img src="${slide}" alt="Slide ${index + 1}" class="w-full max-w-224 h-auto object-contain" loading="lazy" />
						</div>
					</div>
				`
			)
			.join('');
	}

	function initSlider(container: HTMLElement) {
		const existingSwiper = swiperInstances.get(container);
		if (existingSwiper) {
			(existingSwiper as unknown as { destroy: (cleanStyles?: boolean, cleanSlides?: boolean) => void }).destroy(true, true);
			swiperInstances.delete(container);
		}

		const sliderItems = parseSliderData(container);
		const slidesPerView = window.innerWidth < 1024 ? sliderItems.slidePerViewMobile : sliderItems.slidePerView;
		const slides = window.innerWidth < 1024 && sliderItems.mobile?.length ? sliderItems.mobile : sliderItems.desktop || [];

		if (!slides.length) return;

		const wrapper = container.querySelector('.swiper-wrapper');
		const existingSlides = wrapper?.querySelectorAll('.swiper-slide');
		const needsMobileSwitch =
			window.innerWidth < 1024 && sliderItems.mobile?.length && existingSlides?.length !== sliderItems.mobile.length;
		const needsDesktopSwitch = window.innerWidth >= 1024 && existingSlides?.length !== sliderItems.desktop?.length;

		if (!existingSlides?.length || needsMobileSwitch || needsDesktopSwitch) {
			renderSlides(container, slides);
		}

		const swiper = new Swiper(container, {
			slidesPerView,
			spaceBetween: sliderItems.spaceBetween,
			initialSlide: sliderItems.initialSlide,
			loop: true,
			watchOverflow: true,
			grabCursor: true,
			centeredSlides: true,
		});

		swiperInstances.set(container, swiper as unknown as typeof Swiper);
	}

	function initAllSliders() {
		const containers = document.querySelectorAll<HTMLElement>('[data-platforms-slider]');
		containers.forEach((container) => initSlider(container));
	}

	initAllSliders();

	if (!(window as typeof window & { __platformsSliderResizeBound?: boolean }).__platformsSliderResizeBound) {
		let resizeTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
		window.addEventListener('resize', () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				initAllSliders();
			}, 150);
		});
		(window as typeof window & { __platformsSliderResizeBound?: boolean }).__platformsSliderResizeBound = true;
	}
}
