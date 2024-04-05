import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const user = useUserStore()
    const nuxtApp = useNuxtApp()
    const localePath = useLocalePath()

    const token = useCookie('token', {
        path: '/',
        sameSite: 'strict',
        secure: config.public.apiBase.startsWith('https://'),
        maxAge: 60 * 60 * 24 * 7
    })
    const logged = computed(() => !!token.value)

    const {refresh: logout} = useFetch<any>('logout', {
        method: 'POST',
        immediate: false,
        onResponse({response}) {
            if (response.status === 200) {
                setToken('')
                user.setUser({})

                return nuxtApp.runWithContext(() => {
                    return navigateTo(localePath('/'))
                })
            }
        }
    })

    const setToken = (value: string) => {
        token.value = value
    }

    const getToken = () => {
        return token.value
    }

    return {logged, logout, setToken, getToken}
})