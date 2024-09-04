<template>
  <v-sheet class="ma-6">
    <MiscAtomsImageContainer
      :ratio="1"
      :src="item.image"
      link="activities-events-slug"
      :slug="getSlugFromPath(item._path)"
    >
    </MiscAtomsImageContainer>
    <div class="mt-6 pl-0 text-h5 font-weight-medium">
      {{ item.name }}
    </div>
  </v-sheet>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath();
const props = defineProps({
  item: Object,
});
</script>
<style lang="scss"></style>
