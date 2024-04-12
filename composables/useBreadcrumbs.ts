import {usePageStore} from "~/stores/page";

export const useBreadcrumbs = () => {
    const {t} = useI18n()
    const localePath = useLocalePath()
    const route = useRoute()
    const path = route.fullPath.split('/').filter(x => x.length > 0)

    const items = ref([{
        title: t('dashboard'),
        disabled: false,
        href: localePath('/'),
    }])

    const updateBreadcrumbs = () => {
        let currentPath = ''
        let title = ''

        items.value.splice(1)
        path.forEach((item, index) => {
            currentPath += '/' + item
            if (item === path[path.length - 1]) {
                title = usePageStore().page.title
            }

            if (title === '') {
                title = t(item)
            }

            items.value.push({
                title: title,
                disabled: item === path[path.length - 1],
                href: localePath(currentPath),
            })
        })
    }

    updateBreadcrumbs()

    const pageStore = usePageStore()
    const unwatch = pageStore.$subscribe(() => {
        updateBreadcrumbs()
    })

    const breadcrumbs = computed(() => items.value)

    onUnmounted(() => {
        unwatch()
    })

    return {
        breadcrumbs,
    }
}