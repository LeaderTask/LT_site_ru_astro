import { detectDevice } from './utils';
import { getLinkToGetStarted } from '@/shared/helpers';

declare const document: Document;
declare const window: Window & typeof globalThis;

export function initHeader() {
	let showMobileMenu = false;
	let device = 'web';
	let scrollY = 0;

	function updateLinks() {
		const loginButton = document.getElementById('login-button');
		const getStartedButton = document.getElementById('get-started-button');
		const link = getLinkToGetStarted(device as 'web' | 'android' | 'ios');

		if (loginButton) {
			const anchor = loginButton.querySelector('a');
			if (anchor) anchor.href = link;
		}

		if (getStartedButton) {
			const anchor = getStartedButton.querySelector('a');
			if (anchor) anchor.href = link;
		}
	}

	function updateScrollShadow() {
		const header = document.getElementById('header');
		if (!header) return;

		if (scrollY > 100) {
			header.classList.add('shadow-md');
		} else {
			header.classList.remove('shadow-md');
		}
	}

	function updateMobileMenuIcon() {
		const toggleButton = document.getElementById('mobile-menu-toggle');
		if (toggleButton) {
			if (showMobileMenu) {
				toggleButton.classList.add('is-open');
			} else {
				toggleButton.classList.remove('is-open');
			}
			toggleButton.setAttribute('aria-expanded', showMobileMenu ? 'true' : 'false');
			toggleButton.setAttribute('aria-label', showMobileMenu ? 'Закрыть меню навигации' : 'Открыть меню навигации');
		}
	}

	function updateGetStartedButtonVisibility() {
		const getStartedButton = document.getElementById('get-started-button');
		if (getStartedButton) {
			if (showMobileMenu) {
				getStartedButton.classList.add('hidden');
			} else {
				getStartedButton.classList.remove('hidden');
			}
		}
	}

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
		updateGetStartedButtonVisibility();
		updateMobileMenuIcon();

		window.dispatchEvent(new CustomEvent('toggle-mobile-menu', { detail: { isOpen: showMobileMenu } }));
	}

	function handleMobileMenuToggle(event: CustomEvent<{ isOpen: boolean }>): void {
		showMobileMenu = event.detail.isOpen;
		updateGetStartedButtonVisibility();
		updateMobileMenuIcon();
	}

	function init() {
		device = detectDevice();
		updateLinks();
		updateScrollShadow();

		const toggleButton = document.getElementById('mobile-menu-toggle');
		if (toggleButton) {
			toggleButton.addEventListener('click', toggleMobileMenu);
		}

		window.addEventListener('toggle-mobile-menu', handleMobileMenuToggle as EventListenerOrEventListenerObject);

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				scrollY = window.scrollY;
				updateScrollShadow();
			});
		}
	}

	init();
}
