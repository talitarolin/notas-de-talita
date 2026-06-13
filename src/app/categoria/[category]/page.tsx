import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { categoryLabels, getPostsByCategory, type Category } from '@/lib/content';
import { format } from 'date-fns';

interface CategoryPageProps {
    params: { category: Category };
}

export default function CategoryPage({ params }: CategoryPageProps) {
    const categoryLabel = categoryLabels.get(params.category);
    const posts = getPostsByCategory(params.category);
    if (!categoryLabel || posts.length === 0) {
        notFound();
    }

    return (
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-8 lg:px-8">
            <div className="mb-12 space-y-4">
                <p className="section-label inline-flex items-center gap-4 text-sm uppercase tracking-[0.14em] text-[#B88917]">
                    <span className="h-px w-16 bg-[rgba(34,34,34,0.1)]"></span>
                    Categoria
                    <span className="h-px flex-1 bg-[rgba(34,34,34,0.1)]"></span>
                </p>
                <h1 className="text-5xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">{categoryLabel}</h1>
                <p className="max-w-[60ch] text-lg leading-8 text-[#5e5a55] dark:text-[#dcd6cf]">
                    Lista de artigos recentes da categoria {categoryLabel}. Navegue pelos textos e descubra reflexões, estudos e registros fotográficos.
                </p>
            </div>
            <div className="grid gap-8">
                {posts.map((post) => (
                    <article key={post._id} className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-8 shadow-sm transition hover:-translate-y-1 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                        <Link href={`/categoria/${post.categorySlug}/${post.slug}`} className="text-3xl font-semibold leading-tight text-[#222222] hover:text-[#7a1f4d] dark:text-[#ede9e2]">
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
