<template>
  <v-container> <NewsView :item="Publications" :loading /></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { resourceItem: Publications, loading } = useI18nResourceItem({
  resourceName: "publications",
  documentGql: $queries.publications.get,
  responseKey: "getPublication",
  appId: "iea",
})
</script>
