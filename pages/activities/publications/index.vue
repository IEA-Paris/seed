<template>
  <v-container style="max-width: 1200px">
    <ListOrganismsList
      type="publications"
      pathPrefix="activities-publications-slug"
    ></ListOrganismsList
  ></v-container>
</template>

<script setup>
const { $rootStore } = useNuxtApp()

onBeforeUnmount(() => {})
</script>
