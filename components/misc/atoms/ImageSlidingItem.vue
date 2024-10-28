<template>
  <v-sheet class="pa-2 sliding-item">
    <MiscAtomsImageContainer
      cover
      :loading="loading"
      :src="item.url"
      :ratio="1 / 1"
      :name="caption"
    />
    <div
      class="mt-3 pl-0 text-left text-h5 text-md-h4 font-weight-medium sliding-item-title"
    >
      {{ item.caption }}
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

const localePath = useLocalePath()
const props = defineProps({
  item: Object,
  loading: Boolean
})
</script>
<style lang="scss"></style>
