<template>
  <div class="institute-page">
    <NavigationPageToc :sections="tocSections" :aria-label="$t('on-this-page')" />
    <!-- ─── Hero ─────────────────────────────────────────────────────── -->
    <section class="institute-hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <p class="institute-hero__overline text-overline">
              {{ $t("paris-institute-for-advanced-study") }}
            </p>
            <h1
              v-motion-slide-visible-once-bottom
              class="institute-hero__title"
            >
              {{ $t("about_institute.hero.title") }}
            </h1>
            <p class="institute-hero__subtitle">
              {{ $t("about_institute.hero.subtitle") }}
            </p>
            <div class="institute-hero__actions">
              <v-btn
                variant="outlined"
                size="large"
                href="#missions"
                :rounded="0"
              >
                <v-icon start>mdi-compass-outline</v-icon>
                {{ $t("about_institute.hero.cta-missions") }}
              </v-btn>
              <v-btn variant="text" size="large" href="#statuts">
                {{ $t("about_institute.statutes") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn variant="text" size="large" href="#location">
                {{ $t("about_institute.lauzun") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── Missions ─────────────────────────────────────────────────── -->
    <section id="missions" class="institute-missions anchor-offset">
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <p class="institute-section__overline text-overline">
              {{ $t("about_institute.missions.overline") }}
            </p>
            <h2
              v-motion-slide-visible-once-bottom
              class="institute-section__title"
            >
              {{ $t("about_institute.missions.title") }}
            </h2>
          </v-col>
        </v-row>

        <!-- Research -->
        <v-row class="institute-mission">
          <v-col cols="12" md="3" class="institute-mission__aside">
            <p class="institute-mission__overline text-overline">
              {{ $t("about_institute.missions.research-overline") }}
            </p>
          </v-col>
          <v-col cols="12" md="9" class="institute-mission__body">
            <h3
              v-motion-slide-visible-once-bottom
              class="institute-mission__title"
            >
              {{ $t("about_institute.research") }}
            </h3>
            <div class="prose">
              <ContentDoc :path="research" />
            </div>
          </v-col>
        </v-row>

        <!-- Fellowships -->
        <v-row class="institute-mission">
          <v-col cols="12" md="3" class="institute-mission__aside">
            <p class="institute-mission__overline text-overline">
              {{ $t("about_institute.missions.fellowships-overline") }}
            </p>
          </v-col>
          <v-col cols="12" md="9" class="institute-mission__body">
            <h3
              v-motion-slide-visible-once-bottom
              class="institute-mission__title"
            >
              {{ $t("about_institute.fellowships") }}
            </h3>
            <div class="prose">
              <ContentDoc :path="fellowships" />
            </div>
          </v-col>
        </v-row>

        <!-- Collective intelligence -->
        <v-row class="institute-mission">
          <v-col cols="12" md="3" class="institute-mission__aside">
            <p class="institute-mission__overline text-overline">
              {{ $t("about_institute.missions.collective-overline") }}
            </p>
          </v-col>
          <v-col cols="12" md="9" class="institute-mission__body">
            <h3
              v-motion-slide-visible-once-bottom
              class="institute-mission__title"
            >
              {{ $t("about_institute.collective") }}
            </h3>
            <div class="prose">
              <ContentDoc :path="collectiveIntelligence" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── Annual reports ──────────────────────────────────────────── -->
    <div id="annual-reports" class="anchor-offset">
      <MiscMoleculesAnnualReports />
    </div>

    <!-- ─── Statutes ─────────────────────────────────────────────────── -->
    <section id="statuts" class="institute-statutes anchor-offset">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="institute-statutes__info">
            <p class="institute-section__overline text-overline">
              {{ $t("about_institute.statutes-overline") }}
            </p>
            <h2
              v-motion-slide-visible-once-bottom
              class="institute-section__title"
            >
              {{ $t("about_institute.statutes") }}
            </h2>
            <v-btn
              variant="outlined"
              size="large"
              :rounded="0"
              :href="statutes"
              target="_blank"
              append-icon="mdi-open-in-new"
              class="mt-2"
            >
              {{ $t("download-statutes") }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="8">
            <div class="prose institute-statutes__body">
              <ContentDoc :path="statutes" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── Location / Hôtel de Lauzun ──────────────────────────────── -->
    <section id="location" class="institute-lauzun anchor-offset">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <p class="institute-section__overline text-overline">
              {{ $t("about_institute.location-overline") }}
            </p>
            <h2
              v-motion-slide-visible-once-bottom
              class="institute-section__title"
            >
              {{ $t("about_institute.lauzun") }}
            </h2>
            <div class="prose institute-lauzun__body">
              <ContentDoc :path="history" />
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="institute-lauzun__img-wrap">
              <img
                src="/images/location/3.jpg"
                :alt="$t('about_institute.lauzun')"
                class="institute-lauzun__img"
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const { locale, t } = useI18n()

const research = ref("/pages/" + locale.value + "/about/institute/research")
const collectiveIntelligence = ref(
  "/pages/" + locale.value + "/about/institute/collective-intelligence",
)
const fellowships = ref("/pages/" + locale.value + "/about/institute/fellowships")
const history = ref("/pages/" + locale.value + "/about/institute/history")
const statutes = ref("/pages/" + locale.value + "/about/institute/statutes")

const tocSections = computed(() => [
  { id: "missions", label: t("missions") },
  { id: "annual-reports", label: t("annual-reports") },
  { id: "statuts", label: t("statuts") },
  { id: "location", label: t("lauzun") },
])
</script>

<style scoped>
/* Prevent horizontal overflow from the AnnualReports sliding carousel */
.institute-page {
  overflow-x: clip;
}

/* Offset anchor targets below the fixed topbar (64px) */
.anchor-offset {
  scroll-margin-top: 64px;
}

/* ── Shared section utilities ────────────────────────────────────────── */
.institute-section__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.institute-section__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.15;
  margin-bottom: 2rem;
  max-width: 28ch;
}

/* ── Hero ────────────────────────────────────────────────────────────── */
.institute-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.institute-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.institute-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.institute-hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 60ch;
  opacity: 0.75;
  margin-bottom: 2rem;
}

.institute-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── Missions ────────────────────────────────────────────────────────── */
.institute-missions {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.institute-mission {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2.5rem 0;
}

.institute-mission__aside {
  padding-right: 2rem;
}

.institute-mission__overline {
  letter-spacing: 0.18em;
  opacity: 0.45;
  margin: 0;
}

.institute-mission__title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 400;
  line-height: 1.25;
  margin-bottom: 1.25rem;
  max-width: 36ch;
}

.institute-mission__body :deep(p) {
  font-size: 0.9375rem;
  line-height: 1.7;
  opacity: 0.8;
}

/* ── Statutes ────────────────────────────────────────────────────────── */
.institute-statutes {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.institute-statutes__info {
  padding-right: 3rem;
}

.institute-statutes__body :deep(p),
.institute-statutes__body :deep(li) {
  font-size: 0.9375rem;
  line-height: 1.7;
  opacity: 0.8;
}

/* ── Location / Hôtel de Lauzun ──────────────────────────────────────── */
.institute-lauzun {
  padding: 4rem 0;
}

.institute-lauzun__body :deep(p) {
  font-size: 0.9375rem;
  line-height: 1.65;
  opacity: 0.75;
  max-width: 60ch;
  margin-bottom: 1rem;
}

.institute-lauzun__img-wrap {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.institute-lauzun__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  filter: grayscale(100%);
}

/* ── Responsive ──────────────────────────────────────────────────────── */
@media (max-width: 959px) {
  .institute-mission__aside {
    padding-right: 0;
    margin-bottom: 0.75rem;
  }

  .institute-statutes__info {
    padding-right: 0;
    margin-bottom: 2rem;
  }
}
</style>
