<template>
  <v-sheet class="d-flex sliding-item">
    <MiscAtomsDateStamp
      :date="item.start"
      :loading="loading"
      class="mr-6"
    ></MiscAtomsDateStamp>
    <div class="d-flex-flex-column">
      <MiscAtomsImageContainer
        cover
        :ratio="1"
        :src="item.image"
        link="people-slug"
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

const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, required: true },
})
</script>
<style lang="scss"></style>
