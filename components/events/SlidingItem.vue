<template>
  <v-sheet class="d-flex sliding-item">
    <MiscAtomsDateStamp
      :dateStart="item.start"
      :dateStop="item.stop"
      :loading="loading"
      class="mr-4"
    ></MiscAtomsDateStamp>
    <div class="d-flex-flex-column flex-grow-1">
      <MiscAtomsImageContainer
        cover
        :ratio="1"
        :src="item.image"
        link="activities-events-slug"
        :slug="getSlugFromPath(item._path)"
        :loading="loading"
      >
      </MiscAtomsImageContainer>
      <div
        class="mt-6 pl-0 text-h5 text-md-h4 font-weight-medium sliding-item-title"
      >
        {{ item.name }}
      </div>
    </div>
  </v-sheet>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
import { getSlugFromPath } from "~/composables/useUtils"

const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, required: true, default: false },
})
</script>
<style lang="scss"></style>
