<script setup lang="ts">
const {t} = useI18n()
const model = defineModel()
</script>

<template>
  <div>
    <h4 class="text-h6 mb-4">{{ t('common_settings') }}</h4>

    <div class="d-flex ga-2">
      <v-text-field
          v-model="model.wager"
          :label="t('wager')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="model.min_deposit"
          :label="t('min_deposit')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />
    </div>

    <div class="d-flex ga-2">
      <v-text-field
          v-model="model.max_bet"
          :label="t('max_bet')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="model.max_bonus"
          :label="t('max_bonus')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="model.max_win"
          :label="t('max_win')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />
    </div>

    <h4 class="text-subtitle-1 mb-4">{{ t('bonus_filling') }}</h4>

    <div class="d-flex ga-2">
      <v-text-field
          v-model="model.free_spins"
          :label="t('free_spins')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="model.free_spins_bet"
          :label="t('free_spins_bet')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />
    </div>

    <div class="d-flex ga-2">
      <v-text-field
          v-model="model.money"
          :label="t('money')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />

      <v-text-field
          v-model="model.percent"
          :label="t('percent')"
          variant="outlined"
          type="number"
          min="0"
          clearable
      />
    </div>
  </div>
</template>

<style scoped>

</style>