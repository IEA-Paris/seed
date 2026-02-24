<template>
  <div class="scroller">
    <!-- 1. Scientific policy -->
    <section class="section-light">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="5" lg="4">
            <p class="overline-label">{{ $t("vision") }}</p>
            <div class="typographic-rule" />
            <ContentDoc :path="scientificPolicy" />
          </v-col>
          <v-col v-if="mdAndUp" cols="12" md="4" lg="3">
            <div class="portrait-wrap">
              <v-img
                src="/images/team/paulius-yamin.jpg"
                aspect-ratio="1"
                cover
                class="portrait-img"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 2. Scientific Advisory Board — dark -->
    <section class="section-dark">
      <v-container>
        <MiscAtomsSlidingCarousel
          key="scientificAdvisoryBoard"
          :items="scientificAdvisoryBoard"
          path-prefix="people-slug"
          type="people"
          :dark="true"
          :more="false"
        >
          <div>
            <p class="overline-label overline-label--light">
              {{ $t("vision") }}
            </p>
            <div class="typographic-rule typographic-rule--light" />
            <h2
              class="section-heading section-heading--light section-heading--no-mb"
            >
              {{ $t("sab") }}
            </h2>
          </div>
        </MiscAtomsSlidingCarousel>
      </v-container>
    </section>

    <!-- 3. Annual Reports -->
    <MiscMoleculesAnnualReports />

    <NavigationFooter :is-snap-scroll="false" />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import LIST_PEOPLE from "@paris-ias/trees/dist/graphql/client/people/query.list.people.gql"

const { mdAndUp } = useDisplay()
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
  throw createError({ statusCode: 404, message: "Item not found in response" })
}

definePageMeta({ layout: "about" })
</script>

<style scoped>
/* ── Square portrait ────────────────────────────────── */
.portrait-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.portrait-img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  transition: filter 0.4s ease;
}

.portrait-img:hover {
  filter: grayscale(0%);
}

/* ── Carousel slot heading flush ─────────────────────── */
.section-heading--no-mb {
  margin-bottom: 0;
}
</style>
