<template>
  <v-row class="d-flex align-center justify-center" no-gutters>
    <v-col cols="12" lg="10" class="justify-center">
      <div class="d-flex align-center pb-8 justify-space-between" no-gutters>
        <slot></slot>

        <v-spacer></v-spacer>
        <!--     <div class="text-h6 font-weight-black d-flex align-center mx-6">
              {{ model + 1 }}/{{ items.length || 0 }}
            </div> -->
        <div class="d-flex flex-row">
          <v-btn-toggle>
            <v-btn
              tile
              variant="outlined"
              flat
              :disabled="model === 0"
              icon="mdi-chevron-left"
              class="pseudo-carousel-prev"
            ></v-btn>
            <v-btn
              tile
              variant="outlined"
              :disabled="model === items.length - 1"
              flat
              icon="mdi-chevron-right"
              @click="model++"
              class="pseudo-carousel-next"
            ></v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <Swiper
        style="overflow-x: visible"
        effect="slide"
        :modules="[
          SwiperAutoplay,
          SwiperA11y,
          SwiperPagination,
          SwiperNavigation,
          SwiperKeyboard,
        ]"
        :breakpoints="swiperBreakpoints"
        @swiperprogress="onProgress"
        @swiperslidechange="onSlideChange"
        :navigation="{
          nextEl: '.pseudo-carousel-next',
          prevEl: '.pseudo-carousel-prev',
        }"
        ref="swiper"
      >
        <template v-if="loading" v-for="(item, index) in items">
          LOADING
        </template>
        <SwiperSlide
          v-else
          v-for="(item, index) in items"
          :key="index + type"
          :style="'width: ' + computedWidth + 'px'"
          :width="computedWidth"
        >
          <component
            :key="index + type"
            :is="capitalize(type) + 'SlidingItem'"
            :index="index"
            :item="item"
            :width="computedWidth"
            :loading="loading"
          />
        </SwiperSlide>
      </Swiper>
      <div class="d-flex justify-end mt-12">
        <v-btn class="ml-auto" variant="flat">{{
          $t(type + ".see-more")
        }}</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
/*
TODO: make it similar to radcliffe :
- offset out of the layout before scrolling.
- Meaningful behavior when clicking on the arrrows
- Add a slide-in from right animation when the items are entering viewport
*/
import { capitalize } from "~/composables/useUtils"
import { useDisplay } from "vuetify"
const { locale } = useI18n()
const { name, mdAndUp } = useDisplay()
const model = ref(0)
const swiperBreakpoints = ref({
  320: {
    slidesPerView: "auto",
    spaceBetween: 10,
  },
  480: {
    slidesPerView: "auto",
    spaceBetween: 20,
  },
  640: {
    slidesPerView: "auto",
    spaceBetween: 20,
  },
  960: {
    slidesPerView: "auto",
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: "auto",
    spaceBetween: 20,
  },
  1920: {
    slidesPerView: "auto",
    spaceBetween: 20,
  },
})
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
})

/* const { data, error } = await useAsyncData(props.type, () =>
)
console.log("error: ", error) */
const spaceBetween = 10
const onProgress = (e) => {
  console.log("e: progress ", e)
  const [swiper, progress] = e.detail
  console.log(progress)
}

const onSlideChange = (e) => {
  console.log("slide changed", e)
}
const computedWidth = computed(() => {
  let modifier = 1
  switch (props.type) {
    case "events":
      modifier = 1.3
      break
    case "people":
      break
    case "image":
      break
    default:
      break
  }
  return (
    [200, 250, 300, 330, 400, 400][
      ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
    ] * modifier
  )
})

onMounted(() => {
  console.log("Resolved Item", capitalize(props.type) + "SlidingItem")
})
</script>
<style scoped>
.swiper-slide {
  width: auto;
}
</style>
