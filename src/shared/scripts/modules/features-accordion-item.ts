declare const document: Document;
declare const setTimeout: (callback: () => void, delay?: number) => number;

export function initFeaturesAccordionItem() {
	function initAccordionItem(item: HTMLElement) {
		const itemId = item.dataset.itemId;
		const accordionId = item.dataset.accordionId;
		const dataIndex = parseInt(item.dataset.index || '0', 10);

		if (!itemId || !accordionId || isNaN(dataIndex)) {
			return;
		}

		const content = document.getElementById(`${itemId}-content`);
		const toggleIconPlus = document.getElementById(`${itemId}-toggle-icon-plus`);
		const toggleIconMinus = document.getElementById(`${itemId}-toggle-icon-minus`);
		const mainIconNormal = document.getElementById(`${itemId}-main-icon-normal`);
		const mainIconFill = document.getElementById(`${itemId}-main-icon-fill`);

		if (!(content && toggleIconPlus && toggleIconMinus && mainIconNormal && mainIconFill)) {
			return;
		}

		let isAnimating = false;

		const toggle = () => {
			if (isAnimating) {
				return;
			}

			const accordion = document.getElementById(`${accordionId}-desktop`);
			if (accordion) {
				accordion.dispatchEvent(
					new CustomEvent('accordion-toggle', {
						detail: { index: dataIndex },
						bubbles: false,
					})
				);
			}
		};

		item.addEventListener('click', toggle);

		item.addEventListener('set-active', (e) => {
			const shouldBeActive = (e as CustomEvent).detail.isActive;

			isAnimating = true;

			if (shouldBeActive) {
				content.style.gridTemplateRows = '1fr';

				toggleIconPlus.style.opacity = '0';
				toggleIconMinus.style.opacity = '1';
				mainIconNormal.style.opacity = '0';
				mainIconFill.style.opacity = '1';
			} else {
				content.style.gridTemplateRows = '0fr';

				toggleIconPlus.style.opacity = '1';
				toggleIconMinus.style.opacity = '0';
				mainIconNormal.style.opacity = '1';
				mainIconFill.style.opacity = '0';
			}

			setTimeout(() => {
				isAnimating = false;
			}, 300);
		});
	}

	function initAllItems() {
		const items = document.querySelectorAll('[data-item-id]');
		items.forEach((item) => {
			if (item instanceof HTMLElement) {
				initAccordionItem(item);
			}
		});
	}

	initAllItems();
}
