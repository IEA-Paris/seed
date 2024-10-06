<template>
  <div class="scroller">
    <section class="d-flex flex-column">
      <NavigationBreadcrumbs class="d-flex align-start"></NavigationBreadcrumbs>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="8" xl="6" class="justify-center">
            <v-sheet class="d-flex align-center justify-center flex-row pa-12">
              <ContentDoc :path="presentation" />
            </v-sheet> </v-col></v-row
      ></v-container>
    </section>
    <section>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <v-row no-gutters>
              <v-col cols="4" v-if="mdAndUp">
                <v-sheet class="d-flex align-center justify-center" flat>
                  <v-carousel
                    cycle
                    hide-delimiters
                    show-arrows="hover"
                    aspect-ratio="1/1"
                  >
                    <v-carousel-item
                      v-for="i in 7"
                      :key="i"
                      :src="'/images/location/' + i + '.jpg'"
                      cover
                    ></v-carousel-item>
                  </v-carousel>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="8">
                <v-sheet class="d-flex align-center justify-center pa-12">
                  <ContentDoc :path="location" /> </v-sheet></v-col
            ></v-row> </v-col></v-row
      ></v-container>
    </section>
    <section>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <v-row no-gutters>
              <v-col cols="12" md="8">
                <v-sheet class="d-flex align-center justify-center pa-12">
                  <ContentDoc :path="governance" />
                </v-sheet>
              </v-col>
              <v-col cols="4" v-if="mdAndUp">
                <v-card
                  class="d-flex align-center justify-center pa-12"
                  :to="localePath('/about/network')"
                >
                  Network overview</v-card
                >
              </v-col></v-row
            ></v-col
          ></v-row
        ></v-container
      >
    </section>
    <section>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <v-row no-gutters>
              <v-col
                cols="4"
                v-if="mdAndUp"
                class="d-flex align-center justify-center"
              >
                <v-carousel cycle hide-delimiters show-arrows="hover">
                  <v-carousel-item
                    v-for="i in 7"
                    :key="i"
                    :src="'/images/location/' + i + '.jpg'"
                    cover
                  ></v-carousel-item>
                </v-carousel>
              </v-col>
              <v-col cols="12" md="8">
                <v-sheet class="d-flex align-center justify-center pa-12">
                  <ContentDoc :path="history" />
                </v-sheet>
              </v-col>
            </v-row>
          </v-col> </v-row
      ></v-container>
    </section>
    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale, locales } = useI18n()
const presentation = ref("/pages/" + locale.value + "/institute_description")
const location = ref(
  "/pages/" + locale.value + "/institute_location_description",
)
const governance = ref("/pages/" + locale.value + "/institute_governance")
const history = ref("/pages/" + locale.value + "/institute_history")
definePageMeta({
  layout: "about",
  /*   documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  }, */
})
</script>
