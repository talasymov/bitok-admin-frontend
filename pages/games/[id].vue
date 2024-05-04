<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {ref} from "vue";
import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";
import type {Message} from "~/stores/notification";

const {t, locale} = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const errors = ref(null)
const game_providers = ref([])
const game_types = ref([])
const game_categories = ref([])
const state = ref({})
const image = ref(null)

const update = async () => {
  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("data", JSON.stringify(state.value));

  await $fetch(`admin/games/${route.params.id}`, {
    method: "PUT",
    body: formData,
    immediate: false,
    watch: false,
    async onResponse({response}) {
      errors.value = null
      if (response?.status === 422) {
        errors.value = response._data?.errors;
      } else if (response.status === 200) {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}


onMounted(async () => {
  await $fetch(`admin/games/${route.params.id}`, {
    onResponse({response}) {
      if (response?.status === 200) {
        state.value = response._data
      }
    }
  })

  await $fetch('admin/game-providers', {
    onResponse({response}) {
      if (response?.status === 200) {
        game_providers.value = response._data
      }
    }
  })

  await $fetch('admin/game-types', {
    onResponse({response}) {
      if (response?.status === 200) {
        game_types.value = response._data
      }
    }
  })

  await $fetch('admin/game-categories', {
    onResponse({response}) {
      if (response?.status === 200) {
        game_categories.value = response._data
      }
    }
  })
})

const required = (v) => !!v || 'Field is required'
const image_rules = [
  (value) => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  }
]
</script>

<template>
    <v-card class="mx-auto px-6 py-8" width="500">
      <v-text-field
          v-model="state.name"
          :label="t('name')"
          :rules="[required]"
          variant="outlined"
          clearable
      />

      <div class="d-flex ga-2">
        <v-file-input
            v-model="image"
            :rules="image_rules"
            accept="image/png, image/jpeg, image/bmp"
            :label="t('image')"
            variant="outlined"
            :prepend-icon="null"
            append-inner-icon="mdi-camera"
        ></v-file-input>
        <NuxtLink :to="state.image" external target="_blank">
          <v-img
              v-if="state.image"
              :src="state.image"
              rounded
              cover
              width="56"
              height="56"
          />
        </NuxtLink>
      </div>

      <v-select
          v-model="state.game_category_id"
          :items="game_categories"
          :label="t('game_category')"
          item-title="name"
          item-value="id"
          variant="outlined"
          clearable
      />

      <v-select
        v-model="state.game_provider_id"
        :items="game_providers"
        :label="t('game_provider')"
        item-title="name"
        variant="outlined"
        item-value="id"
        :rules="[required]"
        disabled
        clearable
        :hint="t('available_for_developer')"
        class="mb-2"
        persistent-hint
      />

      <v-select
          v-model="state.game_type_id"
          :items="game_types"
          :label="t('game_type')"
          item-title="name"
          variant="outlined"
          item-value="id"
          :rules="[required]"
          clearable
          disabled
          :hint="t('available_for_developer')"
          class="mb-2"
          persistent-hint
      />

      <br>

      <div class="d-flex justify-space-between align-center ga-2">
        <v-spacer/>

        <v-btn
            @click="update"
            color="success"
            type="submit"
            variant="tonal"
        >
          {{ t('update') }}
        </v-btn>
      </div>
    </v-card>
</template>