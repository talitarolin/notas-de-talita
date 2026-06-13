import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: '**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true },
        date: { type: 'date', required: true },
        category: { type: 'string', required: true },
        tags: { type: 'list', of: { type: 'string' }, required: true },
        cover: { type: 'string', required: true },
        readingTime: { type: 'number', required: true },
        featured: { type: 'boolean', default: false }
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (post) => {
                const segments = post._raw.sourceFilePath.split('/');
                const fileName = segments.pop() ?? '';
                return fileName.replace(/\.mdx?$/i, '');
            }
        },
        categorySlug: {
            type: 'string',
            resolve: (post) => {
                const segments = post._raw.sourceFilePath.split('/');
                segments.pop();
                return segments.pop()?.toLowerCase().replace(/\s+/g, '-') ?? post.category.toLowerCase().replace(/\s+/g, '-');
            }
        }
    }
}))

export default makeSource({
    contentDirPath: 'content/posts',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm]
    }
})
