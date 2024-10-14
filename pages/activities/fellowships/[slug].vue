<template>
  <section style="background-color: white">
    <FellowshipView :item="data" />
  </section>
</template>

<script setup async>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const route = useRoute()
const { smAndUp } = useDisplay()
const { locale } = useI18n()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  "fellowship",
  async () =>
    await queryContent(
      "fellowship/" + locale.value + "/" + route.params.slug,
    ).findOne(),
)
console.log("data: ", data.value)
rootStore.setLoading(false, "fellowship")
</script>
