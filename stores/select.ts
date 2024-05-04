export const useSelectStore = defineStore('select', () => {
    const faq_categories = ref([])
    const faq_statuses = ref([])
    const promotion_statuses = ref([])

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

    async function fetchPromotionStatuses() {
        await $fetch(`admin/statuses/promotions`, {
            onResponse({response}) {
                if (response?.status === 200) {
                    promotion_statuses.value = response._data
                }
            }
        })
    }

    return {
        faq_categories,
        faq_statuses,
        promotion_statuses,
        fetchFaqCategories,
        fetchFaqStatuses,
        fetchPromotionStatuses,
    }
})