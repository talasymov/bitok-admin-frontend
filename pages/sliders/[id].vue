<script setup lang="ts">
import {ref} from "vue";

definePageMeta({
  middleware: ['auth'],
});

import type {Message} from "~/stores/notification";
import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";

const {t} = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const errors = ref(null)
const state = ref({})
const image = ref(null)

const update = async () => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(state.value));
  if (image.value !== null){
    formData.append("image_file", image.value);
  }

  await $fetch(`admin/sliders/${route.params.id}`, {
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
  await $fetch(`admin/sliders/${route.params.id}`, {
    onResponse({response}) {
      if (response?.status === 200) {
        state.value = response._data.data
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
  <v-card class="mx-auto px-6 py-8" width="1024">
    <multi-lang-text-field
        v-model="state.name"
        :rules="[required]"
        label="name"
        clearable
        class="w-100"
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

    <FormMultiLangTextEdtitor
        v-model="state.content"
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