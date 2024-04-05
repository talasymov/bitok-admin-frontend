export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return

    const nuxtApp = useNuxtApp()
    const auth = useAuthStore()
    const localePath = useLocalePath()

    if (!auth.logged && to.meta.layout === 'default') {
        return nuxtApp.runWithContext(() => navigateTo(localePath('/login')))
    }
})
