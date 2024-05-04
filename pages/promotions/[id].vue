<script setup lang="ts">
import {usePromotionEditStore} from "~/stores/promotions/edit";
import {useSelectStore} from "~/stores/select";

const selectStore = useSelectStore();
const promotionStore = usePromotionEditStore();
const id = useRoute().params.id;

await promotionStore.fetchModel(id);

onMounted(async () => {
  await selectStore.fetchPromotionStatuses();
})
</script>

<template>
  <ViewsPromotionForm
      :store="promotionStore"
      :selectStore="selectStore"
  >
    <v-btn
        @click="promotionStore.deleteModel(id)"
        :loading="promotionStore.loading"
        color="error"
        type="button"
        variant="tonal"
        :text="$t('delete')"
    />
    <v-btn
        @click="promotionStore.updateModel(id)"
        :loading="promotionStore.loading"
        color="success"
        type="button"
        variant="tonal"
        :text="$t('update')"
    />
  </ViewsPromotionForm>
</template>