import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ]
    }
}

export default withContentlayer(nextConfig)
