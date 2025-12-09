declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;
declare const clearTimeout: (id: number) => void;

export async function initCompaniesSlider() {
	const swiperFirst = document.getElementById('companies-swiper-first');
	const swiperSecond = document.getElementById('companies-swiper-seconds');
	if (!swiperFirst && !swiperSecond) return;

	const { default: Swiper } = await import('swiper');
	const { Autoplay } = await import('swiper/modules');

	type SwiperData = { element: HTMLElement; reverse: boolean };
	const swipers: SwiperData[] = [
		...(swiperFirst ? [{ element: swiperFirst, reverse: false }] : []),
		...(swiperSecond ? [{ element: swiperSecond, reverse: true }] : []),
	];
	const instances = new Map<HTMLElement, InstanceType<typeof Swiper>>();

	function init() {
		instances.forEach((instance) => {
			(instance as unknown as { destroy: (cleanStyles?: boolean, cleanSlides?: boolean) => void }).destroy(true, true);
		});
		instances.clear();

		function getSlidesPerView() {
			return window.innerWidth < 1024 ? 2.5 : 6;
		}

		function getSpaceBetween() {
			return window.innerWidth < 1024 ? 30 : 80;
		}

		const isMobile = window.innerWidth < 1024;
		swipers.forEach(({ element, reverse }) => {
			const instance = new Swiper(element, {
				slidesPerView: getSlidesPerView(),
				spaceBetween: getSpaceBetween(),
				loop: true,
				loopAdditionalSlides: 2,
				watchOverflow: true,
				autoplay: {
					delay: 0,
					disableOnInteraction: false,
					reverseDirection: reverse,
				},
				speed: 3000,
				modules: [Autoplay],
				allowTouchMove: !isMobile,
			});
			instances.set(element, instance);
		});

		let resizeTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
		window.addEventListener('resize', () => {
			if (resizeTimeout) clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				instances.forEach((instance) => {
					(instance as unknown as { destroy: (cleanStyles?: boolean, cleanSlides?: boolean) => void }).destroy(
						true,
						true
					);
				});
				instances.clear();
				init();
			}, 100);
		});
	}

	init();
}
