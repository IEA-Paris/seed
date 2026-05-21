<template>
  <v-container style="max-width: 1600px">
    <FellowshipsView :item="fellowship" :loading />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { resourceItem: fellowship, loading } = useI18nResourceItem({
  resourceName: "fellowship",
  documentGql: $queries.fellowships.get,
  responseKey: "getFellowship",
  appId: "iea",
})
</script>
