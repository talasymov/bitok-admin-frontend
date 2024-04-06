// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    devtools: {enabled: true},

    ssr: false,

    devServer: {
        host: '0.0.0.0'
    },

    build: {
        transpile: ['vuetify', 'pinia-plugin-persistedstate'],
    },

    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/i18n',
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({autoImport: true}))
            })
        },
    ],

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
            apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || '/api',
        },
    },

    pages: true,

    i18n: {
        langDir: 'lang',
        locales: [
            {code: 'ua', file: 'ua.ts'},
            {code: 'en', file: 'en.ts'},
            {code: 'ru', file: 'ru.ts'},
        ],
        lazy: true,
        defaultLocale: 'ua',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            fallbackLocale: 'ua',
        },
    },

    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})
