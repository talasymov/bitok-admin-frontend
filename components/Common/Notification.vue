<script setup lang="ts">
import {useNotificationStore} from "~/stores/notification";
const notificationStore = useNotificationStore()
</script>

<template>
  <div>
    <div class="notifications-wrapper">
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
  </div>
</template>

<style scoped>
.notifications-wrapper {
  position: fixed;
  top: 85px;
  right: 20px;
  z-index: 99999;
}
</style>