<template>
  <div>
    <div class="d-flex align-center">
      <div
        class="d-flex flex-column justify-space-between left-panel align-end"
      >
        <!--  <v-btn
          text
          variant="flat"
          right
          size="large"
          append-icon="mdi-chevron-up"
          style="text-transform: none"
          transition="slide-y-transition"
          @click="selected = selected >= 1 ? selected - 1 : featured.length - 1"
          v-motion-slide-visible-once-bottom
        >
          {{
            featured[selected >= 1 ? selected - 1 : featured.length - 1].title
          }}
        </v-btn> -->
        <v-sheet class="d-flex justify-center align-end pa-6 flex-column">
          <div class="text-h2 text-right mb-6" v-motion-fade>
            {{ featured[selected].title }}
          </div>
          <div class="carousel-subtitle" v-motion-fade>
            {{ featured[selected].description }}
            <br />
            <v-btn color="default" class="mt-6">Click here</v-btn>
          </div>
        </v-sheet>
        <!--  <v-btn
          size="large"
          variant="flat"
          right
          append-icon="mdi-chevron-down"
          style="text-transform: none"
          transition="slide-y-transition"
          @click="selected = selected < featured.length - 1 ? selected + 1 : 0"
          v-motion-slide-visible-once-bottom
        >
          {{
            featured[selected < featured.length - 1 ? selected + 1 : 0].title
          }}
        </v-btn> -->
      </div>
      <div class="right-panel d-flex align-center">
        <v-carousel
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
            :src="item.picture"
            :alt="item.title"
          ></v-carousel-item>
          <template v-slot:next="{ props }">
            <v-btn icon @click="props.onClick">
              <v-icon>mdi-chevron-left</v-icon></v-btn
            >
          </template>
        </v-carousel>
      </div>
    </div>
    <div class="d-flex justify-center mt-n12">
      <v-btn color="default" icon @click="$vuetify.goto('#about')">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script setup>
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
  width: 61.8%;
  height: calc(100vh - 64px);
}
.left-panel {
  width: 38.2%;
  height: 50vh;
}
.carousel-title {
  font-size: 3.5rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  line-height: 4.5rem;
  text-align: right;
}
.carousel-subtitle {
  font-size: 2rem;
  font-weight: 400;
  font-family: "Roboto", serif;
  line-height: 3rem;
  text-align: right;
}
.v-carousel__controls {
  color: white;
}
</style>
