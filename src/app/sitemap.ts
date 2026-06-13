import { allPosts } from 'contentlayer/generated';

export default function sitemap() {
    const posts = allPosts.map((post) => ({
        url: `https://example.com/${post.categorySlug}/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
    }));

    const categories = Array.from(new Set(allPosts.map((post) => post.categorySlug))).map((category) => ({
        url: `https://example.com/categoria/${category}`,
        lastModified: new Date().toISOString(),
    }));

    return [
        { url: 'https://example.com', lastModified: new Date().toISOString() },
        { url: 'https://example.com/search', lastModified: new Date().toISOString() },
        ...categories,
        ...posts,
    ];
}
