<template>
  <v-sheet class="d-flex sliding-item">
    <!-- <MiscAtomsDateStamp
      :date="item.start"
      :loading="rootStore.loading"
      class="mr-6"
    ></MiscAtomsDateStamp> -->
    <div class="d-flex-flex-column">
      <MiscAtomsImageContainer
        cover
        :ratio="1 / 1"
        :src="item.url"
        name="news-slug"
        :link="item.caption"
        :loading="rootStore.loading"
      >
      </MiscAtomsImageContainer>
      <!-- <div
        class="mt-6 pl-0 text-h5 text-md-h4 font-weight-medium sliding-item-title"
      >
         {{ item.name }} 
      </div> -->
    </div>
  </v-sheet>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const props = defineProps({ item: { type: Object, required: true } })
</script>
<style lang="scss"></style>
