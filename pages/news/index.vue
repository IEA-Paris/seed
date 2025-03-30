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

onBeforeUnmount(() => {
  rootStore.resetState()
})
</script>
