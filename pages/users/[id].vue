<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import {ref} from 'vue';

const {t} = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const tab = ref(1)
const user = ref({})
const breadcrumbs = ref([])

onMounted(async () => {
  await $fetch(`admin/users/${route.params.id}`, {
    onResponse({response}) {
      if (response?.status === 200) {
        user.value = response._data.data
        breadcrumbs.value = [
          {
            title: t('dashboard'),
            disabled: false,
            href: localePath('/'),
          },
          {
            title: t('users'),
            disabled: false,
            href: localePath('/users'),
          },
          {
            title: user.value.name,
            disabled: true,
          },
        ]
      }
    }
  })
})
</script>

<template>
  <div class="w-full">
    <v-breadcrumbs
        :items="breadcrumbs"
    ></v-breadcrumbs>
    <v-container fluid>
      <v-row>
        <v-col
            cols="12"
            md="3"
        >
          <v-card
              class="mx-auto"
              elevation="24"
          >
            <v-img
                height="200px"
                :src="user.avatar"
                cover
            ></v-img>
            <v-card-title class="d-flex ga-2 align-center py-2">
              {{ user.name }}
              <v-icon icon="mdi-check-decagram" size="24" :color="user.is_verified ? 'success' : 'warning'"/>
            </v-card-title>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-email" :color="user.email ? 'success' : 'warning'"/>
              {{ user.email }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-phone" :color="user.phone ? 'success' : 'warning'"/>
              {{ user.phone || t('not_filled') }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-cake" :color="user.birthday ? 'success' : 'warning'"/>
              {{ user.birthday || t('not_filled') }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-gender-male-female" :color="user.gender ? 'success' : 'warning'"/>
              {{ user.gender || t('not_filled') }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-web"/>
              {{ user.locale || t('not_filled') }}
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            md="9"
        >
          <v-card class="w-100">
            <v-tabs
                v-model="tab"
                align-tabs="center"
                color="deep-purple-accent-4"
            >
              <v-tab :value="1">{{ t('bonuses') }}</v-tab>
              <v-tab :value="2">{{ t('transactions') }}</v-tab>
              <v-tab :value="3">{{ t('notifications') }}</v-tab>
              <v-tab :value="4">{{ t('gift_boxes') }}</v-tab>
              <v-tab :value="5">{{ t('documents') }}</v-tab>
              <v-tab :value="6">{{ t('verifications') }}</v-tab>
              <v-tab :value="7">{{ t('tournaments') }}</v-tab>
              <v-tab :value="8">{{ t('activity_log') }}</v-tab>
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item
                  v-for="n in 8"
                  :key="n"
                  :value="n"
              >
                {{ user }}
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>