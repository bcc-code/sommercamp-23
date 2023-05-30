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
                red: '#DF6050',
                blue: '#418EFB',
                yellow: '#FFAC2D',
                green: '#22C26A',
                purple: '#A5709E',
                comet: '#626674',
                granite: '#31333a'
            },
            fontSize: {
                sm: '0.850rem'
            }
        },
        
    }
})
