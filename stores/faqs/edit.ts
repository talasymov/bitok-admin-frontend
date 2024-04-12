import type {Message} from "~/stores/notification";

interface LocaleStrings {
    [localeCode: string]: string;
}

export const useFaqEditStore = defineStore('faq_edit', () => {
    const {t, locales} = useI18n()
    const localePath = useLocalePath()

    const loading = ref(false)
    const errors = ref(null)
    const state = ref<{
        name: LocaleStrings;
        faq_category_id: string | null;
        status: string | null;
        content: LocaleStrings;
    }>({
        name: {},
        faq_category_id: null,
        status: null,
        content: {},
    })

    locales.value.forEach((locale) => {
        state.value.name[locale.code] = ''
        state.value.content[locale.code] = ''
    })

    async function fetchModel(id: string) {
        loading.value = true
        await $fetch(`admin/faqs/${id}`, {
            async onResponse({response}) {
                state.value = response._data
                loading.value = false
            },
        })
    }

    async function updateModel(id: number) {
        loading.value = true
        await $fetch(`admin/faqs/${id}`, {
            method: "PUT",
            body: state.value,
            async onResponse({response}) {
                errors.value = null
                if (response?.status === 422) {
                    errors.value = response._data?.errors;
                } else if (response.status === 200) {
                    useNotify(<Message>{
                        message: response._data.message,
                        type: response._data.status ? 'success' : 'error'
                    })
                }
                loading.value = false
            },
        })
    }

    async function createModel() {
        loading.value = true
        await $fetch(`admin/faqs`, {
            method: "POST",
            body: state.value,
            async onResponse({response}) {
                errors.value = null
                if (response?.status === 422) {
                    errors.value = response._data?.errors;
                } else if (response.status === 200) {
                    if (response._data.id) {
                        navigateTo(localePath(`/faqs/${response._data.id}`))
                    } else {
                        useNotify(<Message>{
                            message: t('error'),
                            type: 'error'
                        })
                    }
                }
                loading.value = false
            },
        })
    }

    async function deleteModel(id: number) {
        loading.value = true
        await $fetch(`admin/faqs/${id}`, {
            method: "DELETE",
            async onResponse({response}) {
                errors.value = null
                if (response?.status === 422) {
                    errors.value = response._data?.errors;
                } else if (response.status === 200) {
                    navigateTo(localePath('/faqs'))
                }
                loading.value = false
            },
        })
    }

    return {
        fetchModel,
        createModel,
        updateModel,
        deleteModel,
        state,
        loading,
        errors,
    }
})