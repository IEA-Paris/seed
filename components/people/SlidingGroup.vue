<template>
  <v-container class="">
    <div class="d-flex align-center flex-row">
      <h1>{{ $t("discover-our-0-fellows", ["2023-2024"]) }}</h1>
      <v-spacer></v-spacer>
      <div class="d-flex align-center justify-end">
        <!--  <div class="mr-8">{{ current + 1 }} / {{ items.length }}</div> -->
        <v-btn
          icon
          :disabled="current === 0"
          @click="myCarousel.prev()"
          class="mr-2"
          flat
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          :disabled="current === items.length - 1"
          @click="myCarousel.next()"
          flat
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </div>

    <Carousel
      class="people-carousel"
      ref="myCarousel"
      :items-to-show="getItemsPerLine"
      :wrap-around="true"
    >
      <Slide v-for="(item, index) in items" :key="index">
        <PeopleSlidingItem :item="item"></PeopleSlidingItem>
      </Slide>
    </Carousel>

    <div class="d-flex align-center justify-end flex-row mt-6">
      <v-btn
        flat
        prepend-icon="mdi-arrow-right"
        style="text-transform: none"
        :to="fellowsLink"
        >See all 2023-2024 Fellows</v-btn
      >
    </div>
  </v-container>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css"
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel"
const myCarousel = ref(null)
import { useDisplay } from "vuetify"
const { xs, sm, md, lgAndUp, name } = useDisplay()
const localePath = useLocalePath()
const { $i18n } = useNuxtApp()
const props = defineProps({
  items: [Object],
})
const getItemsPerLine = computed(() => {
  switch (name.value) {
    case "xs":
      return 1
    case "sm":
      return 1.5
    case "md":
      return 2.5
    case "lg":
      return 3.5
    case "xl":
      return 4.5
    case "xxl":
      return 4.5
  }

  return undefined
})
const current = ref(null)
const fellowsLink = ref(localePath('/people?categories=["fellows"]'))
</script>

<style lang="scss">
.people-carousel .carousel__viewport {
  overflow: visible !important;
}
</style>
