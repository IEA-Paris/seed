<template>
  <div class="d-flex flex-wrap logo-container">
    <!--   TODO: constrain it by height (no more than calc(100vh - 64px)).
        The logos should size responsively (no hard coded values)
        Also replace with ImageContainer and pass the hover class animation to it -->
    <Swiper
      v-for="(swiperSet, index) in itemSet"
      autoplay
      loop
      slidesPerView="auto"
      class="logo-swiper"
      :key="
        index +
        props.items.length +
        ((props.items[0] && slugify(props.items[0].title)) || 'x') +
        'swiper'
      "
      :modules="[
        SwiperAutoplay,
        SwiperA11y,
        SwiperPagination,
        SwiperNavigation,
        SwiperKeyboard,
        SwiperGrid,
        SwiperFreeMode,
      ]"
    >
      <SwiperSlide
        v-for="(item, index) in swiperSet"
        :key="index + props.items.length"
        class="swiper-item cursor-pointer"
        :style="'background-color:' + (item.color || 'white') + ';'"
      >
        <a :href="item.url" target="_blank">
          <nuxt-img
            :src="item.picture"
            :title="item.name"
            class="d-flex logo-wrapper"
            fit="inside"
            format="webp"
            preload
          >
          </nuxt-img
        ></a>
      </SwiperSlide>
    </Swiper>

    <!-- <v-col cols="4" v-show="smAndUp">
            <v-sheet
              class="d-flex align-center justify-center"
              :to="localePath('activities/membership')"
              link
            >
              <ActionsSmallContainer
                :action="action"
              ></ActionsSmallContainer> </v-sheet></v-col -->
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name } = useDisplay()
const props = defineProps({
  items: Array,
})
const chunkArray = (arr, n) => {
  const size = Math.ceil(arr.length / n)
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size),
  )
}
onMounted(() => {
  console.log("name: ", name)

  console.log(
    "rows",
    [3, 5, 6, 4, 3, 3][
      ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
    ],
  )
})

const itemSet = computed(() =>
  chunkArray(
    props.items.sort((a, b) => 0.5 - Math.random()),
    [3, 5, 6, 4, 3, 3][
      ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
    ],
  ),
)
const swiperBreakpoints = ref({
  320: {
    slidesPerRow: "4",
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
  },
  480: {
    slidesPerRow: "4",
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
  },
  640: {
    slidesPerRow: "4",
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
  },
  960: {
    slidesPerRow: "4",
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
  },
  1280: {
    slidesPerRow: "4",
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
  },
  1920: {
    slidesPerRow: "4",
    slidesPerView: 3,
    slidesPerColumn: 3,
    slidesPerGroup: 3,
  },
})
</script>

<style scoped>
.logo-container {
  height: 100%;
  padding: 0 1em 0 0;
}
.swiper-wrapper {
}
.logo-wrapper {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  transition: filter 0.5s ease;

  &:hover {
    filter: none;
    -webkit-filter: grayscale(0);
  }
}

.logo-swiper {
  width: 100%;
  .swiper-slide {
    width: unset !important;
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 120px;
    height: 100px;
    padding: 0 10px;
  }
}

/* logo component */
/* .fill-image-item {

  overflow: hidden;
} */
</style>
