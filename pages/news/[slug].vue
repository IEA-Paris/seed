<template>
  <v-container> <NewsView :item="news" :loading></NewsView></v-container>
</template>

<script setup>
import GET_NEWS from "~/graphql/queries/item/news.gql"

const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: news } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: GET_NEWS,
    key: "getNews",
  })
})
loading.value = false
</script>
