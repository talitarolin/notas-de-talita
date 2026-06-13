import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { quotes } from '@/lib/quotes';
import { format } from 'date-fns';
import { TagPill } from '@/components/TagPill';

const featured = allPosts.find((post) => post.featured) ?? allPosts[0];
const quote = quotes[Math.floor(Math.random() * quotes.length)];

export default function HomePage() {
    return (
        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-8 lg:px-8">
            <a href="#main-content" className="skip-link">
                Ir para o conteúdo
            </a>
            <div id="main-content" className="space-y-16">
                <section className="quote-section rounded-[30px] border border-[rgba(34,34,34,0.1)] bg-surface-muted p-10 shadow-soft dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                    <span className="quote-mark block text-[5rem] leading-[0.7] text-[#B88917]">&quot;</span>
                    <p className="quote-text max-w-[46ch] text-4xl font-[300] italic leading-[1.2] text-[#222222] dark:text-[#ede9e2]">
                        {quote.text}
                    </p>
                    <footer className="mt-6 text-sm uppercase tracking-[0.14em] text-[#5e5a55] dark:text-[#8e8880]">
                        — {quote.author}
                    </footer>
                </section>

                <section className="bio-section grid gap-8 lg:grid-cols-[1fr_auto]">
                    <div className="space-y-4">
                        <p className="max-w-[68ch] text-lg leading-9 text-[#5e5a55] dark:text-[#dcd6cf]">
                            Olá. Sou Talita — estudante de engenharia, aprendiz constante, observadora das pequenas coisas que o cotidiano tenta esconder. Este espaço nasceu da vontade de transformar pensamentos em algo durável.
                        </p>
                        <p className="max-w-[68ch] text-lg leading-9 text-[#5e5a55] dark:text-[#dcd6cf]">
                            Aqui você vai encontrar anotações sobre tecnologia, reflexões sobre aprender e existir, fotografias de lugares e momentos, e registros honestos de uma jornada ainda em construção.
                        </p>
                    </div>
                    <div className="bio-portrait h-[100px] w-[100px] overflow-hidden rounded-full border border-[rgba(34,34,34,0.1)] bg-gradient-to-br from-[#d4a8c0] to-[#7A1F4D] dark:border-[rgba(237,233,226,0.09)]">
                        <div className="flex h-full items-center justify-center text-4xl font-title text-white">T</div>
                    </div>
                </section>

                <section className="articles-section">
                    <p className="section-label mb-8 inline-flex items-center gap-4 text-sm uppercase tracking-[0.14em] text-[#B88917]">
                        <span className="h-px flex-1 bg-[rgba(34,34,34,0.1)]"></span>
                        Publicações recentes
                        <span className="h-px flex-1 bg-[rgba(34,34,34,0.1)]"></span>
                    </p>

                    <div className="articles-grid grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                        <article className="featured-article group overflow-hidden rounded-[20px] border border-[rgba(34,34,34,0.1)] bg-surface-muted shadow-sm transition hover:-translate-y-1 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                            <div className="featured-cover min-h-[280px] bg-gradient-to-br from-[#1a1f3a] to-[#3a4a7a]"></div>
                            <div className="featured-body p-10">
                                <span className="featured-label uppercase tracking-[0.14em] text-[#B88917]">✦ Destaque</span>
                                <h2 className="featured-title mt-4 text-4xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">
                                    <Link href={`/categoria/${featured.categorySlug}/${featured.slug}`} className="hover:text-[#7a1f4d]">
                                        {featured.title}
                                    </Link>
                                </h2>
                                <p className="featured-excerpt mt-6 max-w-[45ch] text-base leading-8 text-[#5e5a55] dark:text-[#dcd6cf]">
                                    {featured.description}
                                </p>
                                <Link
                                    href={`/categoria/${featured.categorySlug}/${featured.slug}`}
                                    className="read-link mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-[#7a1f4d]"
                                    aria-label={`Ler: ${featured.title}`}
                                >
                                    Ler artigo →
                                </Link>
                            </div>
                        </article>

                        <div className="grid gap-6">
                            {allPosts.slice(0, 4).map((post) => (
                                <article key={post._id} className="article-card overflow-hidden rounded-[18px] border border-[rgba(34,34,34,0.1)] bg-surface-muted shadow-sm transition hover:-translate-y-1 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#201d19]">
                                    <div className="card-cover h-[160px] bg-gradient-to-br from-[#2a1520] to-[#7A1F4D]"></div>
                                    <div className="card-body p-6">
                                        <div className="card-meta mb-3 flex flex-wrap items-center gap-2 text-[0.75rem] uppercase tracking-[0.12em] text-[#5e5a55] dark:text-[#d4c9c0]">
                                            <span className="card-category text-[#7a1f4d]">{post.category}</span>
                                            <span aria-hidden="true">·</span>
                                            <span>{format(new Date(post.date), 'dd MMM yyyy', { locale: undefined })}</span>
                                            <span aria-hidden="true">·</span>
                                            <span>{post.readingTime} min</span>
                                        </div>
                                        <h3 className="card-title text-2xl font-semibold leading-tight text-[#222222] dark:text-[#ede9e2]">
                                            <Link href={`/categoria/${post.categorySlug}/${post.slug}`} className="hover:text-[#7a1f4d]">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="card-excerpt mt-4 text-sm leading-7 text-[#5e5a55] dark:text-[#dcd6cf]">{post.description}</p>
                                        <div className="card-tags mt-4 flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <TagPill key={tag} tag={tag} />
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}
