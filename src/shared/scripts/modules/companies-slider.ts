declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;
declare const clearTimeout: (id: number) => void;

export async function initCompaniesSlider() {
	const swiperContainer = document.getElementById('companies-swiper');
	if (!swiperContainer) return;

	const { default: Swiper } = await import('swiper');
	const { Autoplay } = await import('swiper/modules');

	let swiperInstance: InstanceType<typeof Swiper> | null = null;

	function init() {
		if (swiperInstance) {
			(swiperInstance as unknown as { destroy: (cleanStyles?: boolean, cleanSlides?: boolean) => void }).destroy(true, true);
			swiperInstance = null;
		}

		function getSlidesPerView() {
			return window.innerWidth < 1024 ? 2.5 : 6;
		}

		function getSpaceBetween() {
			return window.innerWidth < 1024 ? 30 : 80;
		}

		if (!swiperContainer) return;
		const isMobile = window.innerWidth < 1024;
		swiperInstance = new Swiper(swiperContainer, {
			slidesPerView: getSlidesPerView(),
			spaceBetween: getSpaceBetween(),
			loop: true,
			loopAdditionalSlides: 2,
			watchOverflow: true,
			autoplay: {
				delay: 0,
				disableOnInteraction: false,
			},
			speed: 3000,
			modules: [Autoplay],
			allowTouchMove: !isMobile,
		});

		let resizeTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
		window.addEventListener('resize', () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				if (swiperInstance) {
					swiperInstance.destroy(true, true);
					swiperInstance = null;
					init();
				}
			}, 100);
		});
	}

	init();
}
