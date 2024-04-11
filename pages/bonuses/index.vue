<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {ref} from 'vue';

const {t} = useI18n()
const localePath = useLocalePath()
const itemsPerPage = ref(5);
const headers = ref([
  {title: t('name'), align: 'start', sortable: false, key: 'name'},
  {title: t('fs'), align: 'center', sortable: false, key: 'free_spins'},
  {title: t('fs_bet'), align: 'center', sortable: false, key: 'free_spins_bet'},
  {title: t('image'), key: 'image', align: 'center'},
  {title: t('type'), key: 'no_deposit', align: 'center'},
]);
const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const loadItems = ({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) => {
  loading.value = true;

  $fetch('admin/bonuses')
      .then((data) => {
        serverItems.value = data
        loading.value = false
      })
};

useBreadcrumbsStore().breadcrumbs = [
  {
    title: t('dashboard'),
    disabled: false,
    href: localePath('/'),
  },
  {
    title: t('bonuses'),
    disabled: true,
  },
]
</script>


<template>
  <v-card
      class="mx-auto"
  >
    <v-toolbar flat>
      <v-toolbar-title>
        {{ t('bonuses') }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :to="localePath('/bonuses/create')" icon="mdi-plus"/>

      <v-btn icon="mdi-dots-vertical"/>
    </v-toolbar>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="name"
        @update:options="loadItems"
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
