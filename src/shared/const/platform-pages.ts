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
		gradientText: 'Работайте с LeaderTask',
		title: 'в веб-приложении',
		description: 'Работайте онлайн в LeaderTask и держите проекты под контролем.',
		features: ['Просто и полнофункционально', 'Не требует настройки', 'Попробуйте бесплатно'],
		image: '/site-app.webp',
		imageMobile: '/site-app-mobile.webp',
		textButton: 'Начать бесплатно',
		linkButton: 'https://www.leadertask.com/web/login',
	},
	windows: {
		platform: 'windows',
		gradientText: 'Работайте с LeaderTask',
		title: 'на Windows',
		description: 'Скачайте приложение на ПК и управляйте задачами вместе с командой.',
		features: ['Просто и полнофункционально', 'Не требует настройки', 'Попробуйте бесплатно'],
		image: '/windows-app.webp',
		imageMobile: '/windows-app-mobile.webp',
		textButton: 'Скачать',
		linkButton: '/leadertask.exe',
	},
	android: {
		platform: 'android',
		gradientText: 'Лучший планировщик задач',
		title: 'для Android',
		description: 'Ваш универсальный список дел и ежедневник',
		features: ['Просто и полнофункционально', 'Не требует настройки', 'Попробуйте бесплатно'],
		image: '/android-app.webp',
		textButton: 'Скачать',
		linkButton: 'https://play.google.com/store/apps/details?id=com.leadertask.app&pli=1',
	},
	ios: {
		platform: 'ios',
		gradientText: 'Лучший планировщик задач',
		title: 'для iPhone',
		description: 'Ваш универсальный список дел и ежедневник',
		features: ['Просто и полнофункционально', 'Не требует настройки', 'Попробуйте бесплатно'],
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
			title: 'Доступ отовсюду',
			description:
				'Открывайте LeaderTask на любом устройстве или в браузере и держите рабочее пространство в одном клике,<br />где бы вы ни были.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Смотрите расписание по дням, неделям, месяцам, году или на несколько лет. Организуйте задачи на день и планируйте долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Видьте процесс целиком на досках в стиле Канбан. Перемещайте задачи между этапами и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description: 'Держите сроки и события под контролем с напоминаниями в браузере или на почту.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Храните заметки, файлы и задачи вместе в одном приложении. Порядок сохраняется, где бы вы ни были.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description:
				'Делитесь проектами, назначайте задачи и отслеживайте прогресс в реальном времени. Без швов — из любой точки.',
		},
	],
	windows: [
		{
			icon: 'icon-offline-access',
			title: 'Оффлайн-доступ',
			description:
				'Планируйте и управляйте задачами в любое время, даже без интернета. Всё синхронизируется автоматически, как только вы вернётесь онлайн.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Смотрите расписание по дням, неделям, месяцам, году или на несколько лет. Организуйте задачи на день и планируйте долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Видьте процесс целиком на досках в стиле Канбан. Перемещайте задачи между этапами и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description: 'Держите сроки и события под контролем с напоминаниями в браузере или на почту.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Храните заметки, файлы и задачи вместе в одном приложении. Порядок сохраняется, где бы вы ни были.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description:
				'Делитесь проектами, назначайте задачи и отслеживайте прогресс в реальном времени. Отлично подходит для слаженной работы в пути.',
		},
	],
	android: [
		{
			icon: 'icon-offline-access',
			title: 'Оффлайн-доступ',
			description:
				'Планируйте и управляйте задачами в любое время, даже без интернета. Всё синхронизируется автоматически, как только вы вернётесь онлайн.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Смотрите расписание по дням, неделям, месяцам, году или на несколько лет. Организуйте задачи на день и планируйте долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Видьте процесс целиком на досках в стиле Канбан. Перемещайте задачи между этапами и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description: 'Держите всё под контролем с мгновенными уведомлениями и своевременными напоминаниями на телефоне.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Храните заметки, файлы и задачи вместе в одном приложении. Порядок сохраняется, где бы вы ни были.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description:
				'Делитесь проектами, назначайте задачи и отслеживайте прогресс в реальном времени. Отлично подходит для слаженной работы в пути.',
		},
	],
	ios: [
		{
			icon: 'icon-offline-access',
			title: 'Оффлайн-доступ',
			description:
				'Планируйте и управляйте задачами в любое время, даже без интернета. Всё синхронизируется автоматически, как только вы вернётесь онлайн.',
		},
		{
			icon: 'icon-calendar-features',
			title: 'Гибкие виды календаря',
			description:
				'Смотрите расписание по дням, неделям, месяцам, году или на несколько лет. Организуйте задачи на день и планируйте долгосрочные цели в одном календаре.',
		},
		{
			icon: 'icon-board',
			title: 'Доски',
			description:
				'Видьте процесс целиком на досках в стиле Канбан. Перемещайте задачи между этапами и легко отслеживайте прогресс.',
		},
		{
			icon: 'icon-reminder',
			title: 'Уведомления и напоминания',
			description: 'Держите всё под контролем с мгновенными уведомлениями и своевременными напоминаниями на телефоне.',
		},
		{
			icon: 'icon-archive',
			title: 'Всё в одном месте',
			description: 'Храните заметки, файлы и задачи вместе в одном приложении. Порядок сохраняется, где бы вы ни были.',
		},
		{
			icon: 'icon-team-collaboration',
			title: 'Совместная работа команды',
			description:
				'Делитесь проектами, назначайте задачи и отслеживайте прогресс в реальном времени. Отлично подходит для слаженной работы в пути.',
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
