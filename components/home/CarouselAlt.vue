<template>
  <v-container fluid class="pa-0 d-flex align-md-center">
    <v-row class="justify-md-center" no-gutters>
      <v-col cols="12">
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
                  :alt="item.name"
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
            class="d-flex flex-column justify-center cursor-pointer"
            :class="mdAndUp ? 'left-panel' : 'bottom-panel'"
            v-ripple
            @click="
              router.push(
                localePath(
                  '/news/' + getSlugFromPath(featured[selected]._path),
                ),
              )
            "
          >
            <div
              class="text-h4 text-sm-h3 text-md-h4 text-lg-h3 mb-6 carousel-title"
              v-motion-fade
            >
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
import { getSlugFromPath } from "~/composables/useUtils"
const { mdAndUp } = useDisplay()
const router = useRouter()

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
  width: 38.2vw;
  background-color: white;
}
.left-panel {
  width: 61.8vw;
  background-color: white;
  z-index: 5;
  height: 38.2vw;
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
    background-color: white;
    position: relative;
    z-index: 5;
  }
}
.carousel-title {
  max-width: min(60ch, 650px);
  line-height: 1.2em;
}
.carousel-subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  max-width: 60ch;
  line-height: 2rem;
}
.v-carousel__controls {
  color: white;
}
</style>
