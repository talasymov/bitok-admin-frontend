<script setup lang="ts">
import {useTheme} from 'vuetify'
import {SIDEBAR_LINKS_ITEMS, SUPPORTED_LANGUAGES_ITEMS} from "~/utils/Lists";
import Notification from "~/components/Common/Notification.vue";
import {useBreadcrumbsStore} from "~/stores/breadcrumbs";

const {locale, t, setLocale} = useI18n()
const localePath = useLocalePath()
const auth = useAuthStore()
const theme = useTheme();
const userTheme = useCookie('theme')
const breadcrumbsStore = useBreadcrumbsStore()

if (userTheme.value === null){
  userTheme.value = 'dark'
}

theme.global.name.value = userTheme.value

const switchTheme = () => {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
  userTheme.value = theme.global.name.value
}

const logout = () => {
  auth.logout()
}
</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat class="border-b">
      <v-app-bar-title>Bitok</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn
          v-if="theme.global.name.value === 'light'"
          @click="switchTheme"
          color="grey-darken-1"
          icon="mdi-white-balance-sunny"
      />
      <v-btn
          v-else
          @click="switchTheme"
          color="grey-lighten-1"
          icon="mdi-weather-night"
      />

      <div class="d-flex ga-2 pr-4">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                variant="tonal"
                dark
                density="compact"
                v-bind="props"
            >
              {{ locale }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="(item, index) in SUPPORTED_LANGUAGES_ITEMS"
                @click="setLocale(item.locale)"
                class="text-center"
                :key="index"
            >
              <v-list-item-title class="text-sm-button">{{ item.locale }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
            color="warning"
            density="compact"
            variant="tonal"
            prepend-icon="mdi-logout"
            @click="logout"
        >
          {{ t('logout') }}
        </v-btn>
      </div>
    </v-app-bar>

    <v-navigation-drawer
        expand-on-hover
        rail
    >
      <v-list density="compact" nav>
        <v-list-item
            v-for="menu_item in SIDEBAR_LINKS_ITEMS"
            :key="menu_item.value"
            :title="t(menu_item.text)"
            :to="menu_item.value"
            :prepend-icon="menu_item.icon"
            link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-breadcrumbs
            :items="breadcrumbsStore.breadcrumbs"
        ></v-breadcrumbs>

        <NuxtPage/>
      </v-container>
    </v-main>

    <Notification/>
  </v-app>
</template>