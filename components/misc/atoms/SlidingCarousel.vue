<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-container>
          <div class="mb-md-12 d-flex align-center" no-gutters>
            <div :class="mdAndUp ? 'text-h2' : 'text-h4'">
              <slot></slot>
            </div>
            <v-spacer></v-spacer>
            <div class="text-h6 font-weight-black d-flex align-center mx-6">
              {{ model + 1 }}/{{ rootStore[props.type].list.items.length || 0 }}
            </div>
            <div class="d-flex flex-row">
              <v-btn-toggle>
                <v-btn :size="mdAndUp ? 'large' : 'regular'" flat :disabled="model === 0" icon="mdi-chevron-left"
                  @click="model--" class="pseudo-carousel-prev"></v-btn>
                <v-btn :size="mdAndUp ? 'large' : 'medium'" :disabled="model === rootStore[props.type].list.items.length - 1
              " flat icon="mdi-chevron-right" @click="model++" class="pseudo-carousel-next"></v-btn>
              </v-btn-toggle>

            </div>
          </div>
        </v-container>

   

        <Swiper :loop="true" :centered-slides="true"
          :slides-per-view="[1, 1, 3, 4, 6, 8][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name)]"
          :breakpoints="swiperBreakpoints" :modules="[SwiperAutoplay, SwiperA11y, SwiperPagination, SwiperNavigation]"
          @swiperprogress="onProgress" @swiperslidechange="onSlideChange" :navigation="{
              nextEl: '.pseudo-carousel-next',
              prevEl: '.pseudo-carousel-prev',
            }" >
                 <template v-if="rootStore.loading || rootStore[props.type].loading"  v-for="(item, index) in rootStore[props.type].list.items">
          LOADING
        </template>
          <SwiperSlide v-else v-for="(item, index) in rootStore[props.type].list.items" :key="index + props.type">
            <component :key="index + props.type" :is="capitalize(props.type) + 'SlidingItem'" :index="index"
              :item="item" :width="computedWidth" lazy />
          </SwiperSlide>
        </Swiper>
        <v-btn class="ml-auto" variant="label" :to="localePath(path)">{{ $t('see-more') }}</v-btn>
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
    slidesPerView: 2,
    spaceBetween: 20
  },
  480: {
    slidesPerView: 3,
    spaceBetween: 30
  },
  640: {
    slidesPerView: 4,
    spaceBetween: 40
  },
  960: {
    slidesPerView: 4,
    spaceBetween: 40
  },
  1280: {
    slidesPerView: 5,
    spaceBetween: 40
  },
  1920: {
    slidesPerView: 6,
    spaceBetween: 40
  }
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
  console.log('e: progress ', e);
  const [swiper, progress] = e.detail
  console.log(progress)
}

const onSlideChange = (e) => {
  console.log("slide changed", e)
}
const computedWidth = computed(() => {
  console.log('width', ["200", "250", "300", "330", "400", "400"][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]);
  return ["200", "250", "300", "330", "400", "400"][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]
})
</script>
