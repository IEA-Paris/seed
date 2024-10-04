<template>
  <v-container>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="10" class="justify-center">
        <v-container class="mb-6">
          <div class="d-flex align-center" no-gutters>
            <div :class="mdAndUp ? 'text-h2' : 'text-h4'">
              <slot></slot>
            </div>
            <v-spacer></v-spacer>
            <!--     <div class="text-h6 font-weight-black d-flex align-center mx-6">
              {{ model + 1 }}/{{ rootStore[props.type].list.items.length || 0 }}
            </div> -->
            <div class="d-flex flex-row">
              <v-btn-toggle>
                <v-btn
                  :size="mdAndUp ? 'large' : 'regular'"
                  flat
                  :disabled="model === 0"
                  icon="mdi-chevron-left"
                  class="pseudo-carousel-prev"
                ></v-btn>
                <v-btn
                  :size="mdAndUp ? 'large' : 'medium'"
                  :disabled="
                    model === rootStore[props.type].list.items.length - 1
                  "
                  flat
                  icon="mdi-chevron-right"
                  @click="model++"
                  class="pseudo-carousel-next"
                ></v-btn>
              </v-btn-toggle>
            </div>
          </div>
        </v-container>
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
          <template
            v-if="rootStore.loading || rootStore[props.type].loading"
            v-for="(item, index) in rootStore[props.type].list.items"
          >
            LOADING
          </template>
          <SwiperSlide
            v-else
            v-for="(item, index) in rootStore[props.type].list.items"
            :key="index + props.type"
          >
            <component
              :key="index + props.type"
              :is="capitalize(props.type) + 'SlidingItem'"
              :index="index"
              :item="item"
              :width="computedWidth"
              lazy
            />
          </SwiperSlide>
        </Swiper>
        <div class="d-flex justify-end">
          <v-btn class="ml-auto" variant="flat">{{ $t("see-more") }}</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
import { useRootStore } from "~/store/root"
const { locale } = useI18n()
const { name, mdAndUp } = useDisplay()
const rootStore = useRootStore()
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
})
try {
  await rootStore.update(props.type, locale.value)
} catch (error) {
  console.log("error: ", error)
}
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
  console.log(
    "width",
    ["200", "250", "300", "330", "400", "400"][
      ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
    ],
  )
  return ["200", "250", "300", "330", "400", "400"][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]
})
</script>
<style scoped>
.swiper-slide {
  width: auto;
}
</style>
