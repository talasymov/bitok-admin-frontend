<script setup lang="ts">
import {useNotificationStore} from "~/stores/notification";

const notificationStore = useNotificationStore()
</script>

<template>
  <div>
    <v-alert
        class="mb-5"
        v-model="notification.show"
        :type="notification.type"
        :title="notification.title"
        variant="tonal"
        closable
        @click:close="notificationStore.deleteMessage(notification.id)"
        v-for="notification in notificationStore.notifications"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>
