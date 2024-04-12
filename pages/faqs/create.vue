<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {useFaqEditStore} from "~/stores/faqs/edit";
import {useSelectStore} from "~/stores/select";

const faqStore = useFaqEditStore()
const selectStore = useSelectStore()

onMounted(async () => {
  await selectStore.fetchFaqCategories()
  await selectStore.fetchFaqStatuses()
})

</script>

<template>
  <ViewsFaqsForm
      :store="faqStore"
      :selectStore="selectStore"
  >
    <v-spacer/>

    <v-btn
        @click="faqStore.createModel()"
        :loading="faqStore.loading"
        color="success"
        type="button"
        variant="tonal"
        :text="$t('create')"
    />
  </ViewsFaqsForm>
</template>

<style scoped>

</style>