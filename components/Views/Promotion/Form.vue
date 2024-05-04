<script setup lang="ts">
const {store} = defineProps({
  store: usePromotionEditStore,
  selectStore: useSelectStore,
});

import {image_rules, required} from "~/utils/Rules";
import {usePromotionEditStore} from "~/stores/promotions/edit";
import {useSelectStore} from "~/stores/select";
</script>

<template>
  <v-card class="mx-auto px-6 py-8" width="1024">
    <v-form>
      <FormMultiLangTextField
          v-model="store.state.name"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('name')"
          clearable
      />

      <v-autocomplete
          v-model="store.state.status"
          :label="$t('status')"
          :items="selectStore.promotion_statuses"
          item-value="id"
          item-title="name"
          variant="outlined"
      />

      <FormMultiLangTextField
          v-model="store.state.description"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('description')"
          clearable
      />

      <div class="d-flex ga-2">
        <v-file-input
            v-model="store.image"
            :rules="image_rules"
            accept="image/png, image/jpeg, image/bmp"
            :label="$t('image')"
            variant="outlined"
            :prepend-icon="null"
            append-inner-icon="mdi-camera"
        ></v-file-input>
        <NuxtLink :to="store.state.image" external target="_blank">
          <v-img
              v-if="store.state.image"
              :src="store.state.image"
              rounded
              cover
              width="56"
              height="56"
          />
        </NuxtLink>
      </div>

      <FormDatetimePicker v-model="store.state.deadline" :label="$t('deadline')"/>

      <FormMultiLangTextEdtitor
          v-model="store.state.content"
      />
      <br>
      <div class="d-flex justify-space-between">
        <slot/>
      </div>
    </v-form>
  </v-card>
</template>