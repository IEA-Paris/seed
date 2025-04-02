<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="event" :loading="loading"></EventsView>
  </v-container>
</template>

<script setup>
import GET_EVENT from "~/graphql/queries/item/events.gql"

const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: event } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: GET_EVENT,
    key: "getEvent",
  })
})
loading.value = false
</script>
