import {defineStore} from "pinia";

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const breadcrumbs = ref([])
    return {breadcrumbs}
});