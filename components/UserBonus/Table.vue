<script setup lang="ts">
import {USER_BONUSES_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const headers = USER_BONUSES_HEADERS.map((header) => ({
  title: t(header.title),
  value: header.value,
}))
</script>

<template>
  <div>
    <v-data-table :headers="headers" :items="items"></v-data-table>
  </div>
</template>