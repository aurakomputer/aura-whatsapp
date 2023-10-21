import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: fileURLToPath(new URL('./src/client', import.meta.url)) }],
    },
    plugins: [
        vue({
            template: { transformAssetUrls },
        }),
        quasar({
            autoImportComponentCase: 'combined',
            sassVariables: 'src/client/styles/quasar-variables.sass',
        }),
    ],
    server: {
        watch: {
            usePolling: true,
        },
    },
})
