<template>
  <v-container style="max-width: 1200px">
    <ListOrganismsList
      type="events"
      :pathPrefix="localePath('/activities/events/')"
    ></ListOrganismsList
  ></v-container>
</template>

<script setup>
const localePath = useLocalePath()
</script>
