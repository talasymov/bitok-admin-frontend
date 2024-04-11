<script setup lang="ts">
import type {Message} from "~/stores/notification";
import {ref} from "vue";

definePageMeta({
  middleware: ['auth'],
});

const {t} = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const tab = ref(0)
const user = ref({})
const deposit_amount = ref(0)
const selected_gift_box = ref(null)
const selected_bonus = ref(null)
const gift_boxes = ref([])
const bonuses = ref([])

const approveDocumentVerification = () => {
  $fetch(`admin/verifications/verify-document/${route.params.id}`, {
    method: 'POST',
    async onResponse({response}) {
      if (response?.status === 200) {
        await fetchUser()

        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

const {refresh: fetchUser, status: fetchUserStatus} = useFetch<any>(`admin/users/${route.params.id}`, {
  immediate: false,
  watch: false,
  async onResponse({response}) {
    if (response?.status === 200) {
      user.value = response._data.data

      useBreadcrumbsStore().breadcrumbs = [
        {
          title: t('dashboard'),
          disabled: false,
          href: localePath('/'),
        },
        {
          title: t('users'),
          disabled: false,
          href: localePath('/users'),
        },
        {
          title: user.value.name,
          disabled: true,
        },
      ]
    }
  }
});

const deposit = async () => {
  await $fetch(`admin/wallets/deposit/${route.params.id}`, {
    method: 'POST',
    body: {
      amount: deposit_amount.value
    },
    async onResponse({response}) {
      if (response?.status === 200) {
        await fetchUser()

        tab.value = 2

        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status
        })
      } else {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

const withdraw = async () => {
  await $fetch(`admin/wallets/withdraw/${route.params.id}`, {
    method: 'POST',
    body: {
      amount: deposit_amount.value
    },
    async onResponse({response}) {
      if (response?.status === 200) {
        await fetchUser()

        tab.value = 2

        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status
        })
      } else {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

const _deadline = new Date()
_deadline.setHours(23, 59, 59, 999)
_deadline.setDate(_deadline.getDate() + 7)
const deadline = ref(_deadline.toISOString())

const setDeadline = (date: string) => {
  deadline.value = date
}

const giveGiftBox = async () => {
  await $fetch(`admin/gift-boxes/give/${selected_gift_box.value}`, {
    method: 'POST',
    body: {
      user_id: route.params.id,
      deadline: deadline.value,
    },
    async onResponse({response}) {
      if (response?.status === 200) {
        await fetchUser()

        tab.value = 4

        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status
        })
      } else {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

const giveBonus = async () => {
  await $fetch(`admin/bonuses/give/${selected_bonus.value}`, {
    method: 'POST',
    body: {
      user_id: route.params.id,
      deadline: deadline.value,
    },
    async onResponse({response}) {
      if (response?.status === 200) {
        await fetchUser()

        tab.value = 1

        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status
        })
      } else {
        useNotify(<Message>{
          message: response._data.message,
          type: response._data.status ? 'success' : 'error'
        })
      }
    }
  })
}

onMounted(async () => {
  await fetchUser()

  $fetch('admin/gift-boxes')
      .then((data) => {
        gift_boxes.value = data
      })

  $fetch('admin/bonuses')
      .then((data) => {
        bonuses.value = data
      })
})
</script>

<template>
  <div class="w-full">
    <v-container fluid>
      <v-row>
        <v-col
            cols="12"
            md="2"
        >
          <v-card
              class="mx-auto py-3"
          >
            <v-card-title class="d-flex ga-2 align-center py-2">
              {{ user.name }}
              <v-icon icon="mdi-check-decagram" size="24" :color="user.is_verified ? 'success' : 'warning'"/>
            </v-card-title>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-email" :color="user.email ? 'success' : 'warning'"/>
              {{ user.email }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-phone" :color="user.phone ? 'success' : 'warning'"/>
              {{ user.phone || t('not_filled') }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-cake" :color="user.birthday ? 'success' : 'warning'"/>
              {{ user.birthday || t('not_filled') }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-gender-male-female" :color="user.gender ? 'success' : 'warning'"/>
              {{ user.gender || t('not_filled') }}
            </v-card-subtitle>
            <v-card-subtitle class="d-flex ga-2 align-center py-2">
              <v-icon icon="mdi-web"/>
              {{ user.locale || t('not_filled') }}
            </v-card-subtitle>
            <!--              <FormConfirmDialog-->
            <!--                  color="success"-->
            <!--                  variant="tonal"-->
            <!--                  @confirm="alert()">-->
            <!--                {{ t('deposit') }}-->
            <!--              </FormConfirmDialog>-->
            <div class="pa-4">
              <v-dialog max-width="400">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                      v-bind="activatorProps"
                      color="error"
                      variant="tonal"
                      class="mb-3"
                      block
                  >
                    {{ t('withdraw') }}
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card :title="t('withdraw')">
                    <v-card-text>
                      <v-text-field
                          v-model="deposit_amount"
                          :label="t('amount')"
                          variant="outlined"
                          type="number"
                          hide-details
                          density="compact"
                      />
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                          :text="t('close')"
                          variant="tonal"
                          @click="isActive.value = false"
                      ></v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                          :text="t('confirm')"
                          color="success"
                          variant="tonal"
                          @click="isActive.value = false; withdraw()"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog max-width="400">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                      v-bind="activatorProps"
                      color="success"
                      variant="tonal"
                      class="mb-3"
                      block
                  >
                    {{ t('deposit') }}
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card :title="t('deposit')">
                    <v-card-text>
                      <v-text-field
                          v-model="deposit_amount"
                          :label="t('amount')"
                          variant="outlined"
                          type="number"
                          hide-details
                          density="compact"
                      />
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                          :text="t('close')"
                          variant="tonal"
                          @click="isActive.value = false"
                      ></v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                          :text="t('confirm')"
                          color="success"
                          variant="tonal"
                          @click="isActive.value = false; deposit()"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog max-width="400">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                      v-bind="activatorProps"
                      color="primary"
                      variant="tonal"
                      block
                      class="mb-3"
                  >
                    {{ t('give_bonus') }}
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card :title="t('give_bonus')">
                    <v-card-text>
                      <v-select
                          v-model="selected_bonus"
                          :label="t('bonus')"
                          :items="bonuses"
                          item-title="name"
                          item-value="id"
                          variant="outlined"
                      />
                      <FormDatetimePicker @date-update="setDeadline" :date="deadline" :label="t('deadline')"/>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                          :text="t('cancel')"
                          variant="tonal"
                          @click="isActive.value = false"
                      ></v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                          :text="t('give')"
                          color="success"
                          variant="tonal"
                          @click="isActive.value = false; giveBonus()"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-dialog max-width="400">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                      v-bind="activatorProps"
                      color="primary"
                      variant="tonal"
                      block
                  >
                    {{ t('give_gift_box') }}
                  </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card :title="t('give_gift_box')">
                    <v-card-text>
                      <v-select
                          v-model="selected_gift_box"
                          :label="t('gift_box')"
                          :items="gift_boxes"
                          item-title="name"
                          item-value="id"
                          variant="outlined"
                      />
                      <FormDatetimePicker @date-update="setDeadline" :date="deadline" :label="t('deadline')"/>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn
                          :text="t('cancel')"
                          variant="tonal"
                          @click="isActive.value = false"
                      ></v-btn>

                      <v-spacer></v-spacer>

                      <v-btn
                          :text="t('give')"
                          color="success"
                          variant="tonal"
                          @click="isActive.value = false; giveGiftBox()"
                      ></v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </v-card>
        </v-col>
        <v-col
            cols="12"
            md="10"
        >
          <v-card class="w-100">
            <v-tabs
                v-model="tab"
                align-tabs="center"
            >
              <v-tab :value="0">{{ t('common') }}</v-tab>
              <v-tab :value="1">{{ t('bonuses') }}</v-tab>
              <v-tab :value="2">{{ t('transactions') }}</v-tab>
              <v-tab :value="3">{{ t('notifications') }}</v-tab>
              <v-tab :value="4">{{ t('gift_boxes') }}</v-tab>
              <v-tab :value="5">{{ t('documents') }}</v-tab>
              <v-tab :value="6">{{ t('verifications') }}</v-tab>
              <v-tab :value="7">{{ t('tournaments') }}</v-tab>
              <!--              <v-tab :value="8">{{ t('activity_log') }}</v-tab>-->
            </v-tabs>
            <v-window v-model="tab">
              <v-window-item :value="0">
                <v-card
                    class="mx-auto py-3"
                >
                  <v-list>
                    <v-list-item>
                      {{ t('balance') }}: {{ user.default_balance }}
                    </v-list-item>
                    <v-list-item>
                      {{ t('bonuses') }}: {{ user.bonus_balance }}
                    </v-list-item>
                    <v-list-item>
                      {{ t('wager_left') }}: {{ user.active_bonus?.wager_left || 0 }}
                    </v-list-item>
                    <v-list-item>
                      {{ t('wager_target') }}: {{ user.active_bonus?.wager_target || 0 }}
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-window-item>
              <v-window-item :value="1">
                <UserBonusTable
                    :items="user.bonuses"
                />
              </v-window-item>
              <v-window-item :value="2">
                <TransactionTable
                    :items="user.transactions"
                />
              </v-window-item>
              <v-window-item :value="3">
                <NotificationTable
                    :items="user.notifications"
                />
              </v-window-item>
              <v-window-item :value="4">
                <UserGiftBoxTable
                    :items="user.gift_boxes"
                />
              </v-window-item>
              <v-window-item :value="5">
                <DocumentList
                    :items="user.documents"
                />
              </v-window-item>
              <v-window-item :value="6">
                <VerificationList
                    @approve="approveDocumentVerification"
                    :email_at="user.email_verified_at"
                    :phone_at="user.phone_verified_at"
                    :document_at="user.document_verified_at"
                />
              </v-window-item>
              <v-window-item :value="7">
                <TournamentTable
                    :items="user.tournaments"
                />
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>