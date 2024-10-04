<template>
  <v-sheet class="pa-2">
    <MiscAtomsImageContainer
      cover
      :loading="rootStore.people.loading"
      :src="item.image"
      :ratio="1 / 1"
      :link="item.firstname + ' ' + item.lastname"
      name="people-slug"
      :slug="getSlugFromPath(item._path)"
    />
    <div class="mt-3 pl-0 text-left text-h5 font-weight-medium">
      {{ item.firstname + " " + item.lastname }}
    </div>
    <!--     <v-card-text
      class="text-subtitle text-left text-disabled"
      style="max-width: 240px"
    >
      {{ item.specialty }}
    </v-card-text> -->
  </v-sheet>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const localePath = useLocalePath()
const props = defineProps({
  item: Object,
})
</script>
<style lang="scss"></style>
