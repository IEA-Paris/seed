<template>
  <v-container> <NewsView :item="news" :loading /></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { resourceItem: news, loading } = useI18nResourceItem({
  resourceName: "news",
  documentGql: $queries.news.get,
  responseKey: "getNews",
  appId: "iea",
})
</script>
