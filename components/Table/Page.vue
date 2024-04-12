<script setup lang="ts">
defineProps({
  store: {
    type: Object,
    required: true,
  },
})

const localePath = useLocalePath()
const route = useRoute()
</script>

<template>
  <v-card
      class="mx-auto"
  >
    <v-toolbar flat>
      <v-toolbar-title>
        {{ $t(route.fullPath.substring(1, route.fullPath.length)) }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn :to="localePath(`${route.fullPath}/create`)" icon="mdi-plus"/>
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
        <NuxtLink :to="localePath(`/faqs/${item.id}`)">
          <v-btn icon="mdi-pencil" variant="flat" size="x-small"></v-btn>
        </NuxtLink>
      </template>
      <template v-for="(slot, name) in $slots" v-slot:[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </v-data-table-server>
  </v-card>
</template>