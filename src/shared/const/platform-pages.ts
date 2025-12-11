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
		gradientText: 'Веб-приложение',
		title: 'LeaderTask',
		description: 'Работайте онлайн в LeaderTask и держите свои проекты под контролем.',
		features: ['Многофункциональный', 'Не требует настройки', 'Бесплатный триал'],
		image: '/site-app.webp',
		imageMobile: '/site-app-mobile.webp',
		textButton: 'Начать бесплатно',
		linkButton: 'https://www.leadertask.com/web/login',
	},
	windows: {
		platform: 'windows',
		gradientText: 'LeaderTask',
		title: 'для Windows',
		description: 'Установите приложение на свой компьютер и управляйте задачами вместе со своей командой.',
		features: ['Многофункциональный', 'Не требует настройки', 'Бесплатный триал'],
		image: '/windows-app.webp',
		imageMobile: '/windows-app-mobile.webp',
		textButton: 'Скачать',
		linkButton: '/leadertask.exe',
	},
	android: {
		platform: 'android',
		gradientText: 'Лучший планер задач',
		title: 'для Android',
		description: 'Удобный планер и ежедневник в одном приложении',
		features: ['Многофункциональный', 'Не требует настройки', 'Бесплатный триал'],
		image: '/android-app.webp',
		textButton: 'Скачать',
		linkButton: 'https://play.google.com/store/apps/details?id=com.leadertask.app&pli=1',
	},
	ios: {
		platform: 'ios',
		gradientText: 'Лучший планер задач',
		title: 'для iPhone',
		description: 'Удобный планер и ежедневник в одном приложении',
		features: ['Многофункциональный', 'Не требует настройки', 'Бесплатный триал'],
		image: '/ios-app.webp',
		textButton: 'Скачать',
		linkButton:
			'https://apps.apple.com/ru/app/%D0%BB%D0%B8%D0%B4%D0%B5%D1%80%D1%82%D0%B0%D1%81%D0%BA-%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D1%89%D0%B8%D0%BA-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87/id6504613667',
	},
};

export const FEATURES_BLOCK: Record<string, { icon: string; title: string; description: string }[]> = {
	webApp: [
		{
			icon: 'icon-internet',
			title: 'Доступ из любой точки',
			description:
				'Откройте LeaderTask на любом устройстве или в браузере и получите доступ к задачам в один клик, где бы вы ни находились.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Просматривайте расписание по дням, неделям, месяцам и годам. Ежедневные задачи и долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Следите за всем процессом с помощью канбан-досок. Перемещайте задачи по этапам и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description:
				'Всегда оставайтесь в курсе важных событий благодаря мгновенным уведомлениям и своевременным напоминаниям.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Всё нужное в одном приложении: заметки, файлы, задачи. Никакого хаоса, всё под рукой и под контролем.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description: 'Делитесь проектами, ставьте задачи и следите за прогрессом в реальном времени. Идеально для команд.',
		},
	],
	windows: [
		{
			icon: 'icon-offline-access',
			title: 'Оффлайн-доступ',
			description:
				'Работайте с задачами где угодно, даже без интернета. Изменения синхронизируются автоматически, когда вы снова онлайн.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Просматривайте расписание по дням, неделям, месяцам и годам. Ежедневные задачи и долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Следите за всем процессом с помощью канбан-досок. Перемещайте задачи по этапам и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description:
				'Всегда оставайтесь в курсе важных событий благодаря мгновенным уведомлениям и своевременным напоминаниям.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Всё нужное в одном приложении: заметки, файлы, задачи. Никакого хаоса, всё под рукой и под контролем.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description: 'Делитесь проектами, ставьте задачи и следите за прогрессом в реальном времени. Идеально для команд.',
		},
	],
	android: [
		{
			icon: 'icon-offline-access',
			title: 'Оффлайн-доступ',
			description:
				'Работайте с задачами где угодно, даже без интернета. Изменения синхронизируются автоматически, когда вы снова онлайн.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Просматривайте расписание по дням, неделям, месяцам и годам. Ежедневные задачи и долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Следите за всем процессом с помощью канбан-досок. Перемещайте задачи по этапам и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description:
				'Всегда оставайтесь в курсе важных событий благодаря мгновенным уведомлениям и своевременным напоминаниям.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Всё нужное в одном приложении: заметки, файлы, задачи. Никакого хаоса, всё под рукой и под контролем.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description: 'Делитесь проектами, ставьте задачи и следите за прогрессом в реальном времени. Идеально для команд.',
		},
	],
	ios: [
		{
			icon: 'icon-offline-access',
			title: 'Оффлайн-доступ',
			description:
				'Работайте с задачами где угодно, даже без интернета. Изменения синхронизируются автоматически, когда вы снова онлайн.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Просматривайте расписание по дням, неделям, месяцам и годам. Ежедневные задачи и долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Следите за всем процессом с помощью канбан-досок. Перемещайте задачи по этапам и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description:
				'Всегда оставайтесь в курсе важных событий благодаря мгновенным уведомлениям и своевременным напоминаниям.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Всё нужное в одном приложении: заметки, файлы, задачи. Никакого хаоса, всё под рукой и под контролем.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description: 'Делитесь проектами, ставьте задачи и следите за прогрессом в реальном времени. Идеально для команд.',
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
			'/site-app-1.webp',
			'/site-app-2.webp',
			'/site-app-3.webp',
			'/site-app-4.webp',
			'/site-app-1.webp',
			'/site-app-2.webp',
			'/site-app-3.webp',
			'/site-app-4.webp',
		],
		mobile: [
			'/site-app-mobile-1.webp',
			'/site-app-mobile-2.webp',
			'/site-app-mobile-3.webp',
			'/site-app-mobile-4.webp',
			'/site-app-mobile-1.webp',
			'/site-app-mobile-2.webp',
			'/site-app-mobile-3.webp',
			'/site-app-mobile-4.webp',
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
