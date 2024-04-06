<script setup lang="ts">
const {locale, locales, t} = useI18n()
const dialog = ref(false)
const model = defineModel({default: {}})

defineProps({
  label: {
    type: String,
    default: 'Label',
  },
  density: {
    type: String,
    default: 'default',
  },
  variant: {
    type: String,
    default: 'outlined',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: [],
  },
})
</script>

<template>
  <div>
    <v-text-field
        v-model="model[locale]"
        class="mb-2"
        :label="t(label)"
        :rules="rules"
        :readonly="readonly"
        append-inner-icon="mdi-web"
        :density="density"
        :variant="variant"
        @click:append-inner="dialog = true"
    ></v-text-field>
    <v-dialog
        v-model="dialog"
        max-width="500"
    >
      <v-card
          prepend-icon="mdi-web"
          :title="t('translate')"
      >
        <v-card-text>
          <v-row dense>
            <v-col
                cols="12"
                v-for="l in locales"
                :key="l.code"
            >
              <v-text-field
                  v-model="model[l.code]"
                  :label="t(`${l.code}_lang`)"
                  :rules="rules"
                  :readonly="readonly"
                  :variant="variant"
                  required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              :text="t('close')"
              variant="plain"
              @click="dialog = false"
          ></v-btn>

          <v-btn
              color="primary"
              :text="t('save')"
              variant="tonal"
              @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>