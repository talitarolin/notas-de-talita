import { allPosts, type Post } from 'contentlayer/generated';

export type Category =
    | "estudos"
    | "reflexoes"
    | "games"
    | "fotografia"
    | "leituras";

export const categories = [
    { slug: 'estudos', label: 'Estudos' },
    { slug: 'reflexoes', label: 'Reflexões' },
    { slug: 'games', label: 'Games' },
    { slug: 'fotografia', label: 'Fotografia' },
    { slug: 'leituras', label: 'Leituras' },
] as const;

export const categoryLabels = new Map(categories.map((item) => [item.slug, item.label]));

export const getAllPosts = () => {
    return allPosts
        .slice()
        .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
};

export const getPostBySlug = (category: string, slug: string) => {
    return allPosts.find((post) => post.categorySlug === category && post.slug === slug);
};

export const getPostsByCategory = (category: string) => {
    return getAllPosts().filter((post) => post.categorySlug === category);
};

export const getPostsByTag = (tag: string) => {
    const normalized = tag.toLowerCase();
    return getAllPosts().filter((post) => post.tags.some((item) => item.toLowerCase() === normalized));
};

export const getTagLabelFromSlug = (slug: string) => {
    const item = getAllTags().find((tag) => normalizeTag(tag) === slug);
    return item ?? slug;
};

export const getAllTags = () => {
    const tags = new Set<string>();
    allPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' }));
};

export const getRelatedPosts = (currentSlug: string, tag: string) => {
    return getAllPosts()
        .filter((post) => post.slug !== currentSlug && post.tags.includes(tag))
        .slice(0, 3);
};

export const normalizeTag = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');

export const normalizeSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '');

export const getAllTagSlugs = () => getAllTags().map(normalizeTag);
