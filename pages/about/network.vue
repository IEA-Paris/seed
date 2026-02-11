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
})
const { smAndUp, name, mdAndUp, lgAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
const { $queries } = useNuxtApp()

const variables = computed(() => ({
  options: {
    skip: 0,
    limit: 100,
    sort: "nameasc",
    filters: JSON.stringify({}),
  },
  appId: "iea",
  lang: locale.value,
}))

const { data: affiliationsData } = await useAsyncQuery(
  $queries.affiliations.list,
  variables,
)
console.log("affiliationsData.value: ", affiliationsData.value)

const mapItem = (item) => ({
  name: item.name,
  url: item.url,
  picture: item.image?.url,
  color: item.image?.backgroundColor || "#fff",
})

const membersData = computed(() =>
  (affiliationsData.value?.listAffiliations?.items || [])
    .filter((item) => item.category?.includes("MEMBER"))
    .map(mapItem),
)
const partnersData = computed(() =>
  (affiliationsData.value?.listAffiliations?.items || [])
    .filter((item) => item.category?.includes("PARTNER"))
    .map(mapItem),
)
const sponsorsData = computed(() =>
  (affiliationsData.value?.listAffiliations?.items || [])
    .filter((item) => item.category?.includes("SPONSOR"))
    .map(mapItem),
)

const sponsors = "/pages/" + locale.value + "/network_sponsors"
const members = "/pages/" + locale.value + "/network_members"
const partners = "/pages/" + locale.value + "/network_partners"
const network = "/pages/" + locale.value + "/network"
</script>

<style lang="scss" scoped></style>
