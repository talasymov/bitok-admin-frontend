<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest'],
});

const {t} = useI18n()
const localePath = useLocalePath()
const auth = useAuthStore();
const user = useUserStore();
const state = reactive({
  email: '',
  password: '',
  login_through: 'email',
})

const errors = ref(null)
const form = ref(false)

const {refresh: login, status: loginStatus} = useFetch<any>("login", {
  method: "POST",
  body: state,
  immediate: false,
  watch: false,
  async onResponse({response}) {
    errors.value = null
    if (response?.status === 422) {
      errors.value = response._data.errors
    } else if (response._data?.token) {
      auth.setToken(response._data.token);
      await user.fetchUser();
      await navigateTo(localePath('/'))
    }
  }
});

const required = (v) => !!v || 'Field is required'
</script>

<template>
    <v-sheet class="pa-12 w-100 h-100 d-flex align-center justify-center" rounded>
      <v-card class="mx-auto px-6 py-8" style="width: 300px">
        <v-form
            v-model="form"
            @submit.prevent="login"
        >
          <v-text-field
              v-model="state.email"
              :readonly="loginStatus === 'pending'"
              :rules="[required]"
              class="mb-2"
              label="Email"
              clearable
          ></v-text-field>

          <v-text-field
              v-model="state.password"
              :readonly="loginStatus === 'pending'"
              :rules="[required]"
              label="Password"
              placeholder="Enter your password"
              clearable
          ></v-text-field>

          <br>

          <v-btn
              :disabled="!form"
              :loading="loginStatus === 'pending'"
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              block
          >
            Sign In
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
<!--    <v-form fast-fail @submit.prevent="login">-->
<!--      <v-card-->
<!--          class="mx-auto"-->
<!--          elevation="2"-->
<!--          :title="t('login_form')"-->
<!--          :loading="loginStatus === 'pending'"-->
<!--      >-->
<!--        <v-card-item>-->
<!--          <v-sheet class="mx-auto pa-2" width="300">-->

<!--            <v-text-field-->
<!--                variant="solo"-->
<!--                v-model="state.email"-->
<!--                :label="('email')"-->
<!--            ></v-text-field>-->

<!--            <v-text-field-->
<!--                variant="solo"-->
<!--                v-model="state.password"-->
<!--                :label="t('password')"-->
<!--            ></v-text-field>-->
<!--          </v-sheet>-->
<!--        </v-card-item>-->

<!--        <v-card-actions>-->
<!--          <v-btn-->
<!--              class="mt-2"-->
<!--              variant="text"-->
<!--              type="submit">{{ t('login') }}</v-btn>-->
<!--        </v-card-actions>-->
<!--      </v-card>-->
<!--    </v-form>-->
</template>

<style scoped>

</style>