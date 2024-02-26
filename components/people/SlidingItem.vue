<template>
  <v-card
    flat
    class="pa-6"
    :to="localePath('/people/' + item.slug)"
    v-motion-fade-visible
  >
    <v-img :aspectRatio="1 / 1" :src="item.picture" cover width="240px">
    </v-img>
    <v-card-title class="mt-3 pl-0 text-left">{{
      item.firstname + " " + item.lastname
    }}</v-card-title>
    <v-card-text
      class="text-subtitle text-left text-disabled"
      style="max-width: 240px"
    >
      {{ item.specialty }}
    </v-card-text>
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
