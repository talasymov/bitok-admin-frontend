<script setup lang="ts">
const {store} = defineProps({
  store: usePromotionEditStore,
  selectStore: useSelectStore,
});

import {image_rules, required} from "~/utils/Rules";
import {usePromotionEditStore} from "~/stores/promotions/edit";
import {useSelectStore} from "~/stores/select";

const {t, locale} = useI18n()

const bonuses = ref([]);
const games = ref([]);
const headers = ref([
  {title: t('bonus'), align: 'start', sortable: false, key: 'bonus'},
  {title: t('position_from'), align: 'start', sortable: false, key: 'position_from', width: '200px'},
  {title: t('position_to'), align: 'start', sortable: false, key: 'position_to', width: '200px'},
]);
const addBonus = () => {
  if (!store.state.bonuses) store.state.bonuses = []

  store.state.bonuses.push({
    id: null,
    position_from: 0,
    position_to: 0,
  })
}

onMounted(async () => {
  await $fetch('admin/bonuses', {
    onResponse({response}) {
      if (response?.status === 200) {
        bonuses.value = response._data;
      }
    }
  });

  await $fetch(`admin/games`, {
    params: {
      page: 1,
      per_page: 10000,
    },
    onResponse({response}) {
      if (response?.status === 200) {
        games.value = response._data.data;
      }
    }
  });
});
</script>

<template>
  <v-card class="mx-auto px-6 py-8" width="1024">
    <v-form>
      <FormMultiLangTextField
          v-model="store.state.name"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('name')"
          clearable
      />

      <v-autocomplete
          v-model="store.state.status"
          :label="$t('status')"
          :items="selectStore.tournament_statuses"
          item-value="id"
          item-title="name"
          variant="outlined"
      />

      <v-text-field
          v-model="store.state.amount"
          :label="$t('amount')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="store.state.min_bet"
          :label="$t('min_bet')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="store.state.max_bet"
          :label="$t('max_bet')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <div class="d-flex ga-2">
        <v-file-input
            v-model="store.image"
            :rules="image_rules"
            accept="image/png, image/jpeg, image/bmp"
            :label="$t('image')"
            variant="outlined"
            :prepend-icon="null"
            append-inner-icon="mdi-camera"
        ></v-file-input>
        <NuxtLink :to="store.state.image" external target="_blank">
          <v-img
              v-if="store.state.image"
              :src="store.state.image"
              rounded
              cover
              width="56"
              height="56"
          />
        </NuxtLink>
      </div>

      <FormDatetimePicker v-model="store.state.start_at" :label="$t('start_at')"/>

      <FormDatetimePicker v-model="store.state.finish_at" :label="$t('finish_at')"/>

      <FormMultiLangTextEdtitor
          v-model="store.state.content"
      />

      <v-toolbar class="my-4" flat>
        <v-toolbar-title>
          {{ $t('bonuses') }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="addBonus" icon="mdi-plus"/>
      </v-toolbar>

      <v-data-table
          class="mb-4"
          v-if="store.state?.bonuses?.length > 0"
          :headers="headers"
          :items="store.state.bonuses"
          :items-per-page="-1"
          :sort-by="[{key: 'bonus_chance', order: 'desc'}]"
      >
        <template v-slot:item.bonus="{ item }">
          <v-autocomplete
              v-model="item.id"
              :label="$t('bonus')"
              :items="bonuses"
              item-value="id"
              item-title="name"
              variant="outlined"
              clearable
              hide-details
              density="compact"
          ></v-autocomplete>
        </template>

        <template v-slot:item.position_from="{ item }">
          <v-text-field
              v-model="item.position_from"
              :label="$t('position_from')"
              variant="outlined"
              type="number"
              min="0"
              hide-details
              density="compact"
          />
        </template>

        <template v-slot:item.position_to="{ item }">
          <v-text-field
              v-model="item.position_to"
              :label="$t('position_to')"
              variant="outlined"
              type="number"
              min="0"
              hide-details
              density="compact"
          />
        </template>

        <template #bottom></template>
      </v-data-table>

      <v-autocomplete
          v-model="store.state.games"
          :label="t('games')"
          :items="games"
          item-value="id"
          item-title="name"
          variant="outlined"
          multiple
          chips
          clearable
          closable-chips
          return-object
      ></v-autocomplete>

      <br>
      <div class="d-flex justify-space-between">
        <slot/>
      </div>
    </v-form>
  </v-card>
</template>