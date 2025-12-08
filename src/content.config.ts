import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		h1: z.string().optional(),
		breadcrumb: z.string().optional(),
		date: z.date(),
		updatedAt: z.date().optional(),
		author: z.string().optional(),
		description: z.string().optional(),
		coverImage: z.string().optional(),
		isFollow: z.boolean().optional(),
		tags: z
			.array(
				z.union([
					z.string(),
					z.object({
						tag: z.string(),
					}),
				])
			)
			.optional(),
		body: z.string().optional(),
		linkableHeadings: z.array(z.string()).optional(),
		rightSidebar: z
			.object({
				title: z.string().optional(),
				description: z.string().optional(),
				linkText: z.string().optional(),
				linkUrl: z.string().optional(),
			})
			.optional(),
		recommendation: z
			.array(
				z.object({
					article: z.string(),
				})
			)
			.max(3)
			.optional(),
	}),
});

const pages = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		date: z.date(),
		description: z.string().optional(),
		isFollow: z.boolean().optional(),
		keywords: z.string().optional(),
		setBody: z.boolean().optional(),
		body: z.string().optional(),
	}),
});

const config = defineCollection({
	type: 'data',
	schema: z.object({
		seo: z.object({
			title: z.string(),
			siteOwner: z.string(),
		}),
		nav: z.array(z.any()).optional(),
		contactLinks: z.array(z.any()).optional(),
	}),
});

const tags = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
	}),
});

const authors = defineCollection({
	type: 'content',
	schema: z.object({
		firstName: z.string(),
		lastName: z.string(),
		position: z.string(),
		description: z.string().optional(),
		avatar: z.string().optional(),
		isFollow: z.boolean().optional(),
	}),
});

const versions = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.date(),
		type: z.enum(['Mobile', 'Windows', 'Web app']),
		body: z.string().optional(),
		linkableHeadings: z.array(z.string()).optional(),
		rightSidebar: z
			.object({
				title: z.string().optional(),
				description: z.string().optional(),
				linkText: z.string().optional(),
				linkUrl: z.string().optional(),
			})
			.optional(),
	}),
});

const robots = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		body: z.string().optional(),
	}),
});

const cases = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		date: z.date().optional(),
		industry: z.string().optional(),
		company: z.string().optional(),
		author: z.string().optional(),
		description: z.string().optional(),
		coverImage: z.string().optional(),
		body: z.string().optional(),
	}),
});

const comparisons = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		opponent: z.string(),
		date: z.date().optional(),
		description: z.string().optional(),
		coverImage: z.string().optional(),
		body: z.string().optional(),
	}),
});

const partners = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		website: z.string().optional(),
		description: z.string().optional(),
		logo: z.string().optional(),
		body: z.string().optional(),
	}),
});

const vacancies = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		department: z.string().optional(),
		location: z.string().optional(),
		format: z.string().optional(),
		salary: z.string().optional(),
		description: z.string().optional(),
		body: z.string().optional(),
	}),
});

const clients = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		industry: z.string().optional(),
		logo: z.string().optional(),
		description: z.string().optional(),
		body: z.string().optional(),
	}),
});

const checklists = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		description: z.string().optional(),
		coverImage: z.string().optional(),
		body: z.string().optional(),
	}),
});

export const collections = {
	authors,
	articles,
	pages,
	config,
	tags,
	versions,
	robots,
	cases,
	comparisons,
	partners,
	vacancies,
	clients,
	checklists,
};
