import {defineStore} from 'pinia'

export type Notification = {
    id: number,
    type: string,
    title: string,
    message: string,
    time: number,
    show: boolean,
}

export type Message = {
    type: string,
    title: string,
    message: string,
    time: number,
    action?: object,
}

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref(<Notification[]>[])

    const notify = (message: Message) => {
        const id = notifications.value.length

        notifications.value.push({
            id: id,
            type: message.type,
            title: message.title,
            message: message.message,
            time: setTimeout(() => deleteMessage(id), message.time || 5000),
            action: message.action,
            show: true,
        })
    }

    const deleteMessage = (id: number) => {
        notifications.value = notifications.value.filter((item) => item.id !== id)
    }

    return {notifications, notify, deleteMessage}
});