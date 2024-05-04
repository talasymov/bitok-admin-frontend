import type {Message} from "~/stores/notification";

export const usePromotionEditStore = defineStore('promotion_edit', () => {
    const loading = ref(false);
    const errors = ref(null);
    const state = ref({});
    const image = ref(null)

    async function fetchModel(id: string) {
        loading.value = true;
        await $fetch(`admin/promotions/${id}`, {
            async onResponse({response}) {
                state.value = response._data.data;
                loading.value = false;
            },
        });
    }

    async function updateModel(id: number) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(state.value));

        if (image.value !== null){
            formData.append("image_file", image.value);
        }
        loading.value = true
        await $fetch(`admin/promotions/${id}`, {
            method: "PUT",
            body: formData,
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
        image,
        loading,
        errors,
        fetchModel,
        updateModel,
        deleteModel,
    }
});