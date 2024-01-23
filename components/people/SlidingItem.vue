<template>
  <v-card flat class="pa-6" :to="localePath('/people/' + item.slug)">
    <MiscAtomsOptimizedImage
      :ratio="1 / 1"
      :src="item.picture"
      cover
      width="320px"
    >
    </MiscAtomsOptimizedImage>
    <v-card-title class="mt-3 pl-0 text-left">{{
      item.firstname + " " + item.lastname
    }}</v-card-title>
    <div class="text-subtitle text-left text-disabled">
      {{ item.specialty }}
    </div>
  </v-card>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: Object,
})
</script>
<style lang="scss"></style>
