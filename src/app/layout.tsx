import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LightboxProvider } from '@/components/LightboxProvider';
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-title',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Talita Rolin',
    description: 'Notas, reflexões, fotografias e estudos de Talita Rolin.',
    metadataBase: new URL('https://example.com'),
    openGraph: {
        title: 'Talita Rolin',
        description: 'Notas, reflexões, fotografias e estudos de Talita Rolin.',
        type: 'website',
        url: 'https://example.com',
        siteName: 'Talita Rolin',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Talita Rolin',
        description: 'Notas, reflexões, fotografias e estudos de Talita Rolin.',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

    return (
        <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
            <body>
                <LightboxProvider>
                    <Header />
                    <a href="#main-content" className="skip-link">
                        Ir para o conteúdo
                    </a>
                    <main className="relative overflow-hidden bg-paper bg-[length:160%]">
                        <div id="main-content">{children}</div>
                    </main>
                    <Footer />
                </LightboxProvider>
            </body>
        </html>
    );
}
