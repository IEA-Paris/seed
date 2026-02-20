<template>
  <div class="scroller">
    <section class="py-4">
      <v-row class="d-flex align-center justify-center flex-column px-4">
        <v-col cols="12" md="8">
          <v-sheet class="bg-surface" color="transparent">
            <div v-if="smAndUp" class="wrap-media">
              <v-img src="/images/Paulius_Yamin.jpg" aspect-ratio="1" cover />
            </div>
            <h2 class="text-white">
              <a href="#scientific-policy"> {{ $t("scientific-policy") }}</a>
            </h2>
            <div class="text-body-1">
              <ContentDoc :path="scientificPolicy" />
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </section>
    <section class="dark">
      <v-container>
        <MiscAtomsSlidingCarousel
          key="scientificAdvisoryBoard"
          :items="scientificAdvisoryBoard"
          pathPrefix="people-slug"
          type="people"
          :dark="true"
          :more="false"
        >
          <h2 class="pl-2 text-white">
            {{ $t("scientific-advisory-board") }}
          </h2>
        </MiscAtomsSlidingCarousel>
      </v-container>
    </section>
    <section class="py-4">
      <MiscMoleculesAnnualReports />
    </section>
    <NavigationFooter :isSnapScroll="true" />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import LIST_PEOPLE from "@paris-ias/trees/dist/graphql/client/people/query.list.people.gql"
const { smAndUp } = useDisplay()
const { locale } = useI18n()
const variables = {
  options: {
    skip: 0,
    limit: 20,
    sort: "nameasc",
    filters: JSON.stringify({ groups: ["sab"] }),
  },
  appId: "iea",
  lang: locale.value,
}
const scientificPolicy = "/pages/" + locale.value + "/scientific_policy"

const { data, error } = await useAsyncQuery(LIST_PEOPLE, variables)

if (error.value) {
  console.error("GraphQL error:", error.value)
  throw error.value
}
const scientificAdvisoryBoard = data.value?.listPeople?.items

if (!scientificAdvisoryBoard) {
  throw createError({
    statusCode: 404,
    message: "Item not found in response",
  })
}
definePageMeta({
  layout: "about",
  /*   documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  }, */
})
</script>

<style scoped>
.wrap-media {
  float: left;
  margin: 0 32px 16px 0;
  overflow: hidden;
  width: 300px;
}

@media (max-width: 560px) {
  .wrap-media {
    float: none;
    margin: 0 0 16px 0;
    width: 100%;
  }
}
</style>
