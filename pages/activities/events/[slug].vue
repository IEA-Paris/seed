<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="value"></EventsView
  ></v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { locale } = useI18n()
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const route = useRoute()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { data } = await useAsyncData(
  "events",
  async () =>
    await queryContent(
      "events/" + locale.value + "/" + route.params.slug,
    ).findOne(),
)

const value = data._rawValue
rootStore.setLoading(false, "events")
</script>
