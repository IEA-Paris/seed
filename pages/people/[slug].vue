<template>
  <v-container> <PeopleView :item="people" :loading></PeopleView></v-container>
</template>

<script setup>
import GET_PEOPLE from "~/graphql/queries/item/people.gql"

const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: people } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: GET_PEOPLE,
    key: "getPeople",
  })
})
loading.value = false
</script>
