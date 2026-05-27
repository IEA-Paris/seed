<template>
  <div class="contact-page">
    <NavigationPageToc :sections="tocSections" :aria-label="$t('on-this-page')" />
    <!-- ─── Hero ─────────────────────────────────────────────────────── -->
    <section class="contact-hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="8" lg="6">
            <p class="contact-hero__overline text-overline">
              {{ $t("paris-institute-for-advanced-study") }}
            </p>
            <h1 v-motion-slide-visible-once-bottom class="contact-hero__title">
              {{ $t("contact-or-visit.title") }}
            </h1>
            <p class="contact-hero__subtitle">
              {{ $t("contact-or-visit.subtitle") }}
            </p>
            <div class="contact-hero__actions">
              <v-btn variant="outlined" size="large" href="#team" :rounded="0">
                <v-icon start>mdi-account-multiple</v-icon>
                {{ $t("contact-or-visit.meet-team-cta") }}
              </v-btn>
              <v-btn variant="text" size="large" href="#map">
                {{ $t("visit.see-map") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── Team contacts ─────────────────────────────────────────────── -->
    <section id="team" class="contact-team">
      <v-container>
        <MiscAtomsSlidingCarousel type="contact" :items="team" :more="false">
          <div>
            <p class="visit-section__overline text-overline">
              {{ $t("contact-or-visit.talk-to-us") }}
            </p>
            <h2
              v-motion-slide-visible-once-bottom
              class="visit-section__title contact-team__title"
            >
              {{ $t("contact-or-visit.our-contacts") }}
            </h2>
          </div>
        </MiscAtomsSlidingCarousel>
      </v-container>
    </section>

    <!-- ─── Address + Map ─────────────────────────────────────────────── -->
    <section id="map" class="visit-address">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="visit-address__info">
            <p class="visit-section__overline text-overline">
              {{ $t("visit.find-us") }}
            </p>
            <h2 v-motion-slide-visible-once-bottom class="visit-section__title">
              {{ $t("visit.address-title") }}
            </h2>

            <div class="visit-address__fields">
              <div class="visit-address__field">
                <span class="visit-address__label text-overline">{{
                  $t("visit.address-label")
                }}</span>
                <a
                  href="https://www.openstreetmap.org/?mlat=48.85168&mlon=2.35911#map=18/48.85168/2.35911"
                  target="_blank"
                  rel="noopener"
                  class="visit-address__value visit-address__value--link"
                >
                  Institut d'études avancées de Paris<br />
                  17 Quai d'Anjou<br />
                  75004 Paris
                </a>
              </div>

              <div class="visit-address__field">
                <span class="visit-address__label text-overline">{{
                  $t("contact.info.phone")
                }}</span>
                <a
                  href="tel:+33156810052"
                  class="visit-address__value visit-address__value--link"
                >
                  +33 (0)1 56 81 00 52
                </a>
              </div>

              <div class="visit-address__field">
                <span class="visit-address__label text-overline">{{
                  $t("contact.info.general")
                }}</span>
                <a
                  href="mailto:contact@Paris-IEA.fr"
                  class="visit-address__value visit-address__value--link"
                >
                  contact@Paris-IEA.fr
                </a>
              </div>

              <div class="visit-address__field">
                <span class="visit-address__label text-overline">{{
                  $t("visit.parking-title")
                }}</span>
                <p class="visit-address__value">
                  {{ $t("visit.parking-note") }}
                </p>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="8" class="visit-address__map-col">
            <div class="visit-map">
              <iframe
                title="Institut d'études avancées de Paris – OpenStreetMap"
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&layer=mapnik&marker=48.851684276691216%2C2.359112799167633"
              ></iframe>
            </div>
            <div class="visit-map__caption">
              <a
                href="https://www.openstreetmap.org/?mlat=48.85168&mlon=2.35911#map=18/48.85168/2.35911"
                target="_blank"
                rel="noopener"
                class="visit-map__caption-link"
              >
                {{ $t("view-larger-map") }} ↗
              </a>
              <span class="visit-map__caption-credit"
                >© OpenStreetMap contributors</span
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── Transport ──────────────────────────────────────────────────── -->
    <section id="transport" class="visit-transport">
      <v-container>
        <v-row>
          <v-col cols="12">
            <p class="visit-section__overline text-overline">
              {{ $t("visit.getting-there") }}
            </p>
            <h2 v-motion-slide-visible-once-bottom class="visit-section__title">
              {{ $t("visit.transport-title") }}
            </h2>
          </v-col>
        </v-row>

        <div class="visit-transport__grid">
          <!-- Metro -->
          <div v-motion-slide-visible-once-bottom class="visit-transport__item">
            <div class="visit-transport__header">
              <v-icon class="visit-transport__icon">mdi-subway-variant</v-icon>
              <h3 class="visit-transport__name">{{ $t("visit.by-metro") }}</h3>
            </div>
            <div class="visit-transport__lines">
              <div class="visit-transport__line">
                <span class="visit-transport__badge" style="background: #704497"
                  >7</span
                >
                <span class="visit-transport__station">Pont-Marie</span>
              </div>
              <div class="visit-transport__line">
                <span class="visit-transport__badge" style="background: #704497"
                  >7</span
                >
                <span class="visit-transport__station">Sully – Morland</span>
              </div>
              <div class="visit-transport__line">
                <span
                  class="visit-transport__badge"
                  style="background: #ffcd00; color: #000"
                  >1</span
                >
                <span class="visit-transport__station">Saint-Paul</span>
              </div>
            </div>
            <a
              :href="
                locale === 'fr'
                  ? 'https://www.ratp.fr/plan-metro'
                  : 'https://www.ratp.fr/en/plan-metro'
              "
              target="_blank"
              rel="noopener"
              class="visit-transport__link"
            >
              RATP – {{ $t("visit.metro-map") }} ↗
            </a>
          </div>

          <!-- Bus -->
          <div v-motion-slide-visible-once-bottom class="visit-transport__item">
            <div class="visit-transport__header">
              <v-icon class="visit-transport__icon">mdi-bus</v-icon>
              <h3 class="visit-transport__name">{{ $t("visit.by-bus") }}</h3>
            </div>
            <div class="visit-transport__lines">
              <div class="visit-transport__line">
                <span
                  class="visit-transport__badge"
                  style="background: #82c8e6; color: #000"
                  >67</span
                >
                <span class="visit-transport__station">Quai d'Anjou</span>
              </div>
              <div class="visit-transport__line">
                <span
                  class="visit-transport__badge"
                  style="background: #82c8e6; color: #000"
                  >86</span
                >
                <span class="visit-transport__station">Île Saint-Louis</span>
              </div>
              <div class="visit-transport__line">
                <span
                  class="visit-transport__badge"
                  style="background: #82c8e6; color: #000"
                  >87</span
                >
                <span class="visit-transport__station">Île Saint-Louis</span>
              </div>
            </div>
            <a
              :href="
                locale === 'fr'
                  ? 'https://www.ratp.fr/se-deplacer/bus-noctilien/bus'
                  : 'https://www.ratp.fr/en/discover-the-network/bus'
              "
              target="_blank"
              rel="noopener"
              class="visit-transport__link"
            >
              RATP – {{ $t("visit.bus-lines") }} ↗
            </a>
          </div>

          <!-- RER -->
          <div v-motion-slide-visible-once-bottom class="visit-transport__item">
            <div class="visit-transport__header">
              <v-icon class="visit-transport__icon">mdi-train-variant</v-icon>
              <h3 class="visit-transport__name">RER</h3>
            </div>
            <div class="visit-transport__lines">
              <div class="visit-transport__line">
                <span
                  class="visit-transport__badge"
                  style="background: #4e9acf; color: #fff"
                  >B</span
                >
                <span class="visit-transport__station"
                  >Saint-Michel – Notre-Dame</span
                >
              </div>
              <div class="visit-transport__line">
                <span
                  class="visit-transport__badge"
                  style="background: #d4700a; color: #fff"
                  >C</span
                >
                <span class="visit-transport__station"
                  >Saint-Michel – Notre-Dame</span
                >
              </div>
            </div>
            <p class="visit-transport__note">{{ $t("visit.rer-note") }}</p>
            <a
              :href="
                locale === 'fr'
                  ? 'https://www.ratp.fr/plan-rer'
                  : 'https://www.ratp.fr/en/plan-rer'
              "
              target="_blank"
              rel="noopener"
              class="visit-transport__link"
            >
              RATP – {{ $t("visit.rer-map") }} ↗
            </a>
          </div>

          <!-- Bike -->
          <div v-motion-slide-visible-once-bottom class="visit-transport__item">
            <div class="visit-transport__header">
              <v-icon class="visit-transport__icon">mdi-bicycle</v-icon>
              <h3 class="visit-transport__name">{{ $t("visit.by-bike") }}</h3>
            </div>
            <p class="visit-transport__note" style="margin-bottom: 1.5rem">
              {{ $t("visit.bike-note") }}
            </p>
            <a
              href="https://www.velib-metropole.fr/map#?latlon=48.85168,2.35911&zoom=16"
              target="_blank"
              rel="noopener"
              class="visit-transport__link"
            >
              Vélib' – {{ $t("visit.bike-map") }} ↗
            </a>
          </div>
        </div>
      </v-container>
    </section>

    <!-- ─── RATP CTA ───────────────────────────────────────────────────── -->
    <section class="visit-cta dark">
      <v-container>
        <v-row class="align-center">
          <v-col v-motion-slide-visible-once-bottom cols="12" md="6">
            <h2 class="visit-cta__title text-white">
              {{ $t("visit.ratp-planner-title") }}
            </h2>
            <p class="visit-cta__desc">
              {{ $t("visit.ratp-planner-body") }}
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <div class="visit-cta__card">
              <div class="visit-cta__field">
                <span class="visit-cta__field-label text-overline">{{
                  $t("visit.destination")
                }}</span>
                <span class="visit-cta__field-value"
                  >17 Quai d'Anjou, 75004 Paris</span
                >
              </div>
              <div class="visit-cta__actions mt-6">
                <v-btn
                  variant="outlined"
                  color="white"
                  size="large"
                  :href="ratpUrl"
                  target="_blank"
                  rel="noopener"
                >
                  {{ $t("visit.ratp-planner-cta") }}
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ─── Island section ────────────────────────────────────────────── -->
    <section class="visit-island">
      <v-container>
        <v-row class="align-center">
          <v-col cols="12" md="6">
            <p class="visit-section__overline text-overline">
              {{ $t("visit.about-the-island") }}
            </p>
            <h2 v-motion-slide-visible-once-bottom class="visit-section__title">
              {{ $t("visit.island-title") }}
            </h2>
            <p class="visit-island__body">{{ $t("visit.island-body-1") }}</p>
            <p class="visit-island__body">{{ $t("visit.island-body-2") }}</p>
            <v-btn
              variant="outlined"
              size="large"
              :href="
                locale === 'fr'
                  ? 'https://fr.wikipedia.org/wiki/%C3%8Ele_Saint-Louis'
                  : 'https://en.wikipedia.org/wiki/%C3%8Ele_Saint-Louis'
              "
              target="_blank"
              rel="noopener"
              class="mt-4"
            >
              <v-icon start>mdi-wikipedia</v-icon>
              {{ $t("visit.learn-more") }}
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <div class="visit-island__img-wrap">
              <img
                src="/images/location/8.jpg"
                :alt="$t('visit.island-img-alt')"
                class="visit-island__img"
              />
              <span class="visit-island__img-credit">
                © Wikimedia Commons
              </span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()

const ratpUrl = computed(() =>
  locale.value === "fr"
    ? "https://www.ratp.fr/itineraires/%2617+Quai+d’Anjou+75004+Paris"
    : "https://www.ratp.fr/en/itineraires/%2617+Quai+d’Anjou+75004+Paris",
)

useHead({
  title: t("contact-or-visit.title"),
  meta: [{ name: "description", content: t("contact-or-visit.subtitle") }],
})

const tocSections = computed(() => [
  { id: "team", label: t("contact.nav.team") },
  { id: "map", label: t("contact.nav.map") },
  { id: "transport", label: t("contact.nav.transport") },
])

const team = computed(() => [
  {
    name: "Sandrine",
    role: t("contact.team.roles.events"),
    email: "Sandrine@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/sandrine-morvan.jpg",
  },
  {
    name: "Éloise",
    role: t("contact.team.roles.media"),
    email: "Eloise@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/eloise-lehujeur.jpg",
  },
  {
    name: "Lisette",
    role: t("contact.team.roles.video"),
    email: "Lisette@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/LISETTE-WINKLER.jpg",
  },

  {
    name: "Paulius",
    role: t("contact.team.roles.science"),
    email: "Paulius@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/paulius-yamin.jpg",
  },
  {
    name: "Saadi",
    role: t("contact.team.roles.world"),
    email: "Saadi@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/saadi-lahlou.jpg",
  },
])
</script>

<style scoped>
/* ── Shared section utilities ────────────────────────────────────────── */
.visit-section__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.visit-section__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.15;
  margin-bottom: 2rem;
  max-width: 28ch;
}

/* ─── Hero ─────────────────────────────────────────────── */
.contact-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.contact-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.contact-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.contact-hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 60ch;
  opacity: 0.75;
  margin-bottom: 2rem;
}

