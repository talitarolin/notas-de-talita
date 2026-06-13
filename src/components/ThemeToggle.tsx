'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = storedTheme === 'dark' || (!storedTheme && prefersDark) ? 'dark' : 'light';
        setTheme(initialTheme);
        document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        window.localStorage.setItem('theme', nextTheme);
        document.documentElement.classList.toggle('dark', nextTheme === 'dark');
        setTheme(nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar modo escuro"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(34,34,34,0.12)] bg-white text-[#5e5a55] shadow-sm transition hover:bg-[#f5f2ec] hover:text-[#7a1f4d] dark:border-[rgba(237,233,226,0.15)] dark:bg-[#201d19] dark:text-[#ede9e2]"
        >
            {theme === 'dark' ? '☀' : '◑'}
        </button>
    );
}
