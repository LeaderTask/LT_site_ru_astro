import { getEntry, type CollectionEntry } from 'astro:content';
import type { EnrichedPost } from '@/shared/types';
import { getMdxContentName } from '@/shared/helpers';

export const generatedEnrichedPosts = async (posts: CollectionEntry<'articles'>[]): Promise<EnrichedPost[]> => {
	return Promise.all(
		posts.map(async (post) => {
			const authorId = post.data.author ? getMdxContentName(post.data.author) : null;
			const authorEntry = authorId ? await getEntry('authors', authorId) : null;

			const tagsData = await Promise.all(
				(post.data.tags || []).map(async (tagRef: string | { tag: string }) => {
					const tagPath = typeof tagRef === 'string' ? tagRef : tagRef.tag;
					const tagId = getMdxContentName(tagPath);
					if (!tagId) return tagRef;
					try {
						const tagEntry = await getEntry('tags', tagId);
						return tagEntry ? { tag: tagPath, data: tagEntry.data } : tagRef;
					} catch {
						return tagRef;
					}
				})
			);

			return {
				...post,
				data: {
					...post.data,
					author: authorEntry ? { ...authorEntry.data, id: authorEntry.id } : null,
					tags: tagsData,
				},
			} as EnrichedPost;
		})
	);
};
