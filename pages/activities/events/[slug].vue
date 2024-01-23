<template>
  <v-container>
    <EventPage :item="data" />
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { $i18n } = useNuxtApp()
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const route = useRoute()
const { data } = await useAsyncData(
  "fellowship",
  async () =>
    await queryContent(
      "event/" + $i18n.locale.value + "/" + route.params.slug
    ).findOne()
)
</script>
