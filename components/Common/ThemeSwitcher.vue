<script setup lang="ts">
import {useTheme} from "vuetify";

const theme = useTheme();
const userTheme = useCookie('theme')

if (userTheme.value === null) {
  userTheme.value = 'dark'
}

theme.global.name.value = userTheme.value

const switchTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  userTheme.value = theme.global.name.value
}
</script>

<template>
<div>
  <v-btn
      v-if="theme.global.name.value === 'light'"
      @click="switchTheme"
      color="grey-darken-1"
      icon="mdi-white-balance-sunny"
  />
  <v-btn
      v-else
      @click="switchTheme"
      color="grey-lighten-1"
      icon="mdi-weather-night"
  />
</div>
</template>

<style scoped>

</style>