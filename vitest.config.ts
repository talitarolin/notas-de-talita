import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'contentlayer/generated': path.resolve(__dirname, './src/lib/contentlayer-generated.mock.ts'),
        },
    },
});