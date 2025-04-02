<template>
  <v-container>
    <FellowshipsView :item="fellowship" :loading="loading" />
  </v-container>
</template>

<script setup>
import GET_FELLOWSHIP from "~/graphql/queries/item/fellowships.gql"

const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: fellowship } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: GET_FELLOWSHIP,
    key: "getFellowship",
  })
})
loading.value = false
</script>
