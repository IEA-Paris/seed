<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="news"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>
</template>

<script setup>
const { $rootStore } = useNuxtApp()

onBeforeUnmount(() => {
  $rootStore.resetState()
})
</script>
