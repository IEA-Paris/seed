<template>
  <section>
    <v-container>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" sm="6">
          <v-card flat>
            <!--         <v-img
              :height="400"
              aspect-ratio="1/1"
              src="/images/lahlou_saadi.jpg"
            ></v-img
            > --></v-card
          >
        </v-col>

        <v-col cols="12" sm="6">
          <v-sheet>
            <!--             <HomeMoto></HomeMoto> -->
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row justify-center align-center>
        <v-col cols="12" class="justify-center">
          <v-sheet class="d-flex align-center justify-center flex-row pa-12">
            <!-- <ContentDoc
              :path="
                '/pages/' + ($i18n.locale || 'en') + '/institute_description'
              "
            /> -->
          </v-sheet>
        </v-col></v-row
      ></v-container
    >
  </section>
  <section>
    <v-container>
      <v-row justify-center align-center>
        <v-col cols="4">
          <v-sheet class="d-flex align-center justify-center" flat>
            <!--        <v-carousel
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
              ></v-carousel-item> </v-carousel
          > --></v-sheet
          >
        </v-col>
        <v-col cols="8">
          <v-sheet class="d-flex align-center justify-center pa-12">
            <!-- <ContentDoc
              :path="
                '/pages/' +
                ($i18n.locale || 'en') +
                '/institute_location_description' 
              "
            />-->
          </v-sheet>
        </v-col></v-row
      ></v-container
    >
  </section>
  <section>
    <v-container>
      <v-row justify-center align-center>
        <v-col cols="8">
          <v-sheet class="d-flex align-center justify-center pa-12">
            <!-- <ContentDoc
              :path="
                '/pages/' + ($i18n.locale || 'en') + '/institute_governance'
              "
            /> -->
          </v-sheet>
        </v-col>
        <v-col cols="4">
          <v-card
            class="d-flex align-center justify-center pa-12"
            :to="localePath('/about/network')"
          >
            Network overview</v-card
          >
        </v-col></v-row
      ></v-container
    >
  </section>
  <section>
    <v-container>
      <v-row class="d-flex align-center justify-center">
        <v-col cols="4">
          <v-sheet class="d-flex align-center justify-center" flat>
            <!--   <v-carousel cycle hide-delimiters show-arrows="hover">
              <v-carousel-item
                v-for="i in 7"
                :key="i"
                :src="'/images/location/' + i + '.jpg'"
                cover
              ></v-carousel-item>  </v-carousel
          >--></v-sheet
          >
        </v-col>
        <v-col cols="8">
          <v-sheet class="d-flex align-center justify-center pa-12">
            <!-- <ContentDoc
              :path="'/pages/' + ($i18n.locale || 'en') + '/institute_history'"
            /> -->
          </v-sheet>
        </v-col>
      </v-row></v-container
    >
  </section>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const contentQuery = queryContent("articles", "nuxt3")
definePageMeta({
  layout: "about",
  documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  },
})
</script>
