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
  {title: 'Category', key: 'category', align: 'end'},
  {title: 'Status', key: 'status', align: 'end'},
  {title: 'Actions', key: 'actions', align: 'end'},
]);
const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const loadItems = ({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) => {
  loading.value = true;

  $fetch('admin/faqs')
      .then((data) => {
        serverItems.value = data
        loading.value = false
      })
};
</script>


<template>
  <v-card
      class="mx-auto"
  >
    <v-toolbar flat>
      <v-toolbar-title class="text-grey">
        {{ t('faqs') }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :to="localePath('/faqs/create')" icon="mdi-plus"/>

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
      <template v-slot:item.status="{ item }">
        <div class="text-end">
          <v-chip
              :color="item.status === 'published' ? 'green' : 'orange'"
              :text="item.status"
              class="text-uppercase"
              size="small"
              label
          ></v-chip>
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <NuxtLink :to="localePath(`/faqs/${item.id}`)">
          <v-btn icon="mdi-pencil" size="35"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table-server>
  </v-card>
</template>
