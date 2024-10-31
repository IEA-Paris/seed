<template>
  <v-sheet class="d-flex sliding-item">
    <MiscAtomsDateStamp :date="item.start" class="mr-6" :loading="false"></MiscAtomsDateStamp>
    <div class="d-flex-flex-column">
      <MiscAtomsImageContainer cover :ratio="1" :src="item.image" link="activities-events-slug"
        :slug="getSlugFromPath(item._path)" :loading="false">
      </MiscAtomsImageContainer>
      <div class="mt-6 pl-0 text-h5 text-md-h4 font-weight-medium sliding-item-title">
        {{ item.name }}
      </div>
    </div>
  </v-sheet>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const props = defineProps({
  item: Object,
})
</script>
<style lang="scss"></style>
