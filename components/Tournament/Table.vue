<script setup lang="ts">
import {TOURNAMENTS_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const headers = TOURNAMENTS_HEADERS.map((header) => ({
  title: t(header.title),
  value: header.value,
}))
</script>

<template>
  <div>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.tournament="{ item }">
        <strong class="d-block w-100">{{ item.tournament.name }}</strong>
      </template>
    </v-data-table>
  </div>
</template>