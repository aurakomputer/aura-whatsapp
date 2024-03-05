import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: fileURLToPath(new URL('./src/client', import.meta.url)) }],
    },
    plugins: [
        AutoImport({
            imports: [
                'vue',
                'vue-i18n',
                '@vueuse/head',
                '@vueuse/core',
                VueRouterAutoImports,
                {
                    'vue-router/auto': ['useLink'],
                    quasar: ['Dialog', 'Screen'],
                },
            ],
            // dts: 'src/auto-imports.d.ts',
            dirs: ['src/client/composables', 'src/client/stores', 'src/client/helpers', 'src/client/dialogs'],
            vueTemplate: true,
        }),
        VueRouter({
            routesFolder: [
                {
                    src: 'src/client/pages',
                },
            ],
        }),
        Layouts({
            layoutsDirs: 'src/client/layouts',
            pagesDirs: 'src/client/pages',
            defaultLayout: 'default',
        }),

        Components({
            dirs: ['src/client/components', 'src/client/dialogs'],
        }),
        vue({
            template: { transformAssetUrls },
        }),
        quasar({
            autoImportComponentCase: 'combined',
            sassVariables: 'src/client/styles/quasar-variables.sass',
        }),
        VueDevTools(),
    ],
})
