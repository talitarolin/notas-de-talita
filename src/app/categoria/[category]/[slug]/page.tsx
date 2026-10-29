import { notFound, redirect } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/content';

interface CategoryArticlePageProps {
    params: { category: string; slug: string };
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        category: post.categorySlug,
        slug: post.slug,
    }));
}

export default function CategoryArticlePage({ params }: CategoryArticlePageProps) {
    const post = getPostBySlug(params.category, params.slug);

    if (!post) {
        notFound();
    }

    redirect(`/${post.categorySlug}/${post.slug}`);
}
