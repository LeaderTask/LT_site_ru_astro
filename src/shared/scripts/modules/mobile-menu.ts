import { detectDevice } from './utils';
import { getLinkToGetStarted } from '@/shared/helpers';

declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;

export function initMobileMenu() {
	let isOpen = false;
	let device = 'web';

	function updateMenuState() {
		const menuContent = document.getElementById('mobile-menu-content');
		const overlay = document.getElementById('mobile-menu-overlay');
		const getStartedButton = document.getElementById('mobile-menu-get-started-button');

		if (menuContent) {
			if (isOpen) {
				menuContent.classList.remove('-translate-y-full', 'top-0', 'opacity-0');
				menuContent.classList.add('translate-y-0', 'opacity-100', 'top-11.75');
			} else {
				menuContent.classList.remove('translate-y-0', 'opacity-100', 'top-11.75');
				menuContent.classList.add('-translate-y-full', 'top-0', 'opacity-0');
			}
		}

		if (overlay) {
			if (isOpen) {
				overlay.classList.remove('opacity-0', 'pointer-events-none');
				overlay.classList.add('opacity-100', 'pointer-events-auto');
			} else {
				overlay.classList.remove('opacity-100', 'pointer-events-auto');
				overlay.classList.add('opacity-0', 'pointer-events-none');
			}
		}

		if (getStartedButton) {
			const link = getLinkToGetStarted(device as 'web' | 'android' | 'ios');
			const anchor = getStartedButton.querySelector('a');
			if (anchor) {
				anchor.href = link;
			}
		}
	}

	function handleToggle(event: CustomEvent<{ isOpen: boolean }>): void {
		isOpen = event.detail.isOpen;
		updateMenuState();
	}

	function handleOverlayClick() {
		isOpen = false;
		updateMenuState();
		window.dispatchEvent(new CustomEvent('toggle-mobile-menu', { detail: { isOpen: false } }));
	}

	function init() {
		device = detectDevice();
		updateMenuState();

		const overlay = document.getElementById('mobile-menu-overlay');
		if (overlay) {
			overlay.addEventListener('click', handleOverlayClick);
		}

		window.addEventListener('toggle-mobile-menu', handleToggle as EventListenerOrEventListenerObject);
	}

	setTimeout(init, 100);
}
