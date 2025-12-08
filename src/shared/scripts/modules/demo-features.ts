import { detectDevice } from './utils';
import { getLinkToGetStarted } from '@/shared/helpers';

declare const document: Document;

export function initDemoFeatures() {
	const getStartedBtn = document.getElementById('get-started-btn') as HTMLAnchorElement;

	if (getStartedBtn) {
		const device = detectDevice();
		getStartedBtn.href = getLinkToGetStarted(device);
	}
}
