/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#3b5597', // Navy Blue from screenshot
                    dark: '#2e4378',
                },
                accent: {
                    DEFAULT: '#22c55e', // Greenish Teal from screenshot
                    dark: '#16a34a',
                },
                teal: {
                    400: '#2dd4bf',
                    500: '#14b8a6',
                }
            },
            animation: {
                'float': 'float 4s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
