<script setup lang="ts">
import {ref} from 'vue';
definePageMeta({
  middleware: ['auth'],
});

const {t} = useI18n()
const localePath = useLocalePath()
const headers = ref([
  {title: t('username'), align: 'start', sortable: false, key: 'name'},
  {title: t('email'), align: 'start', sortable: false, key: 'email'},
  {title: t('phone'), align: 'start', sortable: false, key: 'phone'},
  {title: t('balance'), align: 'center', sortable: false, key: 'default_balance'},
  {title: t('bonuses'), align: 'center', sortable: false, key: 'bonus_balance'},
  {title: t('wager_left'), align: 'center', sortable: false, key: 'wager_left'},
  {title: t('wager_target'), align: 'center', sortable: false, key: 'wager_target'},
]);
const itemsPerPage = ref(5);
const filter_search = ref('');
const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const loadItems = ({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) => {
  loading.value = true;

  $fetch('admin/users', {
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

useBreadcrumbsStore().breadcrumbs = [
  {
    title: t('dashboard'),
    disabled: false,
    href: localePath('/'),
  },
  {
    title: t('users'),
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
        {{ t('users') }}
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
        <NuxtLink :to="localePath(`/users/${item.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
      <template v-slot:item.wager_left="{ item }">
        {{ item.active_bonus?.wager_left || 0 }}
      </template>
      <template v-slot:item.wager_target="{ item }">
        {{ item.active_bonus?.wager_target || 0 }}
      </template>
    </v-data-table-server>
  </v-card>
</template>
