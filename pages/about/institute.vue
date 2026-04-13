<template>
  <div class="scroller">
    <!-- 1. Presentation -->
    <section class="section-light">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="7" lg="5" xl="4">
            <p class="overline-label">{{ $t("institute") }}</p>
            <div class="typographic-rule" />
            <ContentDoc :path="presentation" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 2. Collective intelligence-->
    <section class="section-dark section-typographic">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="7" lg="5" xl="4">
            <p class="overline-label overline-label--light">
              {{ $t("institute") }}
            </p>
            <div class="typographic-rule typographic-rule--light" />
            <div class="prose prose--light">
              <ContentDoc :path="collectiveIntelligence" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 3. Governance + affiliations marquee -->
    <section class="section-light">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="5" lg="4">
            <p class="overline-label">{{ $t("institute") }}</p>
            <div class="typographic-rule" />
            <ContentDoc :path="governance" />
          </v-col>
          <v-col
            v-if="mdAndUp"
            cols="12"
            md="5"
            lg="4"
            class="d-flex flex-column align-center"
          >
            <MiscMoleculesLogoGallery
              :loading="pending"
              :items="allAffiliations"
              :row-count="6"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 4. History — asymmetric bleed-right image (Option E) -->
    <section class="section-dark section-split">
      <v-container class="section-split__text">
        <v-row justify="start" align="center">
          <v-col cols="12" md="6" lg="5">
            <p class="overline-label overline-label--light">
              {{ $t("institute") }}
            </p>
            <div class="typographic-rule typographic-rule--light" />
            <div class="prose prose--light">
              <ContentDoc :path="history" />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div v-if="lgAndUp" class="section-split__image">
        <v-img
          src="/images/location/3.jpg"
          cover
          height="100%"
          class="section-split__img"
        />
      </div>
    </section>

    <NavigationFooter :is-snap-scroll="true" />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"

const { lgAndUp } = useDisplay()
const { locale } = useI18n()

const { pending, allAffiliations } = await useAffiliations()

const presentation = ref("/pages/" + locale.value + "/institute_description")
const collectiveIntelligence = ref(
  "/pages/" + locale.value + "/institute_collective",
)
const governance = ref("/pages/" + locale.value + "/institute_governance")
const history = ref(
  "/pages/" + locale.value + "/institute_location_description",
)

definePageMeta({ layout: "about" })
</script>

<style scoped>
/* ── Split section: text left / image pinned right (Option E) */
.section-split {
  position: relative;
  overflow: hidden;
  padding: 0;
}

.section-split__text {
  position: relative;
  z-index: 1;
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.section-split__image {
  position: absolute;
  top: 0;
  right: 0;
  width: 38%;
  height: 100%;
  filter: grayscale(100%);
}

/* Gradient fade from image into black on the left edge */
.section-split__image::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #000 0%, transparent 40%);
  z-index: 1;
}
</style>
