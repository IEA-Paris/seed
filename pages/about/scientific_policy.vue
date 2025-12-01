<template>
  <div class="scroller">
    <section class="py-4">
      <v-row class="d-flex align-center justify-center">
        <v-col cols="12" md="10" lg="9" xl="8">
          <v-sheet class="pa-8 bg-surface" color="transparent">
            <div v-if="smAndUp" class="wrap-media">
              <v-img
                src="/images/Paulius_Yamin.jpg"
                aspect-ratio="1"
                rounded="lg"
                cover
              />
            </div>
            <div class="text-h4 text-md-h3 font-weight-bold"></div>
            <div class="text-body-1">
              <ContentDoc :path="scientificPolicy" />
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </section>
    <section class="dark">
      <v-container>
        <!--         <MiscAtomsSlidingCarousel
          key="scientificAdvisoryBoard"
          :items="scientificAdvisoryBoard"
          type="people"
          :loading="false"
          :dark="true"
        >
          <div class="text-h2">
            {{ $t("scientific-advisory-board") }}
          </div>
        </MiscAtomsSlidingCarousel> -->
      </v-container>
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
    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { fr } from "vuetify/locale"
const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
console.log(locale.value)
const variables = {
  options: {
    skip: 0,
    limit: 20,
    sortBy: ["lastname"],
    sortDesc: true,
    filters: JSON.stringify({ groups: ["sab"] }),
  },
  appId: "iea",
  lang: locale.value,
}
const scientificPolicy = "/pages/" + locale.value + "/scientific_policy"
/* 
const { data, error } = await useAsyncQuery(LIST_PEOPLE, variables)
console.log("variables: ", variables)
console.log("data: ", data)

if (error.value) {
  console.error("GraphQL error:", error.value)
  throw error.value
}
const scientificAdvisoryBoard = data.value?.listPeople?.items
console.log("scientificAdvisoryBoard: ", scientificAdvisoryBoard)

if (!scientificAdvisoryBoard) {
  throw createError({
    statusCode: 404,
    message: "Item not found in response",
  })
} */
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
  border-radius: 12px;
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
