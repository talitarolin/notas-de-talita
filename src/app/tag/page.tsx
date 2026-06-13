import Link from 'next/link';
import { getAllTags, normalizeTag } from '@/lib/content';

export default function TagIndexPage() {
    const tags = getAllTags();
    return (
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-8 lg:px-8">
            <div className="mb-12 space-y-4">
                <p className="section-label inline-flex items-center gap-4 text-sm uppercase tracking-[0.14em] text-[#B88917]">
                    <span className="h-px w-16 bg-[rgba(34,34,34,0.1)]"></span>
                    Tags
                    <span className="h-px flex-1 bg-[rgba(34,34,34,0.1)]"></span>
                </p>
                <h1 className="text-5xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">Tags</h1>
                <p className="max-w-[60ch] text-lg leading-8 text-[#5e5a55] dark:text-[#dcd6cf]">
                    Escolha um tema e veja artigos relacionados aos assuntos que mais importam.
                </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tags.map((tag) => (
                    <Link
                        key={tag}
                        href={`/tag/${normalizeTag(tag)}`}
                        className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-6 text-[#222222] transition hover:-translate-y-1 hover:border-[#7a1f4d] dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19] dark:text-[#ede9e2]"
                    >
                        <p className="text-sm uppercase tracking-[0.14em] text-[#B88917]">Tag</p>
                        <h2 className="mt-4 text-2xl font-semibold">{tag}</h2>
                    </Link>
                ))}
            </div>
        </section>
    );
}
