'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/content';

interface MobileMenuProps {
    open: boolean;
    onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        const onClick = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('mousedown', onClick);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('mousedown', onClick);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    useEffect(() => {
        if (open && firstLinkRef.current) {
            firstLinkRef.current.focus();
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
            <div
                ref={menuRef}
                className="absolute right-0 top-0 h-full w-[min(280px,80vw)] bg-surface p-6 shadow-soft dark:bg-[#201d19]"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="mb-6 rounded-full border border-[rgba(34,34,34,0.12)] bg-white px-4 py-2 text-sm font-semibold text-[#222222] transition hover:bg-[#f5f2ec] dark:border-[rgba(237,233,226,0.15)] dark:bg-[#201d19] dark:text-[#ede9e2]"
                >
                    Fechar menu
                </button>
                <nav className="flex flex-col gap-4 text-sm font-medium text-[#5e5a55]">
                    <Link ref={firstLinkRef} href="/" onClick={onClose} className="hover:text-[#7a1f4d]">
                        Início
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/categoria/${category.slug}`}
                            onClick={onClose}
                            className="hover:text-[#7a1f4d]"
                        >
                            {category.label}
                        </Link>
                    ))}
                    <Link href="/tag" onClick={onClose} className="hover:text-[#7a1f4d]">
                        Tags
                    </Link>
                </nav>
            </div>
        </div>
    );
}
