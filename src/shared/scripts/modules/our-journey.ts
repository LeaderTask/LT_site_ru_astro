import { detectDevice } from './utils';
import { getLinkToGetStarted } from '@/shared/helpers';

declare const document: Document;
declare const window: Window & typeof globalThis;
declare const setTimeout: (callback: () => void, delay?: number) => number;

export function initOurJourney() {
	function calculateHeight() {
		const continuesBlock = document.getElementById('our-journey-continues-block');
		const line = document.getElementById('our-journey-line');
		if (continuesBlock && line) {
			const height = continuesBlock.getBoundingClientRect().height;
			line.style.bottom = `${height - 28}px`;
		}
	}

	function updateLinks() {
		const device = detectDevice();
		const link = getLinkToGetStarted(device as 'web' | 'android' | 'ios');

		const button1 = document.getElementById('our-journey-get-started-button');
		if (button1) {
			const anchor = button1.querySelector('a');
			if (anchor) anchor.href = link;
		}

		const button2 = document.getElementById('our-journey-mobile-get-started-button');
		if (button2) {
			const anchor = button2.querySelector('a');
			if (anchor) anchor.href = link;
		}
	}

	function init() {
		calculateHeight();
		updateLinks();

		window.addEventListener('resize', calculateHeight);
	}

	setTimeout(init, 100);
}
