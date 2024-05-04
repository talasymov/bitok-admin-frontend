<script setup lang="ts">
const {locale, locales, t} = useI18n();
const dialog = ref(false);
const model = defineModel({default: {}});
const tab = ref('en');

defineProps({
  label: {
    type: String,
    default: 'Label',
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
});
</script>

<template>
  <div>
    <v-tabs
        v-model="tab"
        align-tabs="center"
    >
      <v-tab :value="locale.code" v-for="locale in locales" :key="locale.code">{{ locale.code }}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
          v-for="locale in locales"
          :key="locale.code"
          :value="locale.code"
      >
        <TiptapEditor v-model="model[locale.code]"/>
      </v-window-item>
    </v-window>
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
              <TiptapEditor v-model="model[l.code]"/>
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