import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostsByTag, normalizeTag } from '@/lib/content';
import { format } from 'date-fns';

interface TagPageProps {
    params: { tag: string };
}

export function generateStaticParams() {
    const tags = getAllPosts().flatMap((post) => post.tags);
    return Array.from(new Set(tags)).map((tag) => ({ tag: normalizeTag(tag) }));
}

export default function TagPage({ params }: TagPageProps) {
    const posts = getPostsByTag(params.tag);
    if (posts.length === 0) {
        notFound();
    }

    return (
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-8 lg:px-8">
            <div className="mb-12 space-y-4">
                <p className="section-label inline-flex items-center gap-4 text-sm uppercase tracking-[0.14em] text-[#B88917]">
                    <span className="h-px w-16 bg-[rgba(34,34,34,0.1)]"></span>
                    Tag
                    <span className="h-px flex-1 bg-[rgba(34,34,34,0.1)]"></span>
                </p>
                <h1 className="text-5xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">#{params.tag}</h1>
                <p className="max-w-[60ch] text-lg leading-8 text-[#5e5a55] dark:text-[#dcd6cf]">
                    Artigos filtrados pela tag #{params.tag}. Navegue pelos textos que compartilham este tema.
                </p>
            </div>
            <div className="grid gap-8">
                {posts.map((post) => (
                    <article key={post._id} className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-8 shadow-sm transition hover:-translate-y-1 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                        <Link href={`/${post.categorySlug}/${post.slug}`} className="text-3xl font-semibold leading-tight text-[#222222] hover:text-[#7a1f4d] dark:text-[#ede9e2]">
                            {post.title}
                        </Link>
                        <div className="mt-4 flex flex-wrap gap-3 text-[0.75rem] uppercase tracking-[0.12em] text-[#5e5a55] dark:text-[#dcd6cf]">
                            <span>{format(new Date(post.date), 'dd MMM yyyy')}</span>
                            <span>{post.readingTime} min</span>
                        </div>
                        <p className="mt-4 max-w-[66ch] text-sm leading-7 text-[#5e5a55] dark:text-[#dcd6cf]">{post.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
