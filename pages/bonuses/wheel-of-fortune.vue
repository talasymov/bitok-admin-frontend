<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import Config from "~/components/Bonuses/Config.vue";
import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";
import {ref} from "vue";
import type {Message} from "~/stores/notification";

const {t} = useI18n()
const localePath = useLocalePath()
const items = ref([])
const errors = ref(null)
const bonuses = ref([])
const headers = ref([
  {title: t('bonus'), align: 'start', sortable: false, key: 'bonus'},
  {title: t('chance'), align: 'start', sortable: false, key: 'chance', width: '200px'},
  {title: t('degree'), align: 'center', sortable: false, key: 'degree', width: '100px'},
]);

const update = async () => {
  $fetch(`admin/bonuses/wheel-of-fortune`, {
    method: "PUT",
    body: {
      items: items.value
    },
    immediate: false,
    watch: false,
    async onResponse({response}) {
      errors.value = null
      if (response?.status === 422) {
        errors.value = response._data?.errors;
      } else if (response.status === 200) {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

const totalPercent = computed(() => {
  return items.value.reduce((acc, item) => acc + Number(String(item.chance)), 0)
})

onMounted(async () => {
  await $fetch(`admin/bonuses/wheel-of-fortune`, {
    onResponse({response}) {
      if (response?.status === 200) {
        items.value = response._data
      }
    }
  })

  await $fetch('admin/bonuses', {
    onResponse({response}) {
      if (response?.status === 200) {
        bonuses.value = response._data
      }
    }
  })
})
</script>

<template>
  <v-card class="mx-auto px-6 py-8 table-no-border" width="800">
    <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="-1"
        :sort-by="[{key: 'chance', order: 'desc'}]"
    >
      <template v-slot:item.bonus="{ item }">
        <div class="d-flex ga-2">
          <NuxtLink :to="localePath(`/bonuses/${item.bonus_id}`)">
            <v-btn
                icon="mdi-pencil"
                variant="flat"
                size="x-small"
            />
          </NuxtLink>
          <v-autocomplete
              v-model="item.bonus_id"
              :label="t('bonus')"
              :items="bonuses"
              item-value="id"
              item-title="name"
              variant="outlined"
              clearable
              return-object
              hide-details
              density="compact"
              :disabled="true"
          ></v-autocomplete>
        </div>
      </template>

      <template v-slot:item.chance="{ item }">
        <v-text-field
            v-model="item.chance"
            :label="t('chance')"
            variant="outlined"
            type="number"
            min="0"
            hide-details
            density="compact"
        />
      </template>

      <template #bottom></template>
    </v-data-table>

    <br>

    <div class="d-flex justify-space-between align-center ga-2">
      <v-spacer/>

      <v-chip label :color="totalPercent !== 100 ? 'red' : 'green'">
        {{ t('total_percent') }}:
        {{ totalPercent }}
      </v-chip>

      <v-btn
          @click="update"
          :disabled="totalPercent !== 100"
          color="success"
          type="submit"
          variant="tonal"
      >
        {{ t('update') }}
      </v-btn>
    </div>
  </v-card>
</template>

<style>
.table-no-border .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td {
  border-bottom: 0 !important;
}
</style>