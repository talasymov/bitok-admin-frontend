<script setup lang="ts">
import {USER_BONUSES_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()
const localePath = useLocalePath()

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
    <v-data-table :headers="headers" :items="items">
      <template #item.name="{item}">
        {{ item.bonus?.name }}
        <NuxtLink v-if="item.bonus" :to="localePath(`/bonuses/${item.bonus?.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table>
  </div>
</template>