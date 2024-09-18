<template>
  <v-container> <PeopleView :item="people"></PeopleView></v-container>
</template>

<script setup>
const { locale } = useI18n()
const route = useRoute()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { data: people } = await useAsyncData(
  "people",
  async () =>
    await queryContent(
      "/people/" + locale.value + "/" + route.params.slug,
    ).findOne(),
)
rootStore.setLoading(false, "people")
</script>
