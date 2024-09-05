<template>
  <v-container> <PeopleView :item="people"></PeopleView></v-container>
</template>

<script setup>
const { locale } = useI18n()
const route = useRoute()

const { data: people } = await useAsyncData(
  "people",
  async () =>
    await queryContent(
      "people/" + locale.value + "/" + route.params.slug,
    ).findOne(),
)
</script>
