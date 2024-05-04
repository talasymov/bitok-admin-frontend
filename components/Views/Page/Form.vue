<script setup lang="ts">
const {store} = defineProps({
  store: usePageEditStore,
});

import {required} from "~/utils/Rules";
import {usePageEditStore} from "~/stores/pages/edit";
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

      <FormMultiLangTextField
          v-model="store.state.title"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('title')"
          clearable
      />

      <FormMultiLangTextField
          v-model="store.state.description"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('description')"
          clearable
      />

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