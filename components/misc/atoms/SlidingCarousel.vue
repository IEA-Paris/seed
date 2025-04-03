<template>
  <v-row class="mb-9">
    <v-col class="justify-center">
      <slot></slot>
    </v-col>
    <v-col cols="3">
      <!--     <div class="text-h6 font-weight-black d-flex align-center mx-6">
              {{ model + 1 }}/{{ items.length || 0 }}
            </div> -->
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
    </v-col>
  </v-row>

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
    <template v-if="loading" v-for="(item, index) in items"> LOADING </template>
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
        :dark="dark"
      />
    </SwiperSlide>
  </Swiper>
  <div class="d-flex justify-end mt-12" v-if="more">
    <v-btn class="ml-auto" variant="flat">{{ $t(type + ".see-more") }}</v-btn>
  </div>
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
    spaceBetween: 15,
  },
  480: {
    slidesPerView: "auto",
    spaceBetween: 22,
  },
  640: {
    slidesPerView: "auto",
    spaceBetween: 25,
  },
  960: {
    slidesPerView: "auto",
    spaceBetween: 28,
  },
  1280: {
    slidesPerView: "auto",
    spaceBetween: 31,
  },
  1920: {
    slidesPerView: "auto",
    spaceBetween: 35,
  },
})
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
  more: { type: Boolean, default: true },
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
      modifier = 1.1
      break
    case "people":
      break
    case "image":
      break
    default:
      break
  }
  return (
    [250, 300, 350, 380, 430, 460][
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
