<script setup lang="ts">
import {NOTIFICATIONS_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const headers = NOTIFICATIONS_HEADERS.map((header) => ({
  title: t(header.title),
  value: header.value,
}))
</script>

<template>
  <div>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.data="{ item }">
        <strong class="d-block w-100">{{ item.data.name }}</strong>
        <span>{{ item.data.message }}</span>
      </template>
    </v-data-table>
  </div>
</template>