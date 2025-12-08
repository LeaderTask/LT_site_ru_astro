declare const document: Document;
declare const window: Window & typeof globalThis;

export function initPagination() {
	const initPagination = (container: HTMLElement) => {
		const pageNumber = parseInt(container.getAttribute('data-page-number') || '1', 10);
		let currentPage = parseInt(container.getAttribute('data-current-page') || '1', 10);
		const mode = container.getAttribute('data-mode') || 'client';
		const isSSR = mode === 'ssr';
		let startPage = 1;

		const baseVisiblePagesCount = 6;
		const getVisiblePagesCount = () => {
			const isMobile = window.innerWidth < 768;
			if (isMobile && currentPage >= 4) {
				return 2;
			}
			return isMobile ? 4 : baseVisiblePagesCount;
		};

		let visiblePagesCount = getVisiblePagesCount();

		const updateVisiblePagesAttribute = () => {
			container.setAttribute('data-visible-pages', visiblePagesCount.toString());
		};

		const updatePagesVisibility = () => {
			if (!isSSR) return;

			visiblePagesCount = getVisiblePagesCount();
			updateVisiblePagesAttribute();

			const isMobile = window.innerWidth < 768;
			let newStartPage: number;
			let newEndPage: number;

			if (isMobile && currentPage >= 4) {
				newStartPage = currentPage;
				newEndPage = Math.min(currentPage + visiblePagesCount - 1, pageNumber);
			} else if (isMobile) {
				newStartPage = 1;
				newEndPage = Math.min(visiblePagesCount, pageNumber);
			} else {
				newStartPage = Math.max(
					1,
					Math.min(currentPage - Math.floor(visiblePagesCount / 2), pageNumber - visiblePagesCount + 1)
				);
				newEndPage = Math.min(newStartPage + visiblePagesCount - 1, pageNumber);
			}

			const showFirstPage = newStartPage > 1;
			const showLastPage = newEndPage < pageNumber;

			container.querySelectorAll<HTMLElement>('[data-page]').forEach((element) => {
				const page = parseInt(element.getAttribute('data-page') || '0', 10);
				const parent = element.parentElement as HTMLElement | null;
				if (parent) {
					if (page === 1 && showFirstPage) {
						parent.style.display = '';
					} else if (page === pageNumber && showLastPage) {
						parent.style.display = '';
					} else if (page >= newStartPage && page <= newEndPage) {
						parent.style.display = '';
					} else {
						parent.style.display = 'none';
					}
				}
			});

			container.querySelectorAll<HTMLElement>('[data-ellipsis]').forEach((ellipsis) => {
				const ellipsisType = ellipsis.getAttribute('data-ellipsis');
				if (ellipsisType === 'first') {
					ellipsis.style.display = showFirstPage ? '' : 'none';
				} else if (ellipsisType === 'last') {
					ellipsis.style.display = showLastPage ? '' : 'none';
				}
			});
		};

		const updatePages = () => {
			container.setAttribute('data-current-page', currentPage.toString());
			container.querySelectorAll('[data-page]').forEach((btn) => {
				const page = parseInt(btn.getAttribute('data-page') || '0', 10);
				if (page === currentPage) {
					btn.classList.add('bg-accent-orange', 'text-white', 'hover:text-white');
				} else {
					btn.classList.remove('bg-accent-orange', 'text-white', 'hover:text-white');
				}
			});

			const prevBtn = container.querySelector<HTMLButtonElement>('[data-action="prev"]');
			const nextBtn = container.querySelector<HTMLButtonElement>('[data-action="next"]');
			if (prevBtn) prevBtn.disabled = currentPage === 1;
			if (nextBtn) nextBtn.disabled = currentPage === pageNumber;
		};

		const updateStartPage = () => {
			visiblePagesCount = getVisiblePagesCount();
			updateVisiblePagesAttribute();
			const endPage = startPage + visiblePagesCount - 1;
			if (currentPage < startPage || currentPage > endPage) {
				const newStartPage = Math.max(1, currentPage - Math.floor(visiblePagesCount / 2));
				const maxStartPage = pageNumber - visiblePagesCount + 1;
				startPage = Math.min(newStartPage, maxStartPage);
			}
		};

		updateVisiblePagesAttribute();
		container.style.display = '';

		if (!isSSR) {
			container.addEventListener('click', (event) => {
				if (!(event.target instanceof Element)) {
					return;
				}

				const page = event.target.closest<HTMLElement>('[data-page]');
				const action = event.target.closest<HTMLElement>('[data-action]');

				if (page) {
					const pageNum = parseInt(page.getAttribute('data-page') || '0', 10);
					if (!Number.isNaN(pageNum)) {
						currentPage = pageNum;
						updateStartPage();
						updatePages();
						container.dispatchEvent(new CustomEvent('pageChange', { detail: { page: currentPage } }));
					}
					return;
				}

				if (action) {
					const actionType = action.getAttribute('data-action');
					if (actionType === 'prev' && currentPage > 1) {
						currentPage--;
						updateStartPage();
						updatePages();
						container.dispatchEvent(new CustomEvent('pageChange', { detail: { page: currentPage } }));
					} else if (actionType === 'next' && currentPage < pageNumber) {
						currentPage++;
						updateStartPage();
						updatePages();
						container.dispatchEvent(new CustomEvent('pageChange', { detail: { page: currentPage } }));
					}
				}
			});

			updatePages();
		} else {
			updatePagesVisibility();
		}

		const handleResize = () => {
			const newVisiblePagesCount = getVisiblePagesCount();
			if (newVisiblePagesCount !== visiblePagesCount) {
				visiblePagesCount = newVisiblePagesCount;
				if (isSSR) {
					updatePagesVisibility();
				} else {
					updateStartPage();
					updatePages();
				}
			}
		};

		window.addEventListener('resize', handleResize);
	};

	const containers = document.querySelectorAll<HTMLElement>('[data-pagination]');
	containers.forEach((container) => initPagination(container));
}
