<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="value"></EventsView
  ></v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { $i18n } = useNuxtApp()
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const route = useRoute()
const { data } = await useAsyncData(
  "events",
  async () =>
    await queryContent(
      "events/" + $i18n.locale.value + "/" + route.params.slug,
    ).findOne(),
)

const value = data._rawValue
</script>
