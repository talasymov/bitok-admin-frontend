<script setup lang="ts">
import {ref} from 'vue';
definePageMeta({
  middleware: ['auth'],
});

const {t} = useI18n()
const localePath = useLocalePath()
const itemsPerPage = ref(5);
const headers = ref([
  {title: t('name'), align: 'start', sortable: false, key: 'name'},
  {title: t('image'), key: 'image', align: 'center'},
]);
const filter_search = ref('');
const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const loadItems = ({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) => {
  loading.value = true;

  $fetch('admin/games', {
    params: {
      page: page,
      per_page: itemsPerPage,
      sort: sortBy.map((s) => `${s.key}:${s.direction}`).join(','),
      search: filter_search.value,
    },
  })
      .then((data) => {
        serverItems.value = data.data
        totalItems.value = data.meta.total
        loading.value = false
      })
};

const timeout = ref(null)

const applySearch = () => {
  clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    filter_search.value = search.value
  }, 1000)
}
</script>


<template>
  <v-card
      class="mx-auto"
  >
    <v-toolbar flat>
      <v-toolbar-title>
        {{ t('games') }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-responsive max-width="160">
        <v-text-field
            v-model="search"
            :loading="loading"
            @input="applySearch"
            :disabled="loading"
            density="compact"
            :label="t('search')"
            rounded="lg"
            variant="solo-filled"
            flat
            hide-details
            single-line
        ></v-text-field>
      </v-responsive>

      <v-btn :to="localePath('/games/create')" icon="mdi-plus"/>

      <v-btn icon="mdi-dots-vertical"/>
    </v-toolbar>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="filter_search"
        item-value="name"
        @update:options="loadItems"
    >
      <template v-slot:item.name="{ item }">
        {{ item.name }}
        <NuxtLink :to="localePath(`/games/${item.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" width="100" height="100" class="d-inline-block"/>
      </template>
    </v-data-table-server>
  </v-card>
</template>
