'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { categories } from '@/lib/content';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
    posts: Array<{ slug: string; title: string }>;
}

export function Header() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-[rgba(34,34,34,0.1)] bg-surface/95 backdrop-blur-lg">
            <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-4 lg:px-8">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-xl font-semibold tracking-[0.02em] text-[#222222] hover:opacity-80 dark:text-[#ede9e2]">
                        Talita Rolin
                    </Link>
                </div>

                <nav className="hidden items-center gap-2 text-xs uppercase tracking-[0.08em] text-[#5e5a55] lg:flex">
                    <Link href="/" className={pathname === '/' ? 'text-[#7a1f4d] bg-[#7a1f4d]/10 rounded-full px-3 py-2' : 'px-3 py-2'}>
                        Início
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/categoria/${category.slug}`}
                            className={pathname.startsWith(`/categoria/${category.slug}`) ? 'text-[#7a1f4d] bg-[#7a1f4d]/10 rounded-full px-3 py-2' : 'px-3 py-2'}
                        >
                            {category.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        aria-label="Abrir menu mobile"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(34,34,34,0.12)] bg-white text-[#5e5a55] shadow-sm transition hover:bg-[#f5f2ec] hover:text-[#7a1f4d] dark:border-[rgba(237,233,226,0.15)] dark:bg-[#201d19] dark:text-[#ede9e2]"
                        onClick={() => setMenuOpen(true)}
                    >
                        ☰
                    </button>
                    <ThemeToggle />
                </div>
            </div>
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
