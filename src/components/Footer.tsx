'use client';

export function Footer() {
    return (
        <footer className="border-t border-[rgba(34,34,34,0.1)] bg-surface py-8 text-[#5e5a55] dark:bg-[#201d19] dark:text-[#8e8880]">
            <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div className="font-medium text-[#222222] dark:text-[#ede9e2]">Talita Rolin</div>
                <ul className="flex flex-wrap gap-4 text-sm">
                    <li>
                        <a href="#" className="hover:text-[#7a1f4d]">
                            RSS
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-[#7a1f4d]">
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-[#7a1f4d]">
                            GitHub
                        </a>
                    </li>
                </ul>
                <div className="text-sm">© 2026</div>
            </div>
        </footer>
    );
}
