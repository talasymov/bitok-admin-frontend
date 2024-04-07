<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});
import Notification from "~/components/Common/Notification.vue";
import {ref} from "vue";
import type {Message} from "~/stores/notification";
import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";

const {t} = useI18n()
const route = useRoute()
const errors = ref(null)
const bonuses = ref([])
const state = ref({})
const headers = ref([
  {title: t('bonus'), align: 'start', sortable: false, key: 'bonus'},
  {title: t('chance'), align: 'start', sortable: false, key: 'chance', width: '200px'},
]);

const totalPercent = computed(() => {
  return state.value?.bonuses?.reduce((acc, item) => acc + Number(String(item.bonus_chance)), 0)
})

const update = async () => {
  $fetch(`admin/gift-boxes/${route.params.id}`, {
    method: "PUT",
    body: state.value,
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

onMounted(async () => {
  await $fetch(`admin/gift-boxes/${route.params.id}`, {
    onResponse({response}) {
      if (response?.status === 200) {
        state.value = response._data
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
  <v-sheet class="pa-12 w-100 h-100 d-flex flex-column align-center justify-center" rounded>
    <v-card class="mx-auto px-6 py-8 w-100">
      <Notification/>

      <multi-lang-text-field
          v-model="state.name"
          label="name"
          clearable
      />

      <v-data-table
          v-if="state?.bonuses?.length > 0"
          :headers="headers"
          :items="state.bonuses"
          :items-per-page="-1"
          :sort-by="[{key: 'bonus_chance', order: 'desc'}]"
      >
        <template v-slot:item.bonus="{ item }">
          <v-autocomplete
              v-model="item.id"
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
        </template>

        <template v-slot:item.chance="{ item }">
          <v-text-field
              v-model="item.bonus_chance"
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
            variant="outlined"
        >
          {{ t('update') }}
        </v-btn>
      </div>
    </v-card>
  </v-sheet>
</template>

<style scoped>

</style>