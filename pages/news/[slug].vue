<template>
  <v-container> <NewsView :item="news" :loading></NewsView></v-container>
</template>

<script setup>
import { useContentItem } from "~/composables/useContentItem"
import GET_NEWS from "~/graphql/queries/item/news.gql"

const { data: news, loading } = useContentItem(GET_NEWS, "getNews", "news")
</script>
