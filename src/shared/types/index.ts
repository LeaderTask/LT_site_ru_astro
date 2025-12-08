import type { CollectionEntry } from 'astro:content';

export type Link = {
	href: string;
	label: string;
};

export interface Post extends CollectionEntry<'articles'> {
	Content: unknown;
}

export type Author = {
	firstName: string;
	lastName: string;
	position: string;
	description?: string;
	avatar?: string;
	id: string;
};

export type TagWithData = {
	tag: string;
	data: {
		title: string;
	};
};

export type EnrichedPost = Omit<CollectionEntry<'articles'>, 'data'> & {
	data: {
		title: string;
		date: Date;
		author: Author | null;
		coverImage?: string;
		tags: TagWithData[];
		description?: string;
		rightSidebar?: {
			title?: string;
			description?: string;
			linkText?: string;
			linkUrl?: string;
		};
	};
};

export interface ImgProps {
	src?: string;
	alt?: string;
	variant?: 'full' | 'short' | 'icon';
	id?: string;
}

export interface ImgBlockProps {
	src?: string;
	alt?: string;
	variant?: 'full' | 'short' | 'icon';
	id?: string;
	text: string;
	textPosition?: 'left' | 'right';
	textType?: 'p' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	href?: string;
}
