import { fileURLToPath, URL } from 'url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import Components from 'unplugin-vue-components/vite'
import I18n from '@intlify/vite-plugin-vue-i18n'

const r = (...args: string[]) => resolve(__dirname, ...args)

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: [r('src/components')],
    }),
    WindiCSS(),
    I18n({
      include: [resolve(__dirname, 'src/locales/**')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
