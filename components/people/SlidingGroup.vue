<template>
  <div class="d-flex align-center flex-row justify-space-between">
    <slot></slot>
    <div class="d-flex align-center justify-end">
      <!--  <div class="mr-8">{{ current + 1 }} / {{ items.length }}</div> -->
      <v-btn
        icon
        :disabled="current === 0"
        @click="swiper.slidePrev()"
        class="mr-2"
        flat
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        :disabled="current === items.length - 1"
        @click="swiper.slideNext()"
        flat
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
  <div class="people-carousel">
    {{ name }}

    {{
      [1, 2, 4, 5, 6, 6][
        ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name) + 1
      ]
    }}
    <Swiper
      ref="swiper"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="
        [1, 2, 4, 5, 6, 6][
          ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name) + 1
        ]
      "
      :loop="true"
      :effect="'creative'"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
    >
      <SwiperSlide v-for="slide in items" :key="slide">
        <PeopleSlidingItem :item="slide"></PeopleSlidingItem>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"

// Destructure only the keys you want to use
const { name } = useDisplay()
const swiper = ref(null)
const props = defineProps({
  items: [Object],
})
onMounted(() => {})
</script>

<style>
.people-carousel {
  overflow: hidden;
}

.inner {
  transition: transform 0.2s;
  white-space: nowrap;
}

.card {
  display: inline-flex;
}
</style>
