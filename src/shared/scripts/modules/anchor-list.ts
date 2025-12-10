declare const document: Document;
declare const window: Window & typeof globalThis;

export function initAnchorList() {
	const aside = document.getElementById('anchor-list');
	const list = document.getElementById('anchor-list-items');
	if (!aside || !list) return;

	let links: { id: string; text: string }[] = [];
	let activeId: string | null = null;
	let ticking = false;

	function updateActiveLink() {
		if (links.length === 0) return;

		const scrollOffset = 100;
		const scrollPosition = window.scrollY + scrollOffset;
		const elements: { id: string; top: number; bottom: number }[] = [];

		links.forEach((link) => {
			const element = document.getElementById(link.id);
			if (!element) return;

			const styles = window.getComputedStyle(element);
			const scrollMarginTop = parseInt(styles.scrollMarginTop) || 0;
			const elementTop = element.offsetTop - scrollMarginTop;
			const elementBottom = elementTop + element.offsetHeight;

			elements.push({
				id: link.id,
				top: elementTop,
				bottom: elementBottom,
			});
		});

		let newActiveId = null;

		for (let i = elements.length - 1; i >= 0; i--) {
			const element = elements[i];
			if (scrollPosition >= element.top) {
				newActiveId = element.id;
				break;
			}
		}

		if (!newActiveId && elements.length > 0) {
			newActiveId = elements[0].id;
		}

		if (activeId !== newActiveId) {
			activeId = newActiveId;
			updateLinksUI();
		}
	}

	function updateLinksUI() {
		links.forEach((link) => {
			const linkElement = list?.querySelector(`a[href="#${link.id}"]`);
			if (!linkElement) return;

			const isActive = activeId === link.id;
			const linkClasses = isActive ? 'font-bold bg-orange-light' : '';
			const iconClasses = isActive ? 'bg-accent-orange' : '';

			linkElement.className =
				`text-primary cursor-pointer hover:bg-orange-light transition-colors duration-200 rounded-3 px-3 flex items-center gap-2.5 py-2 text-sm ${linkClasses}`.trim();

			const icon = linkElement.querySelector('i');
			if (icon) {
				icon.className = `w-2 h-2 rounded-full transition-colors shrink-0 ${iconClasses}`.trim();
			}
		});
	}

	function handleClick(linkId: string, event: MouseEvent): void {
		event.preventDefault();
		const element = document.getElementById(linkId as string);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			setTimeout(() => {
				updateActiveLink();
			}, 100);
		}
	}

	const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	links = Array.from(headings).flatMap((heading) => {
		const id = heading.id;
		if (!id) return [];
		const text = heading.textContent?.trim() || '';
		if (!text) return [];
		return [{ id, text }];
	});

	list.innerHTML = '';

	links.forEach((link) => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		const icon = document.createElement('i');
		const span = document.createElement('span');

		a.href = `#${link.id}`;
		a.className =
			'text-primary cursor-pointer hover:bg-orange-light transition-colors duration-200 rounded-3 px-3 flex items-center gap-2.5 py-2 text-sm';
		a.addEventListener('click', (e) => handleClick(link.id, e));

		icon.className = 'w-2 h-2 rounded-full transition-colors';

		span.textContent = link.text;

		a.appendChild(icon);
		a.appendChild(span);
		li.appendChild(a);
		list.appendChild(li);
	});

	updateActiveLink();

	const scrollHandler = () => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				updateActiveLink();
				ticking = false;
			});
			ticking = true;
		}
	};

	window.addEventListener('scroll', scrollHandler, { passive: true });
	window.addEventListener('load', () => updateActiveLink());
}
