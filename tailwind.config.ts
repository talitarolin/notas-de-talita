import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                title: ['Cormorant Garamond', 'Georgia', 'serif'],
                body: ['Inter', 'system-ui', 'sans-serif']
            },
            colors: {
                surface: '#FAF8F4',
                surfaceMuted: '#F5F2EC',
                text: '#222222',
                textSubtle: '#5E5A55',
                primary: '#7A1F4D',
                secondary: '#B88917',
                border: 'rgba(34,34,34,0.10)'
            },
            boxShadow: {
                soft: '0 16px 48px rgba(34,34,34,0.08)'
            },
            backgroundImage: {
                paper: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 30%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.18), transparent 35%), linear-gradient(180deg, rgba(250,248,244,1), rgba(250,248,244,1))"
            }
        }
    },
    plugins: []
}

export default config
