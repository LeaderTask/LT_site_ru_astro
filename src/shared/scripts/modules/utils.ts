import { getLinkToGetStarted } from '@/shared/helpers';

declare const navigator: Navigator;
declare const document: Document;

export function detectDevice(): 'web' | 'android' | 'ios' {
	if (typeof navigator === 'undefined') return 'web';
	const userAgent = navigator.userAgent.toLowerCase();
	if (/android/.test(userAgent)) {
		return 'android';
	} else if (/iphone|ipad|ipod/.test(userAgent)) {
		return 'ios';
	}
	return 'web';
}

export function updateButtonLink(buttonId: string) {
	const device = detectDevice();
	const link = getLinkToGetStarted(device);
	const button = document.getElementById(buttonId);
	if (button) {
		const anchor = button.querySelector('a');
		if (anchor) {
			anchor.href = link;
		} else if (button instanceof HTMLAnchorElement) {
			button.href = link;
		} else {
			button.setAttribute('href', link);
		}
	}
}
