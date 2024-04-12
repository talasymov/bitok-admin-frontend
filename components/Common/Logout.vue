<script setup lang="ts">
const auth = useAuthStore()
const logout = () => {
  auth.logout()
}
</script>

<template>
  <v-btn
      color="warning"
      density="compact"
      variant="tonal"
      prepend-icon="mdi-logout"
      @click="logout"
  >
    {{ $t('logout') }}
  </v-btn>
</template>

<style scoped>

</style>