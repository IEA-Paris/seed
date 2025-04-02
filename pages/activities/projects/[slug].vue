<template>
  <v-container>
    <ProjectsView :item="project" :loading="loading"></ProjectsView
  ></v-container>
</template>

<script setup>
import GET_PROJECT from "~/graphql/queries/item/projects.gql"
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: project } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: GET_PROJECT,
    key: "getProject",
  })
})
loading.value = false
</script>
