<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";
import MultiLangTextarea from "~/components/Form/MultiLangTextarea.vue";
import Notification from "~/components/Common/Notification.vue";

const {t, locales} = useI18n()
const localePath = useLocalePath()
const form = ref(false)
const state = ref({
  name: {},
  content: {}
})

locales.value.forEach((locale) => {
  state.value.name[locale.code] = ''
  state.value.content[locale.code] = ''
})

const errors = ref(null)
const categories = ref([])
const statuses = ref([])

const {refresh: create, status: createStatus} = useFetch<any>(`admin/faqs`, {
  method: "POST",
  body: state,
  immediate: false,
  watch: false,
  async onResponse({response}) {
    errors.value = null
    if (response?.status === 422) {
      errors.value = response._data?.errors;
    } else if (response.status === 200) {
      if (response._data.id) {
        navigateTo(localePath(`/faqs/${response._data.id}`))
      } else {
        useNotify(<Message>{
          message: t('error'),
          type: 'error'
        })
      }
    }
  }
});

onMounted(async () => {
  await $fetch(`admin/faq-categories`, {
    onResponse({response}) {
      if (response?.status === 200) {
        categories.value = response._data
      }
    }
  })

  await $fetch(`admin/statuses/faqs`, {
    onResponse({response}) {
      if (response?.status === 200) {
        statuses.value = response._data
      }
    }
  })
})

const required = (v) => !!v || 'Field is required'
</script>

<template>
  <v-sheet class="bg-grey-lighten-4 pa-12 w-100 h-100 d-flex flex-column align-center justify-center" rounded>
    <v-card class="mx-auto px-6 py-8 w-100">
      <Notification/>
      <v-form
          v-model="form"
          @submit.prevent="create"
      >
        <multi-lang-text-field
            v-model="state.name"
            label="name"
            :readonly="createStatus === 'pending'"
            :rules="[required]"
            clearable
        />

        <v-autocomplete
            v-model="state.faq_category_id"
            :label="t('category')"
            :items="categories"
            item-value="id"
            item-title="name"
            variant="outlined"
        ></v-autocomplete>

        <v-autocomplete
            v-model="state.status"
            :label="t('status')"
            :items="statuses"
            item-value="id"
            item-title="name"
            variant="outlined"
        ></v-autocomplete>

        <multi-lang-textarea
            v-model="state.content"
            label="content"
            :readonly="createStatus === 'pending'"
            :rules="[required]"
            variant="outlined"
            clearable
            no-resize
        />

        <br>

        <div class="d-flex justify-space-between">
          <v-spacer/>

          <v-btn
              :disabled="!form"
              :loading="createStatus === 'pending'"
              color="success"
              type="submit"
              variant="outlined"
          >
            {{ t('create') }}
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<style scoped>

</style>