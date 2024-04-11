<script setup lang="ts">
import {useConfirmDialog} from "@vueuse/core";

const emit = defineEmits(['confirm', 'reveal'])

const revaledDeposit = ref(false)
const dialogDeposit = useConfirmDialog(revaledDeposit)

dialogDeposit.onReveal(() => {
  emit('reveal')
})

dialogDeposit.onConfirm(() => {
  emit('confirm')
})

defineProps({
  variant: {
    type: String,
    default: 'tonal'
  },
  color: {
    type: String,
    default: 'surface-variant'
  }
})
</script>

<template>
  <v-dialog max-width="300">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          :color="color"
          :variant="variant"
      >
        <slot/>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-btn
              text="Close Dialog"
              variant="tonal"
              @click="isActive.value = false; dialogDeposit.confirm()"
          ></v-btn>

          <v-spacer></v-spacer>

          <v-btn
              text="Confirm"
              color="success"
              variant="tonal"
              @click="isActive.value = false; dialogDeposit.confirm()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>