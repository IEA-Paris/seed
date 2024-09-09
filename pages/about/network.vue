<template>
  <div class="scroller">
    <section class="d-flex flex-column">
      <NavigationBreadcrumbs class="d-flex align-start"></NavigationBreadcrumbs>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <v-row no-gutters>
              <v-col cols="12" sm="3">
                <v-sheet
                  class="d-flex align-center justify-center"
                  height="400"
                >
                  <v-img
                    height="400"
                    fit="contain"
                    :aspectRatio="1 / 1"
                    src="/images/durandcecile.jpg"
                  ></v-img
                ></v-sheet>
              </v-col>
              <v-col cols="12" sm="9">
                <v-sheet
                  class="d-flex align-center justify-center"
                  height="250"
                  link
                >
                  <ContentDoc :path="network" />
                </v-sheet>
              </v-col>
            </v-row>
          </v-col> </v-row
      ></v-container>
    </section>

    <section>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <v-row no-gutters>
              <v-col cols="12" sm="6">
                <v-sheet
                  class="d-flex align-center justify-center"
                  :to="localePath('/support')"
                  link
                >
                  <ContentDoc :path="partners" /> </v-sheet
              ></v-col>
              <v-col cols="12" sm="6">
                <v-sheet class="d-flex align-center justify-center">
                  List of partners</v-sheet
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container fluid>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <v-row no-gutters>
              <v-col cols="12" sm="8">
                <v-sheet class="d-flex align-center justify-center">
                  List of sponsors</v-sheet
                >
                <MiscMoleculesLogoGallery
                  :items="logos"
                ></MiscMoleculesLogoGallery>
              </v-col>
              <v-col cols="4" v-show="smAndUp">
                <v-sheet
                  class="d-flex align-center justify-center"
                  :to="localePath('/support')"
                  link
                >
                  <ActionsSmallContainer
                    :action="action"
                    :ratio="1"
                  ></ActionsSmallContainer></v-sheet
              ></v-col> </v-row
          ></v-col> </v-row
      ></v-container>
    </section>

    <section>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12" md="10" lg="9" xl="8">
            <div class="d-flex align-center justify-center flex-column">
              <h3>{{ $t("our-members") }}</h3>
            </div>
            <MiscMoleculesLogoGallery
              :items="logos"
              class="logo-container"
            ></MiscMoleculesLogoGallery
          ></v-col>
        </v-row>
      </v-container>
    </section>
    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
definePageMeta({
  layout: "about",
  /*   documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  }, */
})
const { smAndUp, name, mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
//TODO .limit(1).find() > .findOne()
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)

const { data: logosData } = await useAsyncData("logos", () =>
  queryContent("/logos/" + locale.value)
    .only(["picture", "title", "url"])
    .find(),
)
const partners = "/pages/" + locale.value + "/partners"
const network = "/pages/" + locale.value + "/network"
const logos = !logosData || !logosData.value ? undefined : logosData.value
</script>

<style lang="scss" scoped></style>
