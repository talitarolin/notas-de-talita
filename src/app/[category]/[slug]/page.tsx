import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getAllPosts, getPostBySlug, categoryLabels, getRelatedPosts } from '@/lib/content';
import { PostContent } from '@/components/PostContent';
import { ReadingProgress } from '@/components/ReadingProgress';
import { TagPill } from '@/components/TagPill';

interface ArticlePageProps {
    params: { category: string; slug: string };
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({
        category: post.categorySlug,
        slug: post.slug,
    }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const post = getPostBySlug(params.category, params.slug);
    if (!post) {
        notFound();
    }

    const related = getRelatedPosts(post.slug, post.tags[0]);

    return (
        <article className="relative mx-auto max-w-[920px] px-6 pb-24 pt-8 lg:px-8">
            <ReadingProgress />
            <div className="mb-10 rounded-[28px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-10 shadow-sm dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                <div className="flex flex-wrap items-center gap-3 text-[0.75rem] uppercase tracking-[0.14em] text-[#7a1f4d]">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{format(new Date(post.date), 'dd MMM yyyy')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} min de leitura</span>
                </div>
                <h1 className="article-title mt-6 text-5xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">
                    {post.title}
                </h1>
                <p className="article-subtitle mt-6 text-xl font-light italic leading-9 text-[#5e5a55] dark:text-[#dcd6cf]">
                    {post.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <TagPill key={tag} tag={tag} />
                    ))}
                </div>
            </div>

            <PostContent code={post.body.code} />

            {related.length > 0 ? (
                <section className="mt-16 rounded-[24px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-8 shadow-sm dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                    <h2 className="text-2xl font-semibold text-[#222222] dark:text-[#ede9e2]">Também pode gostar</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {related.map((postItem) => (
                            <div key={postItem._id} className="rounded-[18px] border border-[rgba(34,34,34,0.1)] bg-white p-4 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#2a1f16]">
                                <a href={`/${postItem.categorySlug}/${postItem.slug}`} className="text-lg font-semibold leading-tight text-[#222222] hover:text-[#7a1f4d] dark:text-[#ede9e2]">
                                    {postItem.title}
                                </a>
                                <p className="mt-3 text-sm leading-7 text-[#5e5a55] dark:text-[#dcd6cf]">{postItem.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}
        </article>
    );
}
