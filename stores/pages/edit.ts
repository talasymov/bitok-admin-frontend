import {defineStore} from 'pinia'
import type {Message} from "~/stores/notification";

export const usePageEditStore = defineStore('page_edit', () => {
    const loading = ref(false);
    const errors = ref(null);
    const state = ref({});

    async function fetchModel(id: string) {
        loading.value = true;
        await $fetch(`admin/pages/${id}`, {
            async onResponse({response}) {
                state.value = response._data.data;
                loading.value = false;
            },
        });
    }

    async function updateModel(id: number) {
        loading.value = true
        await $fetch(`admin/pages/${id}`, {
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


    async function deleteModel(id: number) {

    }

    return {
        state,
        loading,
        errors,
        fetchModel,
        updateModel,
        deleteModel,
    }
})