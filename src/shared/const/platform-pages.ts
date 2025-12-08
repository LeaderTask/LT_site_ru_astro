export const HERO_BLOCK: Record<
	string,
	{
		platform: string;
		gradientText: string;
		title: string;
		description: string;
		features: string[];
		image: string;
		imageMobile?: string;
		textButton: string;
		linkButton: string;
	}
> = {
	webApp: {
		platform: 'web',
		gradientText: 'Work with LeaderTask',
		title: 'in the web app',
		description: 'Work online in LeaderTask and keep your projects on track.',
		features: ['Simple and fully featured', 'No setup needed', 'Try it free'],
		image: '/site-app.webp',
		imageMobile: '/site-app-mobile.webp',
		textButton: 'Get started for free',
		linkButton: 'https://www.leadertask.com/web/login',
	},
	windows: {
		platform: 'windows',
		gradientText: 'Work with LeaderTask',
		title: 'on Windows',
		description: 'Get the app on your PC and manage tasks with your team.',
		features: ['Simple and fully featured', 'No setup needed', 'Try it free'],
		image: '/windows-app.webp',
		imageMobile: '/windows-app-mobile.webp',
		textButton: 'Download',
		linkButton: '/leadertask.exe',
	},
	android: {
		platform: 'android',
		gradientText: 'The best task planner',
		title: 'for Android',
		description: 'Your all-in-one to-do app and daily organizer',
		features: ['Simple and fully featured', 'No setup needed', 'Try it free'],
		image: '/android-app.webp',
		textButton: 'Download',
		linkButton: 'https://play.google.com/store/apps/details?id=com.leadertask.app&pli=1',
	},
	ios: {
		platform: 'ios',
		gradientText: 'The best task planner',
		title: 'for iPhone',
		description: 'Your all-in-one to-do app and daily organizer',
		features: ['Simple and fully featured', 'No setup needed', 'Try it free'],
		image: '/ios-app.webp',
		textButton: 'Download',
		linkButton:
			'https://apps.apple.com/ru/app/%D0%BB%D0%B8%D0%B4%D0%B5%D1%80%D1%82%D0%B0%D1%81%D0%BA-%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D1%89%D0%B8%D0%BA-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87/id6504613667',
	},
};

export const FEATURES_BLOCK: Record<string, { icon: string; title: string; description: string }[]> = {
	webApp: [
		{
			icon: 'icon-internet',
			title: 'Access from anywhere',
			description:
				'Open LeaderTask on any device or browser and keep your workspace just one click away,<br />wherever you are.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Flexible calendar views',
			description:
				'View your schedule by day, week, month, year, or even multiple years. Organize daily tasks or plan long-term goals all in one calendar.',
		},
		{
			icon: 'icon-board',
			title: 'Boards',
			description:
				'See your workflow at a glance with Kanban-style boards. Move tasks between stages and track progress effortlessly.',
		},
		{
			icon: 'icon-reminder',
			title: 'Notifications & reminders',
			description: 'Stay on top of deadlines and events with reminders right in your browser or by email.',
		},
		{
			icon: 'icon-archive',
			title: 'Everything in one place',
			description: 'Keep notes, files, and tasks together in a single app. Stay organized no matter where you are.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Team collaboration',
			description: 'Share projects, assign tasks, and track progress in real time. Seamless collaboration from anywhere.',
		},
	],
	windows: [
		{
			icon: 'icon-offline-access',
			title: 'Offline access',
			description:
				'Plan and manage your tasks anytime, even without internet. Everything updates automatically once you’re back online.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Flexible calendar views',
			description:
				'View your schedule by day, week, month, year, or even multiple years. Organize daily tasks or plan long-term goals all in one calendar.',
		},
		{
			icon: 'icon-board',
			title: 'Boards',
			description:
				'See your workflow at a glance with Kanban-style boards. Move tasks between stages and track progress effortlessly.',
		},
		{
			icon: 'icon-reminder',
			title: 'Notifications & reminders',
			description: 'Stay on top of deadlines and events with reminders right in your browser or by email.',
		},
		{
			icon: 'icon-archive',
			title: 'Everything in one place',
			description: 'Keep notes, files, and tasks together in a single app. Stay organized no matter where you are.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Team collaboration',
			description: 'Share projects, assign tasks, and track progress in real time. Perfect for smooth teamwork on the go.',
		},
	],
	android: [
		{
			icon: 'icon-offline-access',
			title: 'Offline access',
			description:
				'Plan and manage your tasks anytime, even without internet. Everything updates automatically once you’re back online.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Flexible calendar views',
			description:
				'View your schedule by day, week, month, year, or even multiple years. Organize daily tasks or plan long-term goals all in one calendar.',
		},
		{
			icon: 'icon-board',
			title: 'Boards',
			description:
				'See your workflow at a glance with Kanban-style boards. Move tasks between stages and track progress effortlessly.',
		},
		{
			icon: 'icon-reminder',
			title: 'Notifications & reminders',
			description: 'Stay on top of everything with instant notifications and timely reminders on your phone.',
		},
		{
			icon: 'icon-archive',
			title: 'Everything in one place',
			description: 'Keep notes, files, and tasks together in a single app. Stay organized no matter where you are.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Team collaboration',
			description: 'Share projects, assign tasks, and track progress in real time. Perfect for smooth teamwork on the go.',
		},
	],
	ios: [
		{
			icon: 'icon-offline-access',
			title: 'Offline access',
			description:
				'Plan and manage your tasks anytime, even without internet. Everything updates automatically once you’re back online.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Flexible calendar views',
			description:
				'View your schedule by day, week, month, year, or even multiple years. Organize daily tasks or plan long-term goals all in one calendar.',
		},
		{
			icon: 'icon-board',
			title: 'Boards',
			description:
				'See your workflow at a glance with Kanban-style boards. Move tasks between stages and track progress effortlessly.',
		},
		{
			icon: 'icon-reminder',
			title: 'Notifications & reminders',
			description: 'Stay on top of everything with instant notifications and timely reminders on your phone.',
		},
		{
			icon: 'icon-archive',
			title: 'Everything in one place',
			description: 'Keep notes, files, and tasks together in a single app. Stay organized no matter where you are.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Team collaboration',
			description: 'Share projects, assign tasks, and track progress in real time. Perfect for smooth teamwork on the go.',
		},
	],
};

