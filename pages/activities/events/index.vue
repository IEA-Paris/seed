<template>
  <v-container style="max-width: 1200px">
    <ListOrganismsList type="events"></ListOrganismsList
  ></v-container>
</template>

<script setup>
const { $rootStore } = useNuxtApp()

onBeforeUnmount(() => {
  $rootStore.resetState()
})
</script>
