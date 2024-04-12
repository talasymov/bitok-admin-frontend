<script setup lang="ts">
const {breadcrumbs} = useBreadcrumbs()
</script>

<template>
  <v-breadcrumbs
      :items="breadcrumbs"
  ></v-breadcrumbs>
</template>

<style scoped>

</style>