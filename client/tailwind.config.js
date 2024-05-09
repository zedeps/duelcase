/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            "colors": {
                'gravekeepers': {
                    '50': '#f9faec',
                    '100': '#f1f4cd',
                    '200': '#e9eb9d',
                    '300': '#e0de64',
                    '400': '#d5cc3a',
                    '500': '#bfb02b',
                    '600': '#aa9224',
                    '700': '#886c20',
                    '800': '#725821',
                    '900': '#624921',
                    '950': '#382710',
                },
            },

            "scale": {
                '0': '0',

                '25': '.25',
                '50': '.5',
                '75': '.75',
                '90': '.9',

                '95': '.95',
                '100': '1',

                '105': '1.05',

                '110': '1.1',
                '125': '1.25',
                '150': '1.5',

                '200': '2',
                '250': '2.5',
                '300': '3'
            }
        },
    },
    plugins: [],
}
