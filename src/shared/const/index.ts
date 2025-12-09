import type { Link } from '@/shared/types';
import { FEATURES_BLOCK, HERO_BLOCK, SLIDER_ITEMS } from './platform-pages';

export const LINKS: { title: string; links: Link[] }[] = [
	{
		title: 'LeaderTask',
		links: [
			{
				href: '/pricing',
				label: 'Цены',
			},
			{
				href: '/features',
				label: 'Возможности',
			},
			{
				href: '/articles/page/1',
				label: 'Блог',
			},
		],
	},
	{
		title: 'Платформы',
		links: [
			{
				href: '/platforms/web',
				label: 'Веб',
			},
			{
				href: '/platforms/windows',
				label: 'Windows',
			},
			{
				href: '/platforms/android',
				label: 'Android',
			},
			{
				href: '/platforms/ios',
				label: 'iOS',
			},
		],
	},
	{
		title: 'О компании',
		links: [
			{
				href: '/about',
				label: 'О нас',
			},
			{
				href: '/contacts',
				label: 'Контакты',
			},
			{
				href: '/versions',
				label: 'Обновления',
			},
			{
				href: '/security',
				label: 'Безопасность',
			},
		],
	},
];

export const FEATURES_SLIDER_1_ITEMS = [
	{
		icon: 'icon-reminder',
		title: 'Напоминания и повторения',
		description: 'Ставьте напоминания и повторяющиеся задачи с гибкими графиками — больше никаких пропущенных дедлайнов.',
		image: '/reminders-and-recurrence.webp',
	},
	{
		icon: 'icon-checklist-feature',
		title: 'Чек-листы и описания задач',
		description: 'Добавляйте подробные описания и чек-листы, чтобы видеть каждый шаг процесса.',
		image: '/checklists-and-task-descriptions.webp',
	},
	{
		icon: 'icon-chat',
		title: 'Чаты и вложения',
		description: 'Обсуждайте задачи во встроенных чатах и прикрепляйте файлы прямо в карточку — всё нужное в одном месте.',
		image: '/chats-and-attachments.webp',
	},
	{
		icon: 'icon-tag',
		title: 'Теги, цвета и фокус',
		description: 'Организуйте задачи по тегам и цветам. Отмечайте главное в списке «Фокус», чтобы работать сосредоточенно.',
		image: '/tags-colors-and-focus.webp',
	},
];

export const FEATURES_SLIDER_2_ITEMS = [
	{
		icon: 'icon-filter',
		title: 'Фильтры',
		description: 'Фильтруйте по дате, статусу, исполнителю, проекту и другим параметрам, чтобы быстро находить нужное.',
		image: '/filters.webp',
	},
	{
		icon: 'icon-sorting',
		title: 'Сортировка',
		description: 'Сортируйте задачи по приоритету, срокам или своим критериям в пару кликов.',
		image: '/sorting.webp',
		customClass: '!max-w-44.5 !max-h-61.25 md:!max-h-109 md:!max-w-85 ',
		justifyClass: '!justify-center',
	},
	{
		icon: 'icon-hightlights',
		title: 'Актуальные выделения',
		description: 'Держите под контролем непрочитанное, просрочки и уведомления в отдельных представлениях.',
		image: '/current-highlights.webp',
	},
	{
		icon: 'icon-recycle',
		title: 'Корзина и архив',
		description: 'Удалённые задачи можно восстановить — данные всегда под контролем.',
		image: '/recycle-bin-and-archive.webp',
	},
];

export const HERO_BLOCK_PLATFORM_PAGES = {
	webApp: HERO_BLOCK.webApp,
	windows: HERO_BLOCK.windows,
	android: HERO_BLOCK.android,
	ios: HERO_BLOCK.ios,
};

export const FEATURES_BLOCK_PLATFORM_PAGES = {
	webApp: FEATURES_BLOCK.webApp,
	windows: FEATURES_BLOCK.windows,
	android: FEATURES_BLOCK.android,
	ios: FEATURES_BLOCK.ios,
};

export const SLIDER_ITEMS_PLATFORM_PAGES = {
	webApp: SLIDER_ITEMS.webApp,
	windows: SLIDER_ITEMS.windows,
	android: SLIDER_ITEMS.android,
	ios: SLIDER_ITEMS.ios,
};
