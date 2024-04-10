<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <v-list lines="two">
      <v-list-item
          v-for="document in items"
          :key="document.id"
          :subtitle="document.created_at"
          :title="document.name"
      >
        <template v-slot:prepend>
          <v-avatar color="blue">
            <v-icon color="white">mdi-clipboard-text</v-icon>
          </v-avatar>
        </template>
        <template v-slot:append>
          <NuxtLink
              :to="document.url"
              target="_blank"
              external
          >
            <v-btn
                color="grey-lighten-1"
                icon="mdi-eye"
                variant="text"
            ></v-btn>
          </NuxtLink>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>