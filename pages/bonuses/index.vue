<script setup lang="ts">
import {useBonusesStore} from "~/stores/bonuses/bonuses";

definePageMeta({
  middleware: ['auth'],
});

const localePath = useLocalePath()
const store = useBonusesStore()
</script>

<template>
  <v-card
      class="mx-auto"
  >
    <v-toolbar flat>
      <v-toolbar-title>
        {{ $t('bonuses') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="localePath('/bonuses/create')" icon="mdi-plus"/>
    </v-toolbar>
    <v-data-table-server
        v-model:items-per-page="store.items_per_page"
        :headers="store.headers"
        :items="store.items"
        :items-length="store.total_items"
        :loading="store.loading"
        :search="store.search"
        item-value="name"
        @update:options="store.fetchTable"
    >
      <template v-slot:item.name="{ item }">
        {{ item.name }}
        <NuxtLink :to="localePath(`/bonuses/${item.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
      <template v-slot:item.no_deposit="{ item }">
        <v-chip
            :color="item.no_deposit === false ? 'green' : 'orange'"
            :text="item.no_deposit === false ? 'Deposit' : 'No Deposit'"
            class="text-uppercase"
            size="small"
            label
        ></v-chip>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" max-width="100" max-height="100"/>
      </template>
    </v-data-table-server>
  </v-card>
</template>
