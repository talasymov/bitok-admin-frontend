export const useSelectStore = defineStore('select', () => {
    const faq_categories = ref([])
    const faq_statuses = ref([])

    async function fetchFaqCategories() {
        await $fetch(`admin/faq-categories`, {
            onResponse({response}) {
                if (response?.status === 200) {
                    faq_categories.value = response._data
                }
            }
        })
    }

    async function fetchFaqStatuses() {
        await $fetch(`admin/statuses/faqs`, {
            onResponse({response}) {
                if (response?.status === 200) {
                    faq_statuses.value = response._data
                }
            }
        })
    }

    return {
        faq_categories,
        faq_statuses,
        fetchFaqCategories,
        fetchFaqStatuses,
    }
})