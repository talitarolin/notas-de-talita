import { Metadata } from 'next';
import { categoryLabels, type Category } from '@/lib/content';

interface CategoryLayoutProps {
    children: React.ReactNode;
    params: { category: Category };
}

export function generateMetadata({ params }: CategoryLayoutProps): Metadata {
    const label = categoryLabels.get(params.category) ?? 'Categoria';
    return {
        title: `${label} — Talita Rolin`,
        description: `Artigos da categoria ${label}`,
        openGraph: {
            title: `${label} — Talita Rolin`,
            description: `Artigos da categoria ${label}`,
        },
    };
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
    return <>{children}</>;
}
