<script setup lang="ts">
import {useFaqsStore} from "~/stores/faqs/faqs";

definePageMeta({
  middleware: ['auth'],
});

const localePath = useLocalePath()
const store = useFaqsStore()
</script>

<template>
  <TablePage :store="store">
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
  </TablePage>
</template>
