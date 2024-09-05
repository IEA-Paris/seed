<template>
  <v-container> <PeopleView :item="value"></PeopleView></v-container>
</template>

<script lang="ts" setup>
const { $i18n } = useNuxtApp()
const route = useRoute()
const localePath = useLocalePath()

const { data } = await useAsyncData(
  "people",
  async () =>
    await queryContent(
      "people/" + $i18n.locale.value + "/" + route.params.slug,
    ).findOne(),
)

const value = data._rawValue
</script>
