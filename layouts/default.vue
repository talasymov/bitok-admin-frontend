<script setup lang="ts">
const {t} = useI18n()
const localePath = useLocalePath()

const links = [
  {'text': t('dashboard'), 'value': localePath('')},
  {'text': t('messages'), 'value': localePath('messages')},
]

const menu_items = [
  {'text': t('faqs'), 'value': localePath('/faqs')},
  {'text': t('bonuses'), 'value': localePath('/bonuses')},
  {'text': t('wheel_of_fortune'), 'value': localePath('/bonuses/wheel-of-fortune')},
  {'text': t('gift_boxes'), 'value': localePath('/gift-boxes')},
  {'text': t('games'), 'value': localePath('/games')},
  {'text': t('users'), 'value': localePath('/users')},
  {'text': t('sliders'), 'value': localePath('/sliders')},
]
</script>

<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
<!--        <v-avatar-->
<!--            class="me-4"-->
<!--            color="grey-darken-1"-->
<!--            size="32"-->
<!--        ></v-avatar>-->
        <NuxtLink
            :to="link.value"
            v-for="link in links"
            :key="link"
        >
          <v-btn :text="link.text" variant="text"></v-btn>
        </NuxtLink>

        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list rounded="lg">
                <v-list-item
                    v-for="menu_item in menu_items"
                    :key="menu_item.value"
                    :title="menu_item.text"
                    :to="menu_item.value"
                    link
                ></v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                    color="grey-lighten-4"
                    title="Refresh"
                    link
                ></v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col cols="10">
            <v-sheet
                min-height="70vh"
                rounded="lg"
            >
              <NuxtPage/>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>