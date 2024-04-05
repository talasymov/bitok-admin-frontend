export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return

    const nuxtApp = useNuxtApp()
    const auth = useAuthStore()
    const localePath = useLocalePath()

    const excludedPaths = ['/login', '/register', '/forgot-password', '/reset-password']

    if (!auth.logged && !excludedPaths.includes(to.path)){
        return nuxtApp.runWithContext(() => navigateTo(localePath('/login')))
    }
})
