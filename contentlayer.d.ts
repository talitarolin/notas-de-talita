declare module 'contentlayer/generated' {
    export interface Post {
        _id: string;
        _raw: {
            sourceFilePath: string;
            flattenedPath: string;
            fileName: string;
            contentType: string;
        };
        title: string;
        description: string;
        date: string;
        category: string;
        tags: string[];
        cover: string;
        readingTime: number;
        slug: string;
        categorySlug: string;
        featured?: boolean;
        body: {
            raw: string;
            code: string;
        };
    }
    export const allPosts: Post[];
}
