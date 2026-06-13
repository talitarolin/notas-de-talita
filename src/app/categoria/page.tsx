import Link from 'next/link';
import { categories } from '@/lib/content';

export default function CategoriesRootPage() {
    return (
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-8 lg:px-8">
            <div className="mb-12 space-y-4">
                <p className="section-label inline-flex items-center gap-4 text-sm uppercase tracking-[0.14em] text-[#B88917]">
                    <span className="h-px w-16 bg-[rgba(34,34,34,0.1)]"></span>
                    Categorias
                    <span className="h-px flex-1 bg-[rgba(34,34,34,0.1)]"></span>
                </p>
                <h1 className="text-5xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">Categorias</h1>
                <p className="max-w-[60ch] text-lg leading-8 text-[#5e5a55] dark:text-[#dcd6cf]">
                    Explore artigos por tema: estudos, reflexões, games, fotografia e leituras.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/categoria/${category.slug}`}
                        className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-8 text-[#222222] transition hover:-translate-y-1 hover:border-[#7a1f4d] dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19] dark:text-[#ede9e2]"
                    >
                        <p className="text-sm uppercase tracking-[0.14em] text-[#B88917]">Categoria</p>
                        <h2 className="mt-4 text-3xl font-semibold">{category.label}</h2>
                    </Link>
                ))}
            </div>
        </section>
    );
}