export const SLIDER_ITEMS: Record<
	string,
	{
		desktop?: string[];
		mobile?: string[];
		maxHeightImage: string;
		maxHeightImageMobile: string;
		slidePerView: number;
		slidePerViewMobile: number;
		spaceBetween: number;
		initialSlide: number;
	}
> = {
	webApp: {
		desktop: [
			'/site-app-screen-1.webp',
			'/site-app-screen-2.webp',
			'/site-app-screen-3.webp',
			'/site-app-screen-4.webp',
			'/site-app-screen-1.webp',
			'/site-app-screen-2.webp',
			'/site-app-screen-3.webp',
			'/site-app-screen-4.webp',
		],
		mobile: [
			'/site-app-screen-1-mobile.webp',
			'/site-app-screen-2-mobile.webp',
			'/site-app-screen-3-mobile.webp',
			'/site-app-screen-4-mobile.webp',
			'/site-app-screen-1-mobile.webp',
			'/site-app-screen-2-mobile.webp',
			'/site-app-screen-3-mobile.webp',
			'/site-app-screen-4-mobile.webp',
		],
		maxHeightImage: '560px',
		maxHeightImageMobile: '288px',
		slidePerView: 1.5,
		slidePerViewMobile: 1.2,
		spaceBetween: 15,
		initialSlide: 0,
	},
	windows: {
		desktop: [
			'/windows-app-1.webp',
			'/windows-app-2.webp',
			'/windows-app-3.webp',
			'/windows-app-4.webp',
			'/windows-app-1.webp',
			'/windows-app-2.webp',
			'/windows-app-3.webp',
			'/windows-app-4.webp',
		],
		maxHeightImage: '560px',
		maxHeightImageMobile: '288px',
		slidePerView: 1.5,
		slidePerViewMobile: 1.2,
		spaceBetween: 15,
		initialSlide: 0,
	},
	android: {
		desktop: [
			'/android-app-1.webp',
			'/android-app-2.webp',
			'/android-app-3.webp',
			'/android-app-4.webp',
			'/android-app-5.webp',
			'/android-app-6.webp',
			'/android-app-1.webp',
			'/android-app-2.webp',
			'/android-app-3.webp',
			'/android-app-4.webp',
			'/android-app-5.webp',
			'/android-app-6.webp',
		],
		maxHeightImage: '560px',
		maxHeightImageMobile: '480px',
		slidePerView: 4.5,
		slidePerViewMobile: 1.3,
		spaceBetween: 25,
		initialSlide: 0,
	},
	ios: {
		desktop: [
			'/ios-app-1.webp',
			'/ios-app-2.webp',
			'/ios-app-3.webp',
			'/ios-app-4.webp',
			'/ios-app-5.webp',
			'/ios-app-6.webp',
			'/ios-app-1.webp',
			'/ios-app-2.webp',
			'/ios-app-3.webp',
			'/ios-app-4.webp',
			'/ios-app-5.webp',
			'/ios-app-6.webp',
		],
		maxHeightImage: '560px',
		maxHeightImageMobile: '480px',
		slidePerView: 4.5,
		slidePerViewMobile: 1.3,
		spaceBetween: 25,
		initialSlide: 0,
	},
};
