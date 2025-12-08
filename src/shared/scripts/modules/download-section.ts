declare const document: Document;
declare const window: Window & typeof globalThis;
declare const navigator: Navigator;
declare const setTimeout: (callback: () => void, delay?: number) => number;

export function initDownloadSection() {
	const LINKS = {
		web: 'https://www.leadertask.com/web/login',
		android: 'https://play.google.com/store/apps/details?id=com.leadertask.app',
		ios: 'https://apps.apple.com/ru/app/leadertask-task-to-do-list/id6504613667',
		windows: 'https://www.leadertask.com/download/leadertask.exe',
	};

	function detectDevice() {
		if (typeof navigator === 'undefined') return { isIOS: false, isAndroid: false, isWindows: false };
		const ua = navigator.userAgent;
		return {
			isIOS: /iPad|iPhone|iPod/i.test(ua),
			isAndroid: /Android/i.test(ua),
			isWindows: /Windows/i.test(ua),
		};
	}

	function getDownloadLink(device: { isIOS: boolean; isAndroid: boolean; isWindows: boolean }): string {
		if (device.isIOS) return LINKS.ios;
		if (device.isAndroid) return LINKS.android;
		if (device.isWindows) return LINKS.windows;
		return LINKS.windows;
	}

	function updateDownloadButton(device: { isIOS: boolean; isAndroid: boolean; isWindows: boolean }): void {
		const button = document.getElementById('download-button');
		if (button) {
			const anchor = button.querySelector('a');
			if (anchor) {
				anchor.href = getDownloadLink(device);
			}
		}
	}

	function updateMobileSlider(device: { isIOS: boolean; isAndroid: boolean; isWindows: boolean }): void {
		const isMobile = window.innerWidth < 768;
		const sliderIOS = document.getElementById('mobile-slider-ios');
		const sliderAndroid = document.getElementById('mobile-slider-android');

		if (sliderIOS && sliderAndroid) {
			if (!isMobile) {
				sliderIOS.style.display = '';
				sliderAndroid.style.display = '';
			} else {
				if (device.isIOS) {
					sliderIOS.style.display = 'block';
					sliderAndroid.style.display = 'none';
				} else {
					sliderIOS.style.display = 'none';
					sliderAndroid.style.display = 'block';
				}
			}
		}
	}

	function updateMobileDevices(device: { isIOS: boolean; isAndroid: boolean; isWindows: boolean }): void {
		const isMobile = window.innerWidth < 768;
		const deviceIOS = document.getElementById('mobile-device-third-ios');
		const deviceAndroid = document.getElementById('mobile-device-third-android');

		if (deviceIOS && deviceAndroid) {
			if (!isMobile) {
				deviceIOS.style.display = '';
				deviceAndroid.style.display = '';
			} else {
				if (device.isIOS) {
					deviceIOS.style.display = 'block';
					deviceAndroid.style.display = 'none';
				} else {
					deviceIOS.style.display = 'none';
					deviceAndroid.style.display = 'block';
				}
			}
		}
	}

	function init() {
		const device = detectDevice();
		updateDownloadButton(device);
		updateMobileSlider(device);
		updateMobileDevices(device);
	}

	function handleResize() {
		const device = detectDevice();
		updateMobileSlider(device);
		updateMobileDevices(device);
	}

	if (typeof document !== 'undefined') {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => {
				setTimeout(init, 100);
			});
		} else {
			setTimeout(init, 100);
		}

		window.addEventListener('resize', handleResize);
	}
}
