import Link from 'next/link';

export function TagPill({ tag }: { tag: string }) {
    const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
    return (
        <Link
            href={`/tag/${encodeURIComponent(tagSlug)}`}
            className="inline-flex items-center rounded-full border border-[#B88917]/20 bg-[#B88917]/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8B5C12] transition hover:border-[#B88917] hover:bg-[#B88917]/15"
        >
            {tag}
        </Link>
    );
}
