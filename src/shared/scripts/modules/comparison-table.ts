declare const document: Document;
declare const setTimeout: (callback: () => void, delay?: number) => number;

export function initComparisonTable() {
	const PLANS = [
		{
			type: 'free',
			title: 'Free',
			titleColor: 'text-primary',
			color: 'black',
			buttonText: 'Try Free plan now',
		},
		{
			type: 'premium',
			title: 'Premium',
			titleColor: 'text-accent-orange',
			color: 'orange',
			buttonText: 'Subscribe Premium',
		},
		{
			type: 'business',
			title: 'Business',
			titleColor: 'text-accent-blue',
			color: 'purple',
			buttonText: 'Subscribe Business',
		},
	];

	const SECTIONS = [
		{
			title: 'Key features',
			features: [
				{ name: 'Tasks', free: '100', premium: '∞', business: '∞' },
				{ name: 'Projects', free: '10', premium: '∞', business: '∞' },
				{ name: 'Subprojects and subtasks', free: true, premium: true, business: true },
				{ name: 'Cards on boards', free: '100', premium: '∞', business: '∞' },
				{ name: 'Boards', free: '3', premium: '∞', business: '∞' },
				{ name: 'Calendar view for tasks', free: true, premium: true, business: true },
				{ name: 'Tasks from email', free: false, premium: true, business: true },
				{ name: 'Notifications and reminders', free: true, premium: true, business: true },
				{ name: 'Trash bin', free: false, premium: true, business: true },
				{ name: 'Calendar', free: true, premium: true, business: true },
			],
		},
		{
			title: 'Task properties',
			features: [
				{ name: 'Labels', free: '3', premium: '∞', business: '∞' },
				{ name: 'Colors', free: '3', premium: '∞', business: '∞' },
				{ name: 'File attachments', free: false, premium: true, business: true },
				{ name: 'Task and card chat', free: false, premium: true, business: true },
				{ name: 'Recurring tasks', free: false, premium: true, business: true },
				{ name: 'Checklists', free: false, premium: true, business: true },
			],
		},
		{
			title: 'Team collaboration',
			features: [
				{ name: 'Shared boards', free: false, premium: false, business: true },
				{ name: 'Shared projects', free: false, premium: false, business: true },
				{ name: 'Task assignments', free: false, premium: false, business: true },
				{ name: 'Department organization', free: false, premium: false, business: true },
			],
		},
		{
			title: 'Autonomy',
			features: [
				{ name: 'Offline mode', free: true, premium: true, business: true },
				{ name: 'Updates', free: true, premium: true, business: true },
				{ name: 'Sync', free: false, premium: true, business: true },
				{ name: 'Cloud storage', free: false, premium: true, business: true },
			],
		},
	];

	let mobileExpanded = false;
	let desktopExpanded = false;
	let selectedPlanIndex = 0;
	let slideDirection = 'right';

	const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
	const mobileToggleIcon = document.getElementById('mobile-toggle-icon');
	const mobileContent = document.getElementById('mobile-content');
	const mobilePrevBtn = document.getElementById('mobile-prev-btn');
	const mobileNextBtn = document.getElementById('mobile-next-btn');
	const mobilePlanTitle = document.getElementById('mobile-plan-title');
	const mobileCtaButton = document.getElementById('mobile-cta-button');
	const desktopToggleBtn = document.getElementById('desktop-toggle-btn');
	const desktopToggleIcon = document.getElementById('desktop-toggle-icon');
	const desktopContent = document.getElementById('desktop-content');

	function getFeatureValue(feature: { [key: string]: string | boolean }, planIndex: number): string | boolean {
		const planType = PLANS[planIndex].type;
		return feature[planType];
	}

	function updateMobilePlan(planIndex: number, direction: string): void {
		if (!mobilePlanTitle || !mobileCtaButton) return;

		const plan = PLANS[planIndex];
		mobilePlanTitle.textContent = plan.title;
		mobilePlanTitle.className = `font-bold text-[18px] leading-6 transition-all duration-100 ${plan.titleColor}`;
		mobilePlanTitle.setAttribute('data-plan-index', planIndex.toString());

		if (direction === 'right') {
			mobilePlanTitle.classList.add('slide-right-enter');
			setTimeout(() => {
				mobilePlanTitle?.classList.remove('slide-right-enter');
			}, 100);
		} else {
			mobilePlanTitle.classList.add('slide-left-enter');
			setTimeout(() => {
				mobilePlanTitle?.classList.remove('slide-left-enter');
			}, 100);
		}

		const featureValues = document.querySelectorAll('.mobile-feature-value');
		featureValues.forEach((container) => {
			const featureName = container.getAttribute('data-feature-name');
			if (!featureName) return;

			const section = SECTIONS.find((s) => s.features.some((f) => f.name === featureName));
			if (!section) return;

			const feature = section.features.find((f) => f.name === featureName);
			if (!feature) return;

			const value = getFeatureValue(feature, planIndex);
			const color = plan.color;

			container.innerHTML = '';
			const featureValueEl = document.createElement('div');
			featureValueEl.className = 'w-25 text-center flex items-center justify-center';
			featureValueEl.setAttribute('data-value', JSON.stringify(value));
			featureValueEl.setAttribute('data-color', color);

			if (typeof value === 'boolean' && value) {
				const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				svg.setAttribute(
					'class',
					`w-5 h-5 ${
						color === 'orange' ? 'text-accent-orange' : color === 'purple' ? 'text-accent-blue' : 'text-secondary'
					}`
				);
				const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
				use.setAttribute('href', '/icons/all-icons.svg#icon-check-mark');
				svg.appendChild(use);
				featureValueEl.appendChild(svg);
			} else if (typeof value === 'boolean' && !value) {
				const span = document.createElement('span');
				span.className = `text-[14px] font-bold px-0.5 leading-5 ${
					color === 'orange' ? 'text-accent-orange' : color === 'purple' ? 'text-accent-blue' : 'text-secondary'
				}`;
				span.textContent = '—';
				featureValueEl.appendChild(span);
			} else {
				const span = document.createElement('span');
				span.className = `font-medium text-[16px] leading-6 ${
					color === 'orange' ? 'text-accent-orange' : color === 'purple' ? 'text-accent-blue' : 'text-secondary'
				}`;
				span.textContent = String(value);
				featureValueEl.appendChild(span);
			}

			container.appendChild(featureValueEl);
		});

		mobileCtaButton.innerHTML = `<a href="${
			plan.type === 'free'
				? '/downloads'
				: plan.type === 'premium'
					? 'https://www.market.leadertask.ru/market-en'
					: 'https://www.market.leadertask.ru/market-en?userscount=2'
		}" ${plan.type === 'free' ? '' : 'target="_blank"'} class="cursor-pointer rounded-2 py-2.5 px-2 font-semibold text-[14px] leading-5 md:text-base transition-all duration-300 inline-block text-center no-underline w-50 ${
			plan.type === 'free'
				? 'bg-primary text-white hover:bg-dark-hover'
				: plan.type === 'premium'
					? 'bg-accent-orange text-white hover:bg-accent-orange-dark'
					: 'bg-accent-blue text-white hover:bg-accent-blue-link'
		}">${plan.buttonText}</a>`;
	}

	function toggleMobileExpanded() {
		mobileExpanded = !mobileExpanded;
		if (mobileContent && mobileToggleIcon) {
			if (mobileExpanded) {
				mobileContent.style.display = 'block';
				setTimeout(() => {
					mobileContent.style.opacity = '1';
				}, 10);
			} else {
				mobileContent.style.opacity = '0';
				setTimeout(() => {
					mobileContent.style.display = 'none';
				}, 200);
			}
			mobileToggleIcon.classList.toggle('rotate-180');
		}
	}

	function toggleDesktopExpanded() {
		desktopExpanded = !desktopExpanded;
		if (desktopContent && desktopToggleIcon) {
			if (desktopExpanded) {
				desktopContent.style.display = 'block';
				setTimeout(() => {
					desktopContent.style.opacity = '1';
				}, 10);
			} else {
				desktopContent.style.opacity = '0';
				setTimeout(() => {
					desktopContent.style.display = 'none';
				}, 200);
			}
			desktopToggleIcon.classList.toggle('rotate-180');
		}
	}

	function nextPlan() {
		if (selectedPlanIndex < 2) {
			slideDirection = 'right';
			selectedPlanIndex++;
			updateMobilePlan(selectedPlanIndex, slideDirection);
			updateMobileButtons();
		}
	}

	function previousPlan() {
		if (selectedPlanIndex > 0) {
			slideDirection = 'left';
			selectedPlanIndex--;
			updateMobilePlan(selectedPlanIndex, slideDirection);
			updateMobileButtons();
		}
	}

	function updateMobileButtons() {
		if (mobilePrevBtn && mobileNextBtn) {
			if (selectedPlanIndex > 0) {
				mobilePrevBtn.classList.remove('hidden');
			} else {
				mobilePrevBtn.classList.add('hidden');
			}

			if (selectedPlanIndex < 2) {
				mobileNextBtn.classList.remove('hidden');
			} else {
				mobileNextBtn.classList.add('hidden');
			}
		}
	}

	if (mobileToggleBtn) {
		mobileToggleBtn.addEventListener('click', toggleMobileExpanded);
	}

	if (desktopToggleBtn) {
		desktopToggleBtn.addEventListener('click', toggleDesktopExpanded);
	}

	if (mobilePrevBtn) {
		mobilePrevBtn.addEventListener('click', previousPlan);
	}

	if (mobileNextBtn) {
		mobileNextBtn.addEventListener('click', nextPlan);
	}

	updateMobileButtons();
}
