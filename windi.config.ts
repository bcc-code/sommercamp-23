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
                'mint': '#BDDABB',
                'dark-mint': '#536C58',
                'beige': '#FEECD0',
                'orange': '#F09C44',
                'yellow': '#F5D47C',
                'dark-yellow': '#B89033',
                'taupe': '#5E5144',
                'dark-brown': '#422E1C'
            },
            fontSize: {
                sm: '0.850rem'
            }
        },
        
    }
})
