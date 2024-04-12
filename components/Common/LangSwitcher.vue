<script setup lang="ts">
import {SUPPORTED_LANGUAGES_ITEMS} from "~/utils/Lists";
const {locale, setLocale} = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
          color="primary"
          variant="tonal"
          dark
          density="compact"
          v-bind="props"
      >
        {{ locale }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
          v-for="(item, index) in SUPPORTED_LANGUAGES_ITEMS"
          @click="setLocale(item.locale)"
          class="text-center"
          :key="index"
      >
        <v-list-item-title class="text-sm-button">{{ item.locale }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>

</style>