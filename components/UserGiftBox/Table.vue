<script setup lang="ts">
import {USER_GIFT_BOXES_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const headers = USER_GIFT_BOXES_HEADERS.map((header) => ({
  title: t(header.title),
  value: header.value,
}))
</script>

<template>
  <div>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:item.gift_box_name="{ item }">
        <strong>{{ item.gift_box.name }}</strong>
      </template>
    </v-data-table>
  </div>
</template>