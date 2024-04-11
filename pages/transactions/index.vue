<script setup lang="ts">
import {ref} from "vue";
import {MAIN_TRANSACTIONS_HEADERS} from "~/utils/TableHeaders";

const {t} = useI18n()

const headers = MAIN_TRANSACTIONS_HEADERS.map((header) => ({
  title: t(header.title),
  value: header.value,
}))

const localePath = useLocalePath()
const itemsPerPage = ref(5);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const date_from_dialog = ref(null)
const date_to_dialog = ref(null)
const _date_to = new Date()
_date_to.setHours(23, 59, 59, 999)
const date_to = ref(_date_to.toISOString())
const _date_from = new Date()
_date_from.setHours(0, 0, 0, 0)
const date_from = ref(_date_from.toISOString())

const loadItems = ({page, itemsPerPage, sortBy}: { page: number; itemsPerPage: number; sortBy: any[] }) => {
  loading.value = true;

  $fetch('admin/transactions', {
    params: {
      page: page,
      per_page: itemsPerPage,
      sort: sortBy.map((s) => `${s.key}:${s.direction}`).join(','),
      date_from: date_from.value,
      date_to: date_to.value,
    },
  })
      .then((data) => {
        serverItems.value = data.data
        totalItems.value = data.meta.total
        loading.value = false
      })
};

const setDateFrom = (date: string) => {
  date_from.value = date
}

const setDateTo = (date: string) => {
  date_to.value = date
}

const search = () => {
  loadItems({page: 1, itemsPerPage: itemsPerPage.value, sortBy: []})
}

useBreadcrumbsStore().breadcrumbs = [
  {
    title: t('dashboard'),
    disabled: false,
    href: localePath('/'),
  },
  {
    title: t('transactions'),
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
        {{ t('transactions') }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="d-flex ga-2 pr-2">
        <FormDatetimePicker v-model="date_from_dialog" @date-update="setDateFrom" :date="date_from" :label="t('from')"/>
        <FormDatetimePicker v-model="date_to_dialog" @date-update="setDateTo" :date="date_to" :label="t('to')"/>
        <v-btn variant="plain" @click="search">
          {{ t('search') }}
        </v-btn>
      </div>
    </v-toolbar>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        item-value="name"
        @update:options="loadItems"
    >
      <template v-slot:item.user="{ item }">
        {{ item.user.email }}
        <NuxtLink :to="localePath(`/users/${item.user.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table-server>
  </v-card>
</template>