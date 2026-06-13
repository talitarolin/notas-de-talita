'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { allPosts } from 'contentlayer/generated';

const formatTagSlug = (tag: string) => tag.toLowerCase().replace(/[^a-z0-9]+/gi, '-');

export function SearchPanel() {
    const [term, setTerm] = useState('');

    const results = useMemo(() => {
        const query = term.trim().toLowerCase();
        if (!query) return [];
        return allPosts
            .map((post) => ({
                post,
                score: [post.title, post.description, post.category, post.tags.join(' '), post.body.raw ?? '']
                    .join(' ')
                    .toLowerCase()
                    .includes(query),
            }))
            .filter((item) => item.score)
            .map((item) => item.post);
    }, [term]);

    return (
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-8 lg:px-8">
            <div className="mb-8 rounded-[26px] border border-[rgba(34,34,34,0.1)] bg-surface-muted px-6 py-6 shadow-sm dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                <h1 className="text-3xl font-semibold text-[#222222] dark:text-[#ede9e2]">Buscar artigos</h1>
                <p className="mt-2 max-w-[56ch] text-sm leading-7 text-[#5e5a55] dark:text-[#dcd6cf]">
                    Pesquise por título, categoria, tags, descrição ou conteúdo. Os resultados aparecem enquanto você digita.
                </p>
                <div className="mt-6">
                    <label htmlFor="site-search" className="sr-only">
                        Buscar artigos
                    </label>
                    <input
                        id="site-search"
                        type="search"
                        value={term}
                        onChange={(event) => setTerm(event.target.value)}
                        className="w-full rounded-full border border-[rgba(34,34,34,0.1)] bg-white px-5 py-4 text-base text-[#222222] outline-none transition focus:border-[#7a1f4d] focus:ring-2 focus:ring-[#7a1f4d]/20 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19] dark:text-[#ede9e2]"
                        placeholder="Buscar por palavra-chave..."
                    />
                </div>
            </div>

            <div className="grid gap-6">
                {term ? (
                    results.length > 0 ? (
                        results.map((post) => (
                            <article key={post._id} className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-6 shadow-sm transition hover:-translate-y-1 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                                <Link href={`/categoria/${post.categorySlug}/${post.slug}`} className="text-2xl font-semibold leading-tight text-[#222222] hover:text-[#7a1f4d] dark:text-[#ede9e2]">
                                    {post.title}
                                </Link>
                                <p className="mt-3 text-sm leading-7 text-[#5e5a55] dark:text-[#dcd6cf]">{post.description}</p>
                                <div className="mt-5 flex flex-wrap gap-3 text-[0.72rem] uppercase tracking-[0.12em] text-[#7a1f4d]">
                                    <span>{post.category}</span>
                                    {post.tags.map((tag) => (
                                        <Link key={tag} href={`/tag/${formatTagSlug(tag)}`} className="hover:underline">
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-6 text-[#5e5a55] dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19] dark:text-[#dcd6cf]">
                            Nenhum artigo encontrado para &quot;{term}&quot;.
                        </div>
                    )
                ) : (
                    <div className="rounded-[22px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-6 text-[#5e5a55] dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19] dark:text-[#dcd6cf]">
                        Comece a digitar para encontrar artigos por título, categoria, tags, descrição ou conteúdo.
                    </div>
                )}
            </div>
        </section>
    );
}
