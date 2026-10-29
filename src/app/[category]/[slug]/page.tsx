import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { getAllPosts, getPostBySlug, categoryLabels, getRelatedPosts } from '@/lib/content';
import { PostContent } from '@/components/PostContent';
import { ReadingProgress } from '@/components/ReadingProgress';
import { TagPill } from '@/components/TagPill';

interface ArticlePageProps {
    params: { category: string; slug: string };
}

const sources = [
    {
        title: 'Reportagem',
        links: [
            {
                label: 'Posts em redes sociais incentivam demissões de eleitores do Lula — Radioagência Nacional',
                href: 'https://agenciabrasil.ebc.com.br/radioagencia-nacional/politica/audio/2026-10/posts-em-redes-sociais-incentivam-demissoes-de-eleitores-do-lula',
            },
        ],
    },
    {
        title: 'História e contexto',
        links: [
            { label: 'The Weimar Republic — Holocaust Encyclopedia (EN)', href: 'https://encyclopedia.ushmm.org/content/en/article/the-weimar-republic' },
            { label: 'A República de Weimar — Holocaust Encyclopedia (PT)', href: 'https://encyclopedia.ushmm.org/content/pt-br/article/the-weimar-republic' },
            { label: 'A ascensão nazista ao poder — Holocaust Encyclopedia', href: 'https://encyclopedia.ushmm.org/content/pt-br/article/the-nazi-rise-to-power' },
            { label: 'Holocaust Encyclopedia — United States Holocaust Memorial Museum', href: 'https://encyclopedia.ushmm.org/' },
            { label: 'Bundeszentrale für politische Bildung (bpb)', href: 'https://www.bpb.de/' },
            { label: 'Deutsches Historisches Museum (DHM)', href: 'https://www.dhm.de/' },
        ],
    },
    {
        title: 'Instituições e democracia no Brasil',
        links: [
            { label: 'Supremo Tribunal Federal (STF)', href: 'https://portal.stf.jus.br/' },
            { label: 'Constituição Federal — Presidência da República', href: 'https://www4.planalto.gov.br/legislacao/legis-federal/constituicao' },
            { label: 'Tribunal Superior Eleitoral (TSE)', href: 'https://www.tse.jus.br/' },
            { label: 'Eleições 2026 — TSE', href: 'https://www.tse.jus.br/eleicoes/cde-2026' },
        ],
    },
    {
        title: 'Pesquisa e indicadores',
        links: [
            { label: 'Fundação Getulio Vargas (FGV)', href: 'https://portal.fgv.br/' },
            { label: 'CPDOC — FGV', href: 'https://cpdoc.fgv.br/' },
            { label: 'Instituto de Pesquisa Econômica Aplicada (IPEA)', href: 'https://www.ipea.gov.br/' },
            { label: 'Brazil — Freedom House', href: 'https://freedomhouse.org/country/brazil' },
            { label: 'Freedom House', href: 'https://freedomhouse.org/' },
            { label: 'V-Dem Institute', href: 'https://www.v-dem.net/' },
            { label: 'Our World in Data', href: 'https://ourworldindata.org/' },
            { label: 'SciELO Brasil', href: 'https://www.scielo.br/' },
        ],
    },
] as const;

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
    const highlightKeyPhrases = post.slug === 'quando-a-democracia-se-deteriora';

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

            <PostContent code={post.body.code} highlightKeyPhrases={highlightKeyPhrases} />

            {highlightKeyPhrases ? (
                <section aria-labelledby="sources-heading" className="mt-12 rounded-[22px] border border-[rgba(34,34,34,0.12)] bg-[#faf8f4] p-6 text-[#222222] shadow-sm sm:p-8">
                    <h2 id="sources-heading" className="text-2xl font-semibold text-[#222222]">Fontes e leituras</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        {sources.map((group) => (
                            <div key={group.title}>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#7a1f4d]">{group.title}</h3>
                                <ul className="mt-3 space-y-2">
                                    {group.links.map((source) => (
                                        <li key={source.href}>
                                            <a
                                                href={source.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm leading-6 text-[#222222] underline decoration-[#B88917] underline-offset-4 transition hover:text-[#7a1f4d]"
                                            >
                                                {source.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

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
