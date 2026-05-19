<template>
  <div class="institute-page">
    <!-- 1. Presentation -->
    <section id="missions" class="section-light anchor-offset">
      <v-container>
        <v-row justify="center" align="center" class="pb-12">
          <v-col cols="12" sm="10" md="10" lg="8">
            <p class="overline-label">{{ $t("missions") }}</p>
            <h2>{{ $t("about_institute.research") }}</h2>
            <div class="typographic-rule" />
            <ContentDoc :path="research" />
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="py-12">
          <v-col cols="12" sm="10" md="10" lg="8">
            <h2>{{ $t("about_institute.fellowships") }}</h2>
            <div class="typographic-rule" />
            <ContentDoc :path="fellowships" />
          </v-col>
        </v-row>
        <v-row justify="center" align="center" class="py-12">
          <v-col cols="12" sm="10" md="10" lg="8">
            <h2>{{ $t("about_institute.collective") }}</h2>
            <div class="typographic-rule" />
            <ContentDoc :path="collectiveIntelligence" />
          </v-col>
        </v-row>
        <MiscMoleculesAnnualReports />
      </v-container>
    </section>
    <section id="statuts" class="anchor-offset">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="10" lg="8">
            <h2>{{ $t("about_institute.statutes") }}</h2>
            <div class="typographic-rule" />
            <div class="prose">
              <ContentDoc :path="statutes" />
            </div>
            <v-btn
              variant="outlined"
              rounded="0"
              flat
              class="mt-6"
              :href="statutes"
              target="_blank"
              append-icon="mdi-open-in-new"
            >
              {{ $t("download-statutes") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 4. History — asymmetric bleed-right image (Option E) -->
    <section id="location" class="section-split anchor-offset">
      <v-container class="section-split__text py-12">
        <v-row justify="start" align="center">
          <v-col cols="12" md="6" lg="5">
            <p class="overline-label">
              {{ $t("location") }}
            </p>
            <h2>{{ $t("about_institute.lauzun") }}</h2>
            <div class="typographic-rule" />
            <div class="prose">
              <ContentDoc :path="history" />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div v-if="lgAndUp" class="section-split__image py-12">
        <v-img
          src="/images/location/3.jpg"
          cover
          height="100%"
          class="section-split__img"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"

const { lgAndUp } = useDisplay()
const { locale } = useI18n()

const research = ref("/pages/" + locale.value + "/about/mission/research")
const collectiveIntelligence = ref(
  "/pages/" + locale.value + "/about/mission/collective-intelligence",
)
const fellowships = ref("/pages/" + locale.value + "/about/mission/fellowships")
const history = ref("/pages/" + locale.value + "/about/lauzun")
const statutes = ref("/pages/" + locale.value + "/about/statutes")
</script>

<style scoped>
/* Prevent horizontal overflow from the AnnualReports sliding carousel
   (its viewport intentionally uses overflow: visible above 960px for the
   bleed effect, which would otherwise widen the body when the FR locale
   adds extra slides). */
.institute-page {
  overflow-x: clip;
}

/* Offset anchor targets below the fixed topbar (64px) */
.anchor-offset {
  scroll-margin-top: 64px;
}

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
  background: linear-gradient(to right, #ffffff 0%, transparent 40%);
  z-index: 1;
}
</style>
