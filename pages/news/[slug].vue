<template>
  <v-container> <NewsView :item="news"></NewsView></v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { locale } = useI18n()
const { smAndUp, mdAndUp } = useDisplay()
const route = useRoute()
const localePath = useLocalePath()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { data: news } = await useAsyncData(
  "news",
  async () =>
    await queryContent(
      "news/" + locale.value + "/" + route.params.slug,
    ).findOne(),
)
rootStore.setLoading(false, "news")
</script>