.contact-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ─── Team ──────────────────────────────────────────────── */
.contact-team {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.contact-team__title {
  margin-bottom: 0;
}

/* ── Address + map ───────────────────────────────────────────────────── */
.visit-address {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.visit-address__info {
  padding-right: 3rem;
}

.visit-address__fields {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.visit-address__field {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.visit-address__label {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  opacity: 0.45;
  margin-bottom: 0.35rem;
}

.visit-address__value {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.85;
  text-decoration: none;
  color: inherit;
}

.visit-address__value--link:hover {
  opacity: 1;
  text-decoration: underline;
}

.visit-address__map-col {
  padding-left: 0;
}

.visit-map {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.visit-map iframe {
  width: 100%;
  height: 100%;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.visit-map__caption {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.75rem;
}

.visit-map__caption-link {
  color: inherit;
  text-decoration: none;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.visit-map__caption-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.visit-map__caption-credit {
  opacity: 0.35;
}

/* ── Transport ───────────────────────────────────────────────────────── */
.visit-transport {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.visit-transport__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
}

.visit-transport__item {
  padding: 2rem 2rem 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.visit-transport__item:not(:first-child) {
  padding-left: 2rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.visit-transport__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.visit-transport__icon {
  font-size: 1.25rem;
  opacity: 0.6;
}

.visit-transport__name {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: "Open Sans", sans-serif;
  margin: 0;
}

.visit-transport__lines {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.visit-transport__line {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.visit-transport__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  font-family: "Open Sans", sans-serif;
}

.visit-transport__station {
  font-size: 0.9375rem;
  opacity: 0.8;
}

.visit-transport__note {
  font-size: 0.875rem;
  line-height: 1.6;
  opacity: 0.6;
  margin-bottom: 1rem;
}

.visit-transport__link {
  font-size: 0.8125rem;
  color: inherit;
  text-decoration: none;
  opacity: 0.5;
  letter-spacing: 0.05em;
  transition: opacity 0.2s ease;
}

.visit-transport__link:hover {
  opacity: 1;
  text-decoration: underline;
}

/* ── RATP CTA ────────────────────────────────────────────────────────── */
.visit-cta {
  padding: 4rem;
  background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.visit-cta__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 1rem;
  max-width: 28ch;
}

.visit-cta__desc {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  max-width: 50ch;
  margin: 0;
}

.visit-cta__card {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 2rem;
}

.visit-cta__field {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.visit-cta__field-label {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.25rem;
}

.visit-cta__field-value {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

/* ── Island section ──────────────────────────────────────────────────── */
.visit-island {
  padding: 4rem 0;
}

.visit-island__body {
  font-size: 0.9375rem;
  line-height: 1.65;
  opacity: 0.75;
  max-width: 60ch;
  margin-bottom: 1rem;
}

.visit-island__img-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.visit-island__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.visit-island__img-credit {
  position: absolute;
  bottom: 0.5rem;
  right: 0.75rem;
  font-size: 0.6875rem;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.35);
  padding: 0.1rem 0.4rem;
}

/* ── Responsive ──────────────────────────────────────────────────────── */
@media (max-width: 959px) {
  .visit-address__info {
    padding-right: 0;
  }

  .visit-address__map-col {
    padding-left: 12px;
  }

  .visit-cta {
    padding: 2.5rem 1.5rem;
  }

  .visit-cta__card {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .visit-transport__item:not(:first-child) {
    border-left: none;
    padding-left: 0;
  }
}

@media (max-width: 599px) {
  .visit-transport__grid {
    grid-template-columns: 1fr;
  }
}
</style>
