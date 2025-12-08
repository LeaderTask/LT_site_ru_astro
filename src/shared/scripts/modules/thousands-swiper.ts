declare const document: Document;

export async function initThousandsSwiper() {
	const swiperContainer = document.querySelector('.swiper-container');
	if (!swiperContainer) return;

	const Swiper = (await import('swiper')).default;
	const { Autoplay } = await import('swiper/modules');

	new Swiper(swiperContainer as HTMLElement, {
		modules: [Autoplay],
		slidesPerView: 1.2,
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		spaceBetween: 24,
		speed: 3000,
	});
}
