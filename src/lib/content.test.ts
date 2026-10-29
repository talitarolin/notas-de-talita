import { describe, test, expect, vi } from 'vitest';
import { normalizeTag, getPostsByTag } from './content';

vi.mock('contentlayer/generated', () => ({
    allPosts: [
        {
            _id: 'post-1',
            title: 'Aprendendo IA com Next.js',
            tags: ['Inteligência Artificial', 'Next.js'],
            categorySlug: 'estudos',
            slug: 'aprendendo-ia-com-nextjs',
            date: '2026-09-03',
        }
    ]
}));

describe('Fluxo de Normalização de Tags', () => {
    test('deve normalizar textos com acentos, maiúsculas e espaços para o padrão de URL', () => {
        expect(normalizeTag('Inteligência Artificial')).toBe('inteligencia-artificial');
        expect(normalizeTag('Next.js e React!')).toBe('next-js-e-react');
    });

    test('deve encontrar um post mesmo pesquisando pelo slug normalizado (sem acentos)', () => {
        // Simula o usuário acessando a URL /tag/inteligencia-artificial
        const postsEncontrados = getPostsByTag('inteligencia-artificial');

        expect(postsEncontrados.length).toBe(1);
        expect(postsEncontrados[0].title).toBe('Aprendendo IA com Next.js');
    });
});
