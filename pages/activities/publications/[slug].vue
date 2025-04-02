<template>
  <v-container>
    <PublicationsView :item="publication" :loading="loading"></PublicationsView
  ></v-container>
</template>

<script setup>
import GET_PUBLICATION from "~/graphql/queries/item/publications.gql"

const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: publication } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: GET_PUBLICATION,
    key: "getPublication",
  })
})
loading.value = false
</script>
