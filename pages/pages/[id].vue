<script setup lang="ts">
import {usePageEditStore} from "~/stores/pages/edit";

const pageStore = usePageEditStore();
const id = useRoute().params.id;

await pageStore.fetchModel(id);
</script>

<template>
  <ViewsPageForm
      :store="pageStore"
  >
    <v-btn
        @click="pageStore.deleteModel(id)"
        :loading="pageStore.loading"
        color="error"
        type="button"
        variant="tonal"
        :text="$t('delete')"
    />
    <v-btn
        @click="pageStore.updateModel(id)"
        :loading="pageStore.loading"
        color="success"
        type="button"
        variant="tonal"
        :text="$t('update')"
    />
  </ViewsPageForm>
</template>