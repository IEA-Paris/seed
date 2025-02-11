<template>
  <div class="d-flex flex-wrap logo-container">
    <!--   TODO: constrain it by height (no more than calc(100vh - 64px)).
        The logos should size responsively (no hard coded values)
        Also replace with ImageContainer and pass the hover class animation to it -->
    <a
      :href="item.url"
      target="_blank"
      v-for="item in items"
      :key="item.name"
      class="d-flex"
    >
      <nuxt-img
        :src="item.picture"
        :title="item.name"
        class="d-flex logo-wrapper"
        fit="inside"
        format="webp"
        preload
        loading="lazy"
        :width="
          [80, 100, 140, 200, 200, 200][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name)
          ]
        "
      >
      </nuxt-img
    ></a>

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
</script>

<style lang="scss" scoped>
.logo-container {
  max-height: calc(100vh - 64px);
}
.logo-wrapper {
  height: auto;
  margin: 1rem;
  object-fit: contain;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  transition: filter 0.5s ease;

  &:hover {
    filter: none;
    -webkit-filter: grayscale(0);
  }
}
/* logo component */
.fill-image-item {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
