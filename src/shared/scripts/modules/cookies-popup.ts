declare const document: Document;
declare const localStorage: Storage;

export function initCookiesPopup() {
	const STORAGE_KEY = 'cookie-consent';
	const cookieConsent = document.getElementById('cookie-consent');
	const acceptBtn = document.getElementById('cookie-accept');
	const declineBtn = document.getElementById('cookie-decline');
	const closeBtn = document.getElementById('cookie-close');

	function showConsent() {
		if (cookieConsent) {
			cookieConsent.dataset.hidden = 'false';
			cookieConsent.classList.remove('translate-y-full', 'opacity-0');
			cookieConsent.classList.add('translate-y-0', 'opacity-100');
		}
	}

	function hideConsent() {
		if (cookieConsent) {
			cookieConsent.dataset.hidden = 'true';
			cookieConsent.classList.remove('translate-y-0', 'opacity-100');
			cookieConsent.classList.add('translate-y-full', 'opacity-0');
		}
	}

	function handleAccept() {
		localStorage.setItem(STORAGE_KEY, 'accepted');
		hideConsent();
	}

	function handleDecline() {
		localStorage.setItem(STORAGE_KEY, 'declined');
		hideConsent();
	}

	function handleClose() {
		hideConsent();
	}

	const consent = localStorage.getItem(STORAGE_KEY);
	if (!consent) {
		showConsent();
	}

	acceptBtn?.addEventListener('click', handleAccept);
	declineBtn?.addEventListener('click', handleDecline);
	closeBtn?.addEventListener('click', handleClose);
}
