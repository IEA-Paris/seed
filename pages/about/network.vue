<template>
  <div class="scroller">
    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12" sm="10" md="6">
            <h2>
              <a class="text-white" href="#meet-our-network">
                {{ $t("meet-our-network") }}</a
              >
            </h2>
            <ContentDoc :path="network" />
          </v-col> </v-row
      ></v-container>
    </section>

    <section dark>
      <v-container>
        <v-row class="d-flex">
          <v-col cols="12">
            <h2>
              <a href="#our-members"> {{ $t("our-members") }}</a>
            </h2>
          </v-col>

          <v-col cols="12" sm="6">
            <MiscMoleculesLogoGallery
              :items="membersData"
            ></MiscMoleculesLogoGallery>
          </v-col>
          <v-col cols="12" sm="6"> <ContentDoc :path="members" /> </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12" sm="10" md="8">
            <h2 class="pl-2">
              <a class="text-white" href="#our-sponsors">
                {{ $t("our-sponsors") }}</a
              >
            </h2>

            <v-col cols="12" sm="8" v-if="sponsorsData && sponsorsData.length">
              <MiscMoleculesLogoGallery
                :items="sponsorsData"
              ></MiscMoleculesLogoGallery>
            </v-col>
            <v-col
              cols="12"
              v-else
              :sm="sponsorsData && sponsorsData.length ? 4 : 12"
            >
              <ContentDoc :path="sponsors" />
              <v-btn variant="outlined" tile>{{ $t("become-a-patron") }}</v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row class="d-flex">
          <v-col cols="12">
            <h2>
              <a href="#our-partners"> {{ $t("our-partners") }}</a>
            </h2>
          </v-col>

          <v-col cols="12" sm="6">
            <ContentDoc :path="partners" />
          </v-col>

          <v-col cols="12" sm="6">
            <MiscMoleculesLogoGallery
              :items="partnersData"
            ></MiscMoleculesLogoGallery>
          </v-col>
          <!--   <v-col cols="12" lg="3" v-show="lgAndUp">
                <v-sheet
                  class="d-flex align-center justify-center"
                  :to="localePath('/support')"
                  link
                >
                  <ActionsSmallContainer
                    :action="action"
                    :ratio="1"
                  ></ActionsSmallContainer></v-sheet></v-col> -->
        </v-row></v-container
      >
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
const { smAndUp, name, mdAndUp, lgAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
//TODO .limit(1).find() > .findOne()
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)

const { data: membersData } = await useAsyncData("members", () =>
  queryContent("/members/" + locale.value).find(),
)
const { data: partnersData } = await useAsyncData("partners", () =>
  queryContent("/partners/" + locale.value).find(),
)
const { data: sponsorsData } = await useAsyncData("sponsors", () =>
  queryContent("/sponsors/" + locale.value).find(),
)
const sponsors = "/pages/" + locale.value + "/network_sponsors"
const members = "/pages/" + locale.value + "/network_members"
const partners = "/pages/" + locale.value + "/network_partners"
const network = "/pages/" + locale.value + "/network"
</script>

<style lang="scss" scoped></style>
