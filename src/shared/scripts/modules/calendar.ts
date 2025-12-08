declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;
declare const clearTimeout: (id: number) => void;

export function initCalendar() {
	function createRipple(event: MouseEvent, container: HTMLElement): void {
		const rippleContainer = container.querySelector('.ripple-container');
		if (!rippleContainer) return;

		const rect = container.getBoundingClientRect();
		const rippleRect = rippleContainer.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height) * 2;
		const x = event.clientX - rippleRect.left;
		const y = event.clientY - rippleRect.top;

		const ripple = document.createElement('div');
		ripple.className = 'ripple-effect';
		ripple.style.left = x + 'px';
		ripple.style.top = y + 'px';
		ripple.style.width = size + 'px';
		ripple.style.height = size + 'px';
		ripple.style.marginLeft = -size / 2 + 'px';
		ripple.style.marginTop = -size / 2 + 'px';

		rippleContainer.appendChild(ripple);

		setTimeout(() => {
			ripple.remove();
		}, 600);
	}

	function updateCalendar() {
		const section = document.getElementById('calendar-section');
		const title = document.getElementById('calendar-title');
		if (!section || !title) return;

		const isMobile = window.innerWidth < 972;
		const showTitleAttr = section.getAttribute('data-show-title');

		if (showTitleAttr === 'true' || isMobile) {
			title.style.display = 'flex';
		} else {
			title.style.display = 'none';
		}
	}

	function initCalendar() {
		const tabs = document.querySelectorAll('.calendar-tab');
		const images = document.querySelectorAll('.calendar-image');

		function updateActiveTab(value: string): void {
			tabs.forEach((tab) => {
				const tabValue = tab.getAttribute('data-tab-value');
				if (tabValue === value) {
					tab.classList.remove('bg-light', 'text-tertiary', 'hover:bg-gray-light');
					tab.classList.add('bg-secondary', 'text-gray');
				} else {
					tab.classList.remove('bg-secondary', 'text-gray');
					tab.classList.add('bg-light', 'text-tertiary', 'hover:bg-gray-light');
				}
			});

			images.forEach((img) => {
				const imgValue = img.getAttribute('data-tab-value');
				if (imgValue === value) {
					img.classList.remove('opacity-0');
					img.classList.add('opacity-100');
				} else {
					img.classList.remove('opacity-100');
					img.classList.add('opacity-0');
				}
			});
		}

		tabs.forEach((tab) => {
			tab.addEventListener('click', (event) => {
				const value = tab.getAttribute('data-tab-value');
				updateActiveTab(value as string);
				const rippleContainer = tab.querySelector('.ripple-container');
				if (rippleContainer) {
					createRipple(event as MouseEvent, tab as HTMLElement);
				}
			});
		});

		const section = document.getElementById('calendar-section');
		if (section) {
			const showTitle = section.getAttribute('data-show-title') !== 'false';
			section.setAttribute('data-show-title', showTitle.toString());
		}

		updateCalendar();

		let resizeTimeout: ReturnType<typeof setTimeout>;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(updateCalendar, 100);
		});
	}

	initCalendar();
}
