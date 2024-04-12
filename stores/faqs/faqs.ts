import {MAIN_FAQS_HEADERS} from "~/utils/TableHeaders";

export const useFaqsStore = defineStore('faqs', () => {
    const items = ref([])
    const headers = useTableHeaders(MAIN_FAQS_HEADERS)
    const items_per_page = ref(5);
    const search = ref('');
    const loading = ref(false);
    const total_items = ref(0);

    async function fetchTable({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) {
        loading.value = true
        await $fetch('admin/faqs', {
            async onResponse({response}) {
                items.value = response._data
                loading.value = false
            },
        })
    }

    return {
        fetchTable,
        items,
        headers,
        items_per_page,
        search,
        loading,
        total_items,
    }
})