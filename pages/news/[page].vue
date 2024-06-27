<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="news"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const route = useRoute()
onMounted(async () => {
  await rootStore.updatePage({ page: +route.params.page, type: "news" })
})
</script>
