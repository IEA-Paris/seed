<template>
  <v-container style="max-width: 1200px">
    <ListOrganismsList type="projects"></ListOrganismsList
  ></v-container>
</template>

<script setup>
const { $rootStore } = useNuxtApp()

onBeforeUnmount(() => {
  $rootStore.resetState()
})
</script>
