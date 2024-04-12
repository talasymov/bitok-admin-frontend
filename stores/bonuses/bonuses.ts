import {MAIN_BONUSES_HEADERS} from "~/utils/TableHeaders";

export const useBonusesStore = defineStore('bonuses', () => {
    const items = ref([])
    const headers = useTableHeaders(MAIN_BONUSES_HEADERS)
    const items_per_page = ref(5);
    const search = ref('');
    const loading = ref(false);
    const total_items = ref(0);

    async function fetchBonuses({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) {
        loading.value = true
        await $fetch('admin/bonuses', {
            onResponse({response}) {
                items.value = response._data
                loading.value = false
            },
        })
    }

    return {
        fetchBonuses,
        items,
        headers,
        items_per_page,
        search,
        loading,
        total_items,
    }
})