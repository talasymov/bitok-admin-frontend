import {defineStore} from 'pinia'

export const usePageStore = defineStore('page', () => {
    const page = ref({
        title: ''
    })
    return {
        page,
    }
})