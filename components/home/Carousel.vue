<template>
  <v-container fluid class="pa-0 d-flex align-md-center">
    <v-row class="justify-md-center" no-gutters>
      <v-col cols="12" lg="10" xl="8">
        <div :class="{ 'd-flex ': mdAndUp }" class="align-center">
          <div :class="{ 'right-panel': mdAndUp }" class="d-flex align-center">
            <v-responsive aspect-ratio="1" class="carousel-container">
              <v-carousel
                cover
                v-model="selected"
                :show-arrows="false"
                :cycle="true"
                background-color="transparent"
                delimiter-icon="mdi-square"
                height="100%"
              >
                <template v-slot:prev="{ props }">
                  <v-btn icon @click="props.onClick">
                    <v-icon>mdi-chevron-right</v-icon></v-btn
                  >
                </template>
                <v-carousel-item
                  v-for="(item, index) in featured"
                  :key="index"
                  cover
                  :src="item.image"
                  :alt="item.title"
                ></v-carousel-item>
                <template v-slot:next="{ props }">
                  <v-btn icon @click="props.onClick">
                    <v-icon>mdi-chevron-left</v-icon></v-btn
                  >
                </template>
              </v-carousel></v-responsive
            >
          </div>
          <div
            class="d-flex flex-column"
            :class="mdAndUp ? 'left-panel' : 'bottom-panel'"
            v-ripple
            @click="
              localePath('/news/' + getSlugFromPath(featured[selected]._path))
            "
          >
            <div class="text-h4 text-sm-h3 text-md-h4 mb-6" v-motion-fade>
              <v-chip class="mb-4">{{
                $t("news.categories." + featured[selected].category)
              }}</v-chip>
              <br />
              {{ featured[selected].title }}
            </div>

            <div class="carousel-subtitle" v-motion-fade>
              {{ featured[selected].description }}
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useDisplay } from "vuetify"
const { mdAndUp } = useDisplay()

const selected = ref(0)
const props = defineProps({
  featured: {
    type: Array,
    required: true,
  },
})
</script>
<style scoped>
.bottom-panel {
  margin: -24vh 0 0 0;
  background-color: white;
  z-index: 5;
  padding: 1em 2em;
  position: relative;
  border: 1px solid black;
}
.right-panel {
  width: min(61.8vw, 830px);
  background-color: white;
}
.left-panel {
  max-width: 800px;
  background-color: white;
  margin-left: -24vw;
  z-index: 2;
  padding: 2em;
  border: 1px solid black;
}
.carousel-container {
  max-height: calc(100vh - 64px);
  max-width: 1200px;
}
@media screen and (min-width: 600px) {
  .carousel-container {
  }
  .bottom-panel {
    margin: -38vh 10vw 0 10vw;
  }
}
.carousel-title {
  font-size: 3rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  line-height: 4.5rem;
  text-align: right;
}
.carousel-subtitle {
  font-size: 1.4rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  line-height: 2.2rem;
}
.v-carousel__controls {
  color: white;
}
</style>
