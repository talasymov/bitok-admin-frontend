<script setup lang="ts">
import {SIDEBAR_LINKS_ITEMS} from "~/utils/Lists";
</script>

<template>
  <v-list density="compact" nav>
    <v-list-item
        v-for="menu_item in SIDEBAR_LINKS_ITEMS"
        :key="menu_item.value"
        :title="$t(menu_item.text)"
        :to="menu_item.value"
        :prepend-icon="menu_item.icon"
        link
    ></v-list-item>
  </v-list>
</template>