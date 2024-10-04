<template>
  <v-container fluid class="pa-0 d-flex align-center">
    <v-row class="justify-center" no-gutters>
      <v-col cols="12" md="10" lg="8" xl="7">
        <div class="d-flex align-center">
          <div class="right-panel d-flex align-center" v-if="mdAndUp">
            <v-carousel
              cover
              v-model="selected"
              :show-arrows="false"
              :cycle="true"
              background-color="transparent"
              delimiter-icon="mdi-square"
            >
              <template v-slot:prev="{ props }">
                <v-btn icon @click="props.onClick">
                  <v-icon>mdi-chevron-up</v-icon></v-btn
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
            </v-carousel>
          </div>
          <div class="d-flex flex-column" :class="{ 'left-panel': mdAndUp }">
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
<style>
.right-panel {
  width: 61.8vw;
  background-color: white;
}
.left-panel {
  width: 61.8%;
  background-color: white;
  margin-left: -30vw;
  z-index: 2;
  padding: 2em;
}
.carousel-title {
  font-size: 3rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  line-height: 4.5rem;
  text-align: right;
}
.carousel-subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  line-height: 2rem;
}
.v-carousel__controls {
  color: white;
}
</style>
