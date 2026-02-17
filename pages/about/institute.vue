<template>
  <div class="scroller">
    <section class="d-flex py-4">
      <v-container>
        <v-row class="align-center justify-center flex-column">
          <v-col cols="12" md="10" xxl="8">
            <v-sheet class="d-flex pa-sm-8">
              <ContentDoc :path="presentation" /> </v-sheet
          ></v-col> </v-row
      ></v-container>
    </section>

    <section class="dark py-4">
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" xxl="8">
            <v-sheet class="pa-sm-8 bg-surface" color="transparent">
              <div v-if="mdAndUp" class="wrap-media">
                <v-carousel
                  cycle
                  hide-delimiters
                  show-arrows="hover"
                  height="300"
                  width="300"
                >
                  <v-carousel-item
                    v-for="i in 7"
                    :key="i"
                    cover
                    :src="'/images/location/' + i + '.jpg'"
                  />
                </v-carousel>
              </div>

              <h2 class="text-white">
                <a href="#building-bridges"> {{ $t("building") }}</a>
              </h2>

              <div class="text-body-1">
                <ContentDoc :path="location" />
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-4">
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" xxl="8">
            <v-row no-gutters>
              <v-col cols="12" md="8">
                <v-sheet class="d-flex align-center justify-center pa-12">
                  <ContentDoc :path="governance" />
                </v-sheet>
              </v-col>
              <v-col cols="4" v-if="mdAndUp">
                <div class="d-flex flex-column align-center justify-center">
                  <MiscMoleculesLogoGallery
                    :loading="pending"
                    :items="allAffiliations"
                    :row-count="6"
                  />
                </div> </v-col></v-row></v-col></v-row
      ></v-container>
    </section>

    <section class="dark py-4">
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" xxl="8">
            <v-sheet class="pa-sm-8 bg-surface" color="transparent">
              <h2 class="text-white">
                <a href="#an-outstanding-place-and-history">
                  {{ $t("an-outstanding-place-and-history") }}</a
                >
              </h2>
              <div v-if="mdAndUp" class="wrap-media">
                <v-carousel
                  cycle
                  hide-delimiters
                  show-arrows="hover"
                  height="300"
                  width="300"
                >
                  <v-carousel-item
                    v-for="i in 7"
                    :key="i"
                    :src="'/images/location/' + i + '.jpg'"
                    cover
                  />
                </v-carousel>
              </div>

              <div class="text-body-1">
                <ContentDoc :path="history" />
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale, locales } = useI18n()

const { pending, allAffiliations } = await useAffiliations()

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
<style scoped>
.dark h2 a {
  color: white;
}

.wrap-media {
  float: left;
  margin: 0 32px 16px 0;
  overflow: hidden;
  width: 300px;
}

@media (max-width: 960px) {
  .wrap-media {
    float: none;
    margin: 0 0 16px 0;
    width: 100%;
  }
}
</style>
