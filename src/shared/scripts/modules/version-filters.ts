declare const document: Document;

export function initVersionFilters() {
	const section = document.getElementById('versions-section');
	if (!section) return;

	let activeType = 'All';

	function updateFilters() {
		const mobileButtons = document.querySelectorAll('#versions-mobile-filters .filter-btn');
		const desktopButtons = document.querySelectorAll('#versions-desktop-filters .filter-btn');
		const articles = document.querySelectorAll('.version-article');

		mobileButtons.forEach((btn) => {
			const { type } = (btn as HTMLElement).dataset;
			if (activeType === type) {
				btn.className =
					'px-1.5 py-1 min-w-10 rounded-2 font-semibold text-[14px] flex items-center justify-center filter-btn bg-secondary text-white';
			} else {
				btn.className =
					'px-1.5 py-1 min-w-10 rounded-2 font-semibold text-[14px] flex items-center justify-center filter-btn bg-gray-light text-tertiary';
			}
		});

		desktopButtons.forEach((btn) => {
			const { type } = (btn as HTMLElement).dataset;
			const icon = btn.querySelector('.filter-icon');
			if (activeType === type) {
				btn.className =
					'text-primary w-full cursor-pointer hover:bg-orange-light transition-colors duration-200 rounded-3 px-3 flex items-center gap-2.5 py-2 text-sm filter-btn font-bold bg-orange-light';
				if (icon) {
					icon.className = 'w-2 h-2 rounded-full transition-colors filter-icon bg-accent-orange';
				}
			} else {
				btn.className =
					'text-primary w-full cursor-pointer hover:bg-orange-light transition-colors duration-200 rounded-3 px-3 flex items-center gap-2.5 py-2 text-sm filter-btn';
				if (icon) {
					icon.className = 'w-2 h-2 rounded-full transition-colors filter-icon';
				}
			}
		});

		articles.forEach((article) => {
			const versionType = (article as HTMLElement).dataset.versionType;
			if ((activeType === 'All' && versionType !== 'Windows') || activeType === versionType) {
				(article as HTMLElement).style.display = 'flex';
			} else {
				(article as HTMLElement).style.display = 'none';
			}
		});
	}

	function handleFilterClick(type: string) {
		activeType = type;
		updateFilters();
	}

	const allButtons = document.querySelectorAll('.filter-btn');
	allButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			handleFilterClick((btn as HTMLElement).dataset.type || 'All');
		});
	});

	updateFilters();
}
