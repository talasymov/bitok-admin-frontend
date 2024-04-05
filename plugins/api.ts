import {ofetch} from 'ofetch'
import type {FetchOptions} from 'ofetch';

export default defineNuxtPlugin({
    name: 'app',
    enforce: 'default',
    parallel: true,
    async setup(nuxtApp) {
        const config = useRuntimeConfig()
        const auth = useAuthStore()
        const user = useUserStore()

        function buildHeaders(headers = <HeadersInit>{}): HeadersInit {
            return {
                ...headers,
                ...{
                    'Accept': 'application/json',
                    'X-Localization': nuxtApp.$i18n.locale.value,
                },
                ...(
                    process.server ? {
                        'referer': useRequestURL().toString(),
                        ...useRequestHeaders(['x-forwarded-for', 'user-agent', 'referer']),
                    } : {}
                ),
                ...(
                    auth.logged ? {
                        'Authorization': `Bearer ${auth.getToken()}`
                    } : {}
                )
            };
        }

        function buildBaseURL(baseURL: string): string {
            if (baseURL) return baseURL;

            return process.server ?
                config.apiLocal + config.public.apiPrefix
                : config.public.apiBase + config.public.apiPrefix;
        }

        function buildSecureMethod(options: FetchOptions): void {
            if (process.server) return;

            const method = options.method?.toLowerCase() ?? 'get'

            if (options.body instanceof FormData && method === 'put') {
                options.method = 'POST';
                options.body.append('_method', 'PUT');
            }
        }

        function isRequestWithAuth(baseURL: string, path: string): boolean {
            return !baseURL
                && !path.startsWith('/_nuxt')
                && !path.startsWith('http://')
                && !path.startsWith('https://');
        }

        globalThis.$fetch = ofetch.create(<FetchOptions>{
            retry: false,

            onRequest({request, options}) {
                if (!isRequestWithAuth(options.baseURL ?? '', request.toString())) return

                options.credentials = 'include';

                options.baseURL = buildBaseURL(options.baseURL ?? '');
                options.headers = buildHeaders(options.headers);

                buildSecureMethod(options);
            },

            onRequestError({error}) {
                console.log(error.message ?? 'Something went wrong')
            },

            onResponseError({response}) {
                if (response.status === 401) {
                    if (auth.logged) {
                        auth.setToken('')
                        user.user = {}
                    }

                    if (process.client) {
                        console.log('Please log in to continue')
                    }
                } else if (response.status !== 422) {
                    if (process.client) {
                        console.log(response._data?.message ?? response.statusText ?? 'Something went wrong')
                    }
                }
            }
        })

        if (auth.logged) {
            await user.fetchUser();
        }
    },
})