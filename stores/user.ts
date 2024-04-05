import {defineStore} from 'pinia'

export type User = {
    id: number,
    name: string,
    email: string,
    phone: string,
    avatar: string,
    birthday: string,
    gender: string,
    is_document_verified: boolean,
    is_email_verified: boolean,
    is_phone_verified: boolean,
    is_account_verified: boolean,
}

export const useUserStore = defineStore('user', () => {
    const user = ref(<User>{});

    const {refresh: fetchUser} = useFetch<any>('users/info', {
        immediate: false,
        onResponse({response}) {
            if (response.status === 200) {
                setUser(response._data)
            }
        }
    })

    const setUser = <User>(data) => {
        user.value = data
    }

    return {user, fetchUser, setUser}
})