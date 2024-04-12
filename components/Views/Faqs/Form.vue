<script setup lang="ts">
defineProps({
  store: useFaqEditStore,
  selectStore: useSelectStore
})

import {required} from "~/utils/Rules";
import {useSelectStore} from "~/stores/select";
import {useFaqEditStore} from "~/stores/faqs/edit";
import MultiLangTextarea from "~/components/Form/MultiLangTextarea.vue";
import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";
</script>

<template>
  <v-card class="mx-auto px-6 py-8" width="500">
    <v-form>
      <multi-lang-text-field
          v-model="store.state.name"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('name')"
          clearable
      />
      <v-autocomplete
          v-model="store.state.faq_category_id"
          :label="$t('category')"
          :items="selectStore.faq_categories"
          item-value="id"
          item-title="name"
          variant="outlined"
      />
      <v-autocomplete
          v-model="store.state.status"
          :label="$t('status')"
          :items="selectStore.faq_statuses"
          item-value="id"
          item-title="name"
          variant="outlined"
      />
      <multi-lang-textarea
          v-model="store.state.content"
          :readonly="store.loading"
          :rules="[required]"
          :label="$t('content')"
          variant="outlined"
          clearable
          no-resize
      />
      <br>
      <div class="d-flex justify-space-between">
        <slot/>
      </div>
    </v-form>
  </v-card>
</template>