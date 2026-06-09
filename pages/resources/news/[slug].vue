<template>
  <v-container> <NewsView :item="news" :loading /></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { resourceItem: news, loading } = useI18nResourceItem({
  resourceName: "news",
  documentGql: $queries.publications.get,
  responseKey: "getPublication",
  appId: "iea",
})
</script>
