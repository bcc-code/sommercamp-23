import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

export default defineConfig({
    darkMode: 'class',
    attributify: true,
    plugins: [typography],
    theme: {
        extend: {
            height: {
                screenDesktop: 'calc(100vh - 56px)'
            },
            colors: {
                'dark-mint': '#536C58',
                'beige': '#FEECD0',
                'yellow': '#F5D47C',
                'taupe': '#5E5144',
                'dark-brown': '#422E1C',
                'dark-yellow': '#B89033',
                'orange': '#F09C44'
            }
        }
    }
})
