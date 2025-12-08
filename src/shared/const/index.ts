import type { Link } from '@/shared/types';
import { FEATURES_BLOCK, HERO_BLOCK, SLIDER_ITEMS } from './platform-pages';

export const LINKS: { title: string; links: Link[] }[] = [
	{
		title: 'LeaderTask',
		links: [
			{
				href: '/pricing',
				label: 'Pricing',
			},
			{
				href: '/features',
				label: 'Features',
			},
			{
				href: '/articles/page/1',
				label: 'Blog',
			},
		],
	},
	{
		title: 'Platforms',
		links: [
			{
				href: '/platforms/web',
				label: 'Web',
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
		title: 'About',
		links: [
			{
				href: '/about',
				label: 'About us',
			},
			{
				href: '/contacts',
				label: 'Contact',
			},
			{
				href: '/versions',
				label: 'Updates',
			},
			{
				href: '/security',
				label: 'Security',
			},
		],
	},
];

export const FEATURES_SLIDER_1_ITEMS = [
	{
		icon: 'icon-reminder',
		title: 'Reminders and recurrence',
		description: 'Set reminders and recurring tasks with flexible schedules – never miss a deadline.',
		image: '/reminders-and-recurrence.webp',
	},
	{
		icon: 'icon-checklist-feature',
		title: 'Checklists and task descriptions',
		description: 'Add detailed descriptions and checklists to visualize every step of your workflow.',
		image: '/checklists-and-task-descriptions.webp',
	},
	{
		icon: 'icon-chat',
		title: 'Chats and attachments',
		description: 'Discuss tasks in built-in chats and attach files right to the task card – everything you need in one place.',
		image: '/chats-and-attachments.webp',
	},
	{
		icon: 'icon-tag',
		title: 'Tags, colors, and focus',
		description: 'Organize tasks by tags and colors. Highlight what matters most in the “Focus” list to boost concentration.',
		image: '/tags-colors-and-focus.webp',
	},
];

export const FEATURES_SLIDER_2_ITEMS = [
	{
		icon: 'icon-filter',
		title: 'Filters',
		description: 'Filter by date, status, assignee, project, and more to locate exactly what you need.',
		image: '/filters.webp',
	},
	{
		icon: 'icon-sorting',
		title: 'Sorting',
		description: 'Sort tasks by priority, due dates, or custom criteria with just a few clicks.',
		image: '/sorting.webp',
		customClass: '!max-w-44.5 !max-h-61.25 md:!max-h-109 md:!max-w-85 ',
		justifyClass: '!justify-center',
	},
	{
		icon: 'icon-hightlights',
		title: 'Current highlights',
		description: 'Stay on top of unread items, overdue tasks, and notifications in dedicated views.',
		image: '/current-highlights.webp',
	},
	{
		icon: 'icon-recycle',
		title: 'Recycle bin and archive',
		description: 'Deleted tasks can be restored – your data is always under control.',
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
