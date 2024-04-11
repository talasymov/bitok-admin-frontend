<script setup lang="ts">
import {TRANSACTIONS_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const headers = TRANSACTIONS_HEADERS.map((header) => ({
  title: t(header.title),
  value: header.value,
}))
</script>

<template>
  <div>
    <v-data-table :headers="headers" :items="items">
      <template #item.creator="{item}">
        {{ item.creator.email }}
      </template>
    </v-data-table>
  </div>
</template>