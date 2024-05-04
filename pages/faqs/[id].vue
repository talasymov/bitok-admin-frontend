<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {useFaqEditStore} from "~/stores/faqs/edit";
import {useSelectStore} from "~/stores/select";

const faqStore = useFaqEditStore();
const selectStore = useSelectStore();
const id = useRoute().params.id;

onMounted(async () => {
  await faqStore.fetchModel(id);
  await selectStore.fetchFaqCategories();
  await selectStore.fetchFaqStatuses();
})
</script>

<template>
  <ViewsFaqsForm
      :store="faqStore"
      :selectStore="selectStore"
  >
    <v-btn
        @click="faqStore.deleteModel(id)"
        :loading="faqStore.loading"
        color="error"
        type="button"
        variant="tonal"
        :text="$t('delete')"
    />
    <v-btn
        @click="faqStore.updateModel(id)"
        :loading="faqStore.loading"
        color="success"
        type="button"
        variant="tonal"
        :text="$t('update')"
    />
  </ViewsFaqsForm>
</template>