<template>
  <div class="d-flex">
    <div class="d-flex flex-column justify-space-between right-panel">
      <div class="text-right pt-6 mr-12" transition="slide-y-transition">
        {{ featured[selected >= 1 ? selected - 1 : featured.length - 1].title }}
      </div>
      <v-fade-transition>
        <v-sheet class="d-flex justify-center align-end pa-6">
          <div>
            <div transition="fade-transition" class="carousel-title mb-6">
              {{ featured[selected].title }}
            </div>
            <div transition="fade-transition" class="carousel-subtitle">
              {{ featured[selected].description }}
              <br />
              <v-btn color="default" class="mt-6">Click here</v-btn>
            </div>
          </div>
          <v-radio-group v-model="selected" column class="ml-6">
            <v-radio
              v-for="(item, index) in featured"
              :key="index"
              :value="selected"
            >
            </v-radio>
          </v-radio-group> </v-sheet
      ></v-fade-transition>
      <div class="text-right pb-6 mr-12" transition="slide-y-transition">
        <br />
        {{ featured[selected < featured.length - 1 ? selected + 1 : 0].title }}
      </div>
    </div>
    <div class="left-panel">
      <v-carousel class="h-100" v-model="selected" direction="vertical">
        <template v-slot:prev="{ props }">
          <v-btn icon @click="props.onClick">
            <v-icon>mdi-chevron-top</v-icon></v-btn
          >
        </template>
        <v-carousel-item
          v-for="(item, index) in featured"
          :key="index"
          cover
          :src="item.picture"
          :alt="item.title"
        ></v-carousel-item>
        <template v-slot:prev="{ props }">
          <v-btn icon @click="props.onClick">
            <v-icon>mdi-chevron-down</v-icon></v-btn
          >
        </template>
      </v-carousel>
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
.left-panel {
  width: 61.8%;
  height: calc(100vh - 64px);
  background-color: #000;
}
.right-panel {
  width: 38.2%;
  height: calc(100vh - 64px);
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
</style>
