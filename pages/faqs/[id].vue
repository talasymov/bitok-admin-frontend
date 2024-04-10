<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";
import MultiLangTextarea from "~/components/Form/MultiLangTextarea.vue";
import type {Message} from "~/stores/notification";

const {t, locale} = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const form = ref(false)
const state = ref({})
const errors = ref(null)
const categories = ref([])
const statuses = ref([])

const {refresh: update, status: updateStatus} = useFetch<any>(`admin/faqs/${route.params.id}`, {
  method: "PUT",
  body: state,
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
});

const {refresh: deleteFaq, status: deleteStatus} = useFetch<any>(`admin/faqs/${route.params.id}`, {
  method: "DELETE",
  immediate: false,
  watch: false,
  async onResponse({response}) {
    errors.value = null
    if (response?.status === 422) {
      errors.value = response._data?.errors;
    } else if (response.status === 200) {
      navigateTo(localePath('/faqs'))
    }
  }
});

onMounted(async () => {
  await $fetch(`admin/faqs/${route.params.id}`, {
    onResponse({response}) {
      if (response?.status === 200) {
        state.value = response._data

        useBreadcrumbsStore().breadcrumbs = [
          {
            title: t('dashboard'),
            disabled: false,
            href: localePath('/'),
          },
          {
            title: t('faqs'),
            disabled: false,
            href: localePath('/faqs'),
          },
          {
            title: state.value.name[locale.value],
            disabled: true,
          },
        ]
      }
    }
  })

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
  <v-card class="mx-auto px-6 py-8" width="500">
    <v-form
        v-model="form"
        @submit.prevent="update"
    >
      <multi-lang-text-field
          v-model="state.name"
          :readonly="updateStatus === 'pending'"
          :rules="[required]"
          label="name"
          clearable
      />

      <v-autocomplete
          v-model="state.faq_category_id"
          label="category"
          :items="categories"
          item-value="id"
          item-title="name"
          variant="outlined"
      ></v-autocomplete>

      <v-autocomplete
          v-model="state.status"
          label="status"
          :items="statuses"
          item-value="id"
          item-title="name"
          variant="outlined"
      ></v-autocomplete>

        <multi-lang-textarea
            v-model="state.content"
            :readonly="updateStatus === 'pending'"
            :rules="[required]"
            label="content"
            variant="outlined"
            clearable
            no-resize
        />

      <br>

      <div class="d-flex justify-space-between">
        <v-btn
            @click="deleteFaq"
            :loading="deleteStatus === 'pending'"
            color="error"
            type="button"
            variant="tonal"
        >
          {{ t('delete') }}
        </v-btn>

        <v-btn
            :disabled="!form"
            :loading="updateStatus === 'pending'"
            color="success"
            type="submit"
            variant="tonal"
        >
          {{ t('update') }}
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>