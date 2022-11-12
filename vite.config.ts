import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    jsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  server: {
    proxy: {
      '/person': {
        target: 'http://1.15.186.76/',
        changeOrigin: true
      },
      '/movie': {
        target: 'http://1.15.186.76/',
        changeOrigin: true
      },
      '/user': {
        target: 'http://1.15.186.76/',
        changeOrigin: true
      },
      '/search': {
        target: 'http://1.15.186.76/',
        changeOrigin: true
      }
    }
  }
})
