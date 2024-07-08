<template>
  <v-container> <ProjectView :item></ProjectView></v-container>
</template>

<script setup async>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const store = useRootStore()
const route = useRoute()
const { smAndUp } = useDisplay()
const { $i18n } = useNuxtApp()
const localePath = useLocalePath()
console.log("route.params.slug: ", route.params.slug)
const { data } = await useAsyncData("project", () =>
  queryContent(
    "project/" + $i18n.locale.value + "/" + route.params.slug
  ).findOne()
)
const item = data._value
</script>
