import {type Message, useNotificationStore} from "~/stores/notification";

export const useNotify = (message: Message) => {
    const notificationStore = useNotificationStore()
    notificationStore.notify(message)
}