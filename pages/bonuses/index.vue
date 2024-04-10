<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {ref} from 'vue';

const {t} = useI18n()
const localePath = useLocalePath()
const itemsPerPage = ref(5);
const headers = ref([
  {title: 'Name', align: 'start', sortable: false, key: 'name'},
  {title: 'FS', align: 'center', sortable: false, key: 'free_spins'},
  {title: 'FS, bet', align: 'center', sortable: false, key: 'free_spins_bet'},
  {title: 'Image', key: 'image', align: 'center'},
  {title: 'Type', key: 'no_deposit', align: 'center'},
  {title: 'Actions', key: 'actions', align: 'center'},
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
      <template v-slot:item.no_deposit="{ item }">
        <v-chip
            :color="item.no_deposit === 0 ? 'green' : 'orange'"
            :text="item.no_deposit === 0 ? 'Deposit' : 'No Deposit'"
            class="text-uppercase"
            size="small"
            label
        ></v-chip>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" max-width="100" max-height="100"/>
      </template>
      <template v-slot:item.actions="{ item }">
        <NuxtLink :to="localePath(`/bonuses/${item.id}`)">
          <v-btn icon="mdi-pencil" size="35"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table-server>
  </v-card>
</template>
