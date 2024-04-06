<script setup lang="ts">
import MultiLangTextField from "~/components/Form/MultiLangTextField.vue";
import type {Message} from "~/stores/notification";
import Notification from "~/components/Common/Notification.vue";
import Config from "~/components/Bonuses/Config.vue";

const {t} = useI18n()
const route = useRoute()
const form = ref(false)
const state = ref({})
const errors = ref(null)
const games = ref([])
const image = ref(null)
const updateStatus = ref(null)


const update = async () => {
  const formData = new FormData();
  formData.append("image", image.value);
  formData.append("data", JSON.stringify(state.value));

  await $fetch(`admin/bonuses/${route.params.id}`, {
    method: "PUT",
    body: formData,
    immediate: false,
    watch: false,
    async onResponse({response}) {
      errors.value = null
      if (response?.status === 422) {
        errors.value = response._data?.errors;
      } else if (response.status === 200) {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

// const {refresh: deleteBonus, status: deleteStatus} = useFetch<any>(`admin/bonuses/${route.params.id}`, {
//   method: "DELETE",
//   immediate: false,
//   watch: false,
//   async onResponse({response}) {
//     errors.value = null
//     if (response?.status === 422) {
//       errors.value = response._data?.errors;
//     } else if (response.status === 200) {
//       navigateTo(localePath('/bonuses'))
//     }
//   }
// });

onMounted(async () => {
  await $fetch(`admin/bonuses/${route.params.id}`, {
    onResponse({response}) {
      if (response?.status === 200) {
        state.value = response._data
      }
    }
  })

  await $fetch(`admin/games`, {
    onResponse({response}) {
      if (response?.status === 200) {
        games.value = response._data
      }
    }
  })
})

const required = (v) => !!v || 'Field is required'
const image_rules = [
  (value) => {
    return !value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!'
  }
]
</script>

<template>
  <v-sheet class="bg-grey-lighten-4 pa-12 w-100 h-100 d-flex flex-column align-center justify-center" rounded>
    <v-card class="mx-auto px-6 py-8 w-100">
      <Notification/>
      <v-form
          v-model="form"
          @submit.prevent="update"
      >
        <multi-lang-text-field
            v-model="state.name"
            :readonly="updateStatus === 'pending'"
            :rules="[required]"
            label="name"
            clearable
            class="w-100"
        />

        <div class="d-flex ga-2">
          <v-file-input
              v-model="image"
              :rules="image_rules"
              accept="image/png, image/jpeg, image/bmp"
              :label="t('image')"
              variant="outlined"
              :prepend-icon="null"
              append-inner-icon="mdi-camera"
          ></v-file-input>
          <NuxtLink :to="state.image" external target="_blank">
            <v-img
                v-if="state.image"
                :src="state.image"
                rounded
                cover
                width="56"
                height="56"
            />
          </NuxtLink>
        </div>

        <v-autocomplete
            v-model="state.games"
            :label="t('games')"
            :items="games"
            item-value="id"
            item-title="name"
            variant="outlined"
            multiple
            chips
            clearable
            closable-chips
            return-object
        ></v-autocomplete>

        <Config v-model="state"/>

        <v-switch
            color="primary"
            :label="t('no_deposit')"
        />

        <v-toolbar flat>
          <v-toolbar-title>
            {{ t('deposit_conditions') }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn @click="state.meta.conditions.push({})" icon="mdi-plus"/>

          <v-btn icon="mdi-dots-vertical"/>
        </v-toolbar>

        <div class="pa-4" v-if="state?.meta?.conditions?.length > 0">
          <v-list lines="one">
            <v-list-item v-for="(_, index) in state.meta.conditions" :key="index">
              <Config v-model="state.meta.conditions[index]"/>

              <template v-slot:append>
                <v-btn
                    color="grey-lighten-1"
                    icon="mdi-trash-can"
                    @click="state.meta.conditions.splice(index, 1)"
                    variant="text"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </div>

        <br>

        <div class="d-flex justify-space-between">
          <v-btn
              color="error"
              type="button"
              variant="outlined"
          >
            {{ t('delete') }}
          </v-btn>

          <v-btn
              :disabled="!form"
              :loading="updateStatus === 'pending'"
              color="success"
              type="submit"
              variant="outlined"
          >
            {{ t('update') }}
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-sheet>
</template>