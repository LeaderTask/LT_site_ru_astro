import { initCookiesPopup } from './modules/cookies-popup';
import { initHeroBlock } from './modules/hero-block';
import { initHeroFeaturesBlock } from './modules/hero-features-block';
import { initThousands } from './modules/thousands';
import { initThousandsSwiper } from './modules/thousands-swiper';
import { initHeader } from './modules/header';
import { initMobileMenu } from './modules/mobile-menu';
import { initCompaniesSlider } from './modules/companies-slider';
import { initCalendar } from './modules/calendar';
import { initAlwaysOnline } from './modules/always-online';
import { initPlatformHeroBlock } from './modules/platform-hero-block';
import { initOurJourney } from './modules/our-journey';
import { initComparisonTable } from './modules/comparison-table';
import { initFeaturesAccordion } from './modules/features-accordion';
import { initFeaturesAccordionItem } from './modules/features-accordion-item';
import { initDemoFeatures } from './modules/demo-features';
import { initPlatformsSliders } from './modules/platforms-sliders';
import { initAnchorList } from './modules/anchor-list';
import { initPagination } from './modules/pagination';
import { initVersionFilters } from './modules/version-filters';
import { initBreadcrumbs } from './modules/breadcrumbs';
import { initDownloadSection } from './modules/download-section';

declare const document: Document;
declare const window: Window & typeof globalThis;
declare const requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => number;
declare const setTimeout: (callback: () => void, delay?: number) => number;

function initAll() {
	if (typeof document === 'undefined') return;

	initCookiesPopup();
	initHeroBlock();
	initHeroFeaturesBlock();
	initThousands();
	initHeader();
	initMobileMenu();
	initCalendar();
	initAlwaysOnline();
	initPlatformHeroBlock();
	initOurJourney();
	initComparisonTable();
	initFeaturesAccordion();
	initFeaturesAccordionItem();
	initDemoFeatures();
	initAnchorList();
	initPagination();

	if (document.getElementById('versions-section')) {
		initVersionFilters();
	}

	initBreadcrumbs();

	if (document.getElementById('download-button')) {
		initDownloadSection();
	}

	if (document.querySelector('.swiper-container')) {
		initThousandsSwiper();
	}

	if (document.getElementById('companies-swiper')) {
		if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
			requestIdleCallback(initCompaniesSlider, { timeout: 2000 });
		} else {
			setTimeout(initCompaniesSlider, 0);
		}
	}

	if (document.querySelectorAll('[data-platforms-slider]').length > 0) {
		if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
			requestIdleCallback(initPlatformsSliders, { timeout: 2000 });
		} else {
			setTimeout(initPlatformsSliders, 0);
		}
	}
}

if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAll);
	} else {
		initAll();
	}
}
