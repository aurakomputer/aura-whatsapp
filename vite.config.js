import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: fileURLToPath(new URL('./src/client', import.meta.url)) }],
    },
    plugins: [
        VueRouter({
            routesFolder: [
                {
                    src: 'src/client/pages',
                },
            ],
        }),
        Layouts({
            layoutsDirs: 'src/client/mylayouts',
            pagesDirs: 'src/client/pages',
            // defaultLayout: 'myDefault',
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-i18n',
                '@vueuse/head',
                '@vueuse/core',
                VueRouterAutoImports,
                {
                    // add any other imports you were relying on
                    'vue-router/auto': ['useLink'],
                },
            ],
            // dts: 'src/auto-imports.d.ts',
            dirs: ['src/composables', 'src/stores'],
            vueTemplate: true,
        }),
        Components({
            dirs: ['src/client/components'],
        }),
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
