<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {ref} from 'vue';

const {t} = useI18n()
const localePath = useLocalePath()
const itemsPerPage = ref(100);
const headers = ref([
  {title: t('name'), align: 'start', key: 'name', sortable: false},
]);
const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const loadItems = ({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) => {
  loading.value = true;

  $fetch('admin/gift-boxes')
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
      <v-toolbar-title>
        {{ t('gift_boxes') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="localePath('/gift-boxes/create')" icon="mdi-plus"/>
<!--      <v-btn icon="mdi-dots-vertical"/>-->
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
        <NuxtLink :to="localePath(`/gift-boxes/${item.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
      <!--      <template v-slot:item.image="{ item }">-->
      <!--        <v-img :src="item.image"/>-->
      <!--      </template>-->
      <template #bottom></template>
    </v-data-table-server>
  </v-card>
</template>
