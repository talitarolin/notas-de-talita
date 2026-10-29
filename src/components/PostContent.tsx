'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import { useLightbox } from './LightboxProvider';

function MdxImage({ src, alt }: ComponentPropsWithoutRef<'img'>) {
    const { open } = useLightbox();
    if (!src) return null;
    return (
        <button
            type="button"
            className="article-image mb-8 block w-full overflow-hidden rounded-[14px]"
            onClick={() => open([src])}
        >
            <Image src={src} alt={alt ?? ''} width={1200} height={720} className="h-auto w-full" />
        </button>
    );
}

const components = {
    img: MdxImage,
    blockquote: ({ children }: ComponentPropsWithoutRef<'blockquote'>) => (
        <blockquote className="my-10 border-l-4 border-[#B88917] bg-surface-muted p-6 italic text-[#222222] dark:border-[#D4A832] dark:bg-[#201d19] dark:text-[#ede9e2]">
            {children}
        </blockquote>
    ),
    p: ({ children }: ComponentPropsWithoutRef<'p'>) => <p className="mb-6 text-lg leading-8 text-[#5e5a55] dark:text-[#dcd6cf]">{children}</p>,
    h2: ({ children }: ComponentPropsWithoutRef<'h2'>) => <h2 className="mt-12 text-3xl font-semibold text-[#222222] dark:text-[#ede9e2]">{children}</h2>,
    h3: ({ children }: ComponentPropsWithoutRef<'h3'>) => <h3 className="mt-10 text-2xl font-semibold text-[#222222] dark:text-[#ede9e2]">{children}</h3>,
    ul: ({ children }: ComponentPropsWithoutRef<'ul'>) => <ul className="mt-6 list-disc pl-6 text-[#5e5a55] dark:text-[#dcd6cf]">{children}</ul>,
    ol: ({ children }: ComponentPropsWithoutRef<'ol'>) => <ol className="mt-6 list-decimal pl-6 text-[#5e5a55] dark:text-[#dcd6cf]">{children}</ol>,
    li: ({ children }: ComponentPropsWithoutRef<'li'>) => <li className="mb-3 text-[#5e5a55] dark:text-[#dcd6cf]">{children}</li>,
    code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => (
        <code
            className={`${className ? `${className} ` : ''}rounded-[10px] bg-[#F5F2EC] px-2 py-1 text-sm text-[#7A1F4D] dark:bg-[#2a1f16] dark:text-[#e1c9d2]`}
            {...props}
        >
            {children}
        </code>
    ),
    pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => (
        <pre className="my-8 overflow-x-auto rounded-[16px] border border-[rgba(34,34,34,0.1)] bg-[#f8f4ee] p-6 text-sm leading-7 dark:border-[rgba(237,233,226,0.09)] dark:bg-[#1d1915]">
            {children}
        </pre>
    ),
} satisfies MDXComponents;

export function PostContent({ code, highlightKeyPhrases = false }: { code: string; highlightKeyPhrases?: boolean }) {
    const Component = useMDXComponent(code);
    const postComponents = highlightKeyPhrases
        ? {
            ...components,
            p: ({ children }: ComponentPropsWithoutRef<'p'>) => <p className="mb-6 text-lg leading-8 text-black">{children}</p>,
            strong: ({ children }: ComponentPropsWithoutRef<'strong'>) => <strong className="font-bold text-[#7a1f4d] dark:text-[#D4A832]">{children}</strong>,
        } satisfies MDXComponents
        : components;

    return (
        <section className={`article-body prose prose-xl prose-slate dark:prose-invert prose-headings:text-[#222222] prose-a:text-[#7a1f4d] prose-blockquote:border-[#B88917] prose-blockquote:bg-surface-muted prose-code:bg-[#F5F2EC] prose-pre:bg-[#f8f4ee] dark:prose-headings:text-[#ede9e2] dark:prose-blockquote:bg-[#201d19] dark:prose-code:bg-[#2a1f16]${highlightKeyPhrases ? ' dark:rounded-[22px] dark:bg-[#faf8f4] dark:p-8' : ''}`}>
            <Component components={postComponents} />
        </section>
    );
}
