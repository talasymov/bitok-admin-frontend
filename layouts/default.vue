<script setup lang="ts">
useHead({
  title: usePageStore().page.title
})
</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat class="border-b">
      <v-app-bar-title>Bitok</v-app-bar-title>
      <v-spacer></v-spacer>
      <CommonThemeSwitcher/>
      <div class="d-flex ga-2 pr-4">
        <CommonLangSwitcher/>
        <CommonLogout/>
      </div>
    </v-app-bar>
    <v-navigation-drawer
        expand-on-hover
        rail
    >
      <CommonSidebarNavigation/>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
<!--        <CommonBreadcrumbs/>-->
        <NuxtPage/>
      </v-container>
    </v-main>
    <CommonNotification/>
  </v-app>
</template>