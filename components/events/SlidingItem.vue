<template>
  <v-sheet class="ma-6">
    <MiscAtomsImageContainer
      :ratio="1 / 1"
      :src="item.image"
      link="activities-events-slug"
      :slug="item.name"
    >
    </MiscAtomsImageContainer>
    <div class="mt-3 pl-0 text-h6">
      {{ item.name }}
    </div>
  </v-sheet>
</template>
<script setup>
import slugify from "~/assets/utils/slugify"

// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: Object,
})
</script>
<style lang="scss"></style>
