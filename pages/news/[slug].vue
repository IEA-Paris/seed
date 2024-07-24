<template>
  <v-container> <NewsView :item="value"></NewsView></v-container>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify"
const { $i18n } = useNuxtApp()
const { smAndUp, mdAndUp } = useDisplay()
const route = useRoute()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  "news",
  async () =>
    await queryContent(
      "news/" + $i18n.locale.value + "/" + route.params.slug
    ).findOne()
)

const value = data._rawValue
</script>
