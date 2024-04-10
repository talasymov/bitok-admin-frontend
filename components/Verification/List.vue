<script setup lang="ts">
const {t} = useI18n()

const emit = defineEmits(['approve'])

const props = defineProps({
  email_at: {
    type: String || null,
  },
  phone_at: {
    type: String || null,
  },
  document_at: {
    type: String || null,
  },
})

const items = computed(() => [
  {
    title: t('email_at'),
    subtitle: props.email_at,
    icon: 'mdi-email',
  },
  {
    title: t('phone_at'),
    subtitle: props.phone_at,
    icon: 'mdi-phone',
  },
  {
    title: t('document_at'),
    subtitle: props.document_at,
    icon: 'mdi-passport-biometric',
  },
])
</script>

<template>
  <div>
    <v-list lines="two">
      <v-list-item
          v-for="item in items"
          :key="item.title"
          :subtitle="item.subtitle"
          :title="t(item.title)"
      >
        <template v-slot:prepend>
          <v-avatar :color="item.subtitle == null ? 'grey' : 'success'">
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-avatar>
        </template>
        <template v-if="item.icon === 'mdi-passport-biometric'" v-slot:append>
          <v-btn
              v-if="item.subtitle == null"
              @click="() => emit('approve')"
              color="success"
              variant="tonal"
          >{{ t('approve') }}
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>