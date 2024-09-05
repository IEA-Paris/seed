<template>
  <section>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="4" v-if="smAndUp">
        <v-card class="d-flex align-center justify-center">
          <v-img aspect-ratio="1/1" src="/images/Paulius_Yamin.jpg"></v-img
        ></v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card class="d-flex align-center justify-center">
          <ContentDoc :path="scientificPolicy" />
        </v-card> </v-col
    ></v-row>
  </section>
  <section>
    <v-row>
      <v-col cols="12">
        <v-card class="d-flex align-center justify-center" link>
          <MiscAtomsSlidingCarousel type="people"
            ><div class="text-h2">
              {{ $t("scientific-advisory-board") }}
            </div></MiscAtomsSlidingCarousel
          >
        </v-card>
      </v-col>
    </v-row>
  </section>
  <section>
    <v-row>
      <v-col cols="4" v-if="smAndUp">
        <v-card
          class="d-flex align-center justify-center"
          height="400"
          :to="localePath('reports')"
          link
        >
          Link to annual reports</v-card
        >
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card class="d-flex align-center justify-center" height="400" link>
          Link to fellows (?)</v-card
        >
      </v-col>
      <v-col cols="4" v-if="smAndUp">
        <v-card class="d-flex align-center justify-center" height="400" link>
          Link to proceedings (?)</v-card
        >
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { fr } from "vuetify/locale"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
console.log(locale.value)
const { data: sab } = await useAsyncData(
  "sab-list",
  async () => await queryContent("/sab/" + locale.value).find(),
)
const scientificPolicy = "/pages/" + locale.value + "/scientific_policy"
definePageMeta({
  layout: "about",
  /*   documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  }, */
})
</script>
