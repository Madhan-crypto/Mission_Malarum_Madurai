/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './public/**/*.html'],
    theme: {
        extend: {
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.25', letterSpacing: '0.02em', fontWeight: '400' }],
                sm: ['0.875rem', { lineHeight: '1.3', letterSpacing: '0.02em', fontWeight: '400' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
                '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
                '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '600' }],
                '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.005em', fontWeight: '700' }],
                '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '0.005em', fontWeight: '700' }],
                '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.002em', fontWeight: '700' }],
                '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '0.001em', fontWeight: '700' }],
                '8xl': ['6rem', { lineHeight: '1.0', letterSpacing: '0', fontWeight: '800' }],
                '9xl': ['8rem', { lineHeight: '1.0', letterSpacing: '0', fontWeight: '800' }],
            },
            fontFamily: {
                heading: "inter",
                paragraph: "inter"
            },
            colors: {
                destructive: '#ef4444',
                'destructive-foreground': '#ffffff',
                'accent-neon-green': '#39FF14',
                'accent-neon-blue': '#00FFFF',
                'card-background-dark': '#2a2a3e',
                'card-background-light': '#ffffff',
                'neutral-gray-dark': '#4a4a5e',
                'neutral-gray-light': '#cccccc',
                background: '#1a1a2e',
                secondary: '#3b82f6',
                foreground: '#e0e0e0',
                'secondary-foreground': '#000000',
                'primary-foreground': '#000000',
                primary: '#10b981'
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
}
