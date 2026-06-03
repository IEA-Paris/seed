<template>
  <div class="scroller">
    <section class="d-flex flex-column justify-center splash">
      <v-container fluid>
        <v-row ref="about" :key="locale" class="">
          <v-col
            cols="12"
            class="my-6 d-flex flex-column justify-center align-center"
          >
            <div class="text-h2 text-center splash-moto splash-moto--text">
              {{ $t("moto") }}
            </div>
            <ListMoleculesGlobalSearchInput
              key="home-search"
              type="all"
              :loading="false"
              class="mb-6 light home-search-input"
            ></ListMoleculesGlobalSearchInput>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-center splash-chevron">
        <v-btn
          color="default"
          icon
          flat
          variant="outlined"
          :aria-label="$t('scroll-down')"
          class="splash-chevron__btn"
          @click="scrollToStats"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </section>

    <section ref="statsScrollAnchor" class="key-figures-section section-dark">
      <HomeKeyFigures :src="keyFigures" :duration="2.5" />
    </section>

    <section class="ecosystem-section section-light">
      <v-container fluid>
        <v-row justify="center">
          <v-col
            cols="12"
            md="10"
            class="d-flex flex-column align-center text-center"
          >
            <p class="overline-label ecosystem-section__overline">
              {{ $t("partners") }}
            </p>
            <div class="typographic-rule ecosystem-section__rule" />
            <NuxtLink
              v-motion-slide-visible-once-bottom
              :to="$localePath('/about/partners')"
              class="ecosystem-section__link"
            >
              <h2 class="section-heading ecosystem-section__title">
                {{ $t("our-ecosystem") }}
              </h2>
            </NuxtLink>
            <p class="ecosystem-section__subtitle">
              {{ $t("our-ecosystem-subtitle") }}
            </p>
          </v-col>
        </v-row>
      </v-container>
      <div class="ecosystem-section__gallery">
        <MiscMoleculesLogoGallery
          :loading="pending"
          :featured-items="supportData"
          :items="memberData"
        />
      </div>
    </section>

    <div>
      <NavigationFooter is-snap-scroll />
    </div>
  </div>
</template>

<script setup>
import config from "@/static.config"
definePageMeta({
  layout: "about",
})
const main = [
  {
    text: "about",
    dropdown: true,
    children: [
      {
        text: "institute",
        path: "/about/institute",
        children: [
          {
            text: "missions",
            path: "/about/institute#missions",
          },
          {
            text: "statuts",
            path: "/about/institute#statuts",
          },
          {
            text: "location",
            path: "/about/institute#location",
          },
        ],
      },
      {
        text: "organisation",
        path: "/about/organisation",
        children: [
          {
            text: "team",
            path: "/about/organisation#team",
          },
          {
            text: "board",
            path: "/about/organisation#board",
          },
          {
            text: "sab",
            path: "/about/organisation#sab",
          },
          {
            text: "ethics",
            path: "/about/organisation#ethics",
          },
        ],
      },
      {
        text: "partners",
        path: "/about/partners",
        children: [
          {
            text: "members",
            path: "/about/members#members",
          },
          {
            text: "networks",
            path: "/about/members#networks",
          },
          {
            text: "supports",
            path: "/about/members#supports",
          },
        ],
      },
    ],
  },
  {
    text: "activities",
    dropdown: true,
    children: [
      {
        text: "items.fellowships",
        path: "/activities/fellowships",
        children: [
          {
            text: "calls",
            path: "/activities/fellowships",
          },
          { text: "conditions", path: "/activities/fellowships/conditions" },
          { text: "location", path: "/activities/fellowships/location" },
        ],
      },
      {
        text: "collective-intelligence",
        children: [
          { text: "items.projects", path: "/activities/projects" },
          { text: "initiatives", path: "/activities/initiatives" },
          { text: "platforms", path: "/activities/platforms" },
        ],
      },
    ],
  },
  {
    text: "fellows",
    path: "/activities/fellows",
  },
  { text: "items.events", path: "/activities/events" },

  {
    text: "resources",
    dropdown: true,
    children: [
      { text: "items.publications", path: "/activities/publications" },
      {
        text: "items.news",
        path: "/activities/news",
      },
      { text: "items.videos", path: "/people?groups=fellows" },
    ],
  },
]
const { $rootStore } = useNuxtApp()
/* const goTo = useGoTo() */
const { locale } = useI18n()

// Ecosystem: supports as a featured first row, members in the rows below.
const { pending, membersRaw, supportRaw } = await useAffiliations()

const normalizeColor = (color) => {
  const named = { white: "#fff", black: "#000" }
  if (!color) return "#fff"
  const lowerColor = color.toLowerCase()
  return named[lowerColor] || color
}

const toGalleryItem = (item) => ({
  name: item.name,
  url: item.url,
  picture: item.image?.url,
  color: normalizeColor(item.image?.backgroundColor),
  location: item.locations?.[0]
    ? [item.locations[0].city, item.locations[0].country]
        .filter(Boolean)
        .join(", ")
    : null,
  category: item.category?.[0] || null,
  ror: item.ror || null,
  summary: item.summary || null,
  description: item.description || null,
})

const toGallery = (list) =>
  (list || []).filter((item) => item?.image?.url).map(toGalleryItem)

// Featured first row
const supportData = computed(() => toGallery(supportRaw.value))
// Member rows below
const memberData = computed(() => toGallery(membersRaw.value))

const statsScrollAnchor = ref(null)

function scrollToStats() {
  statsScrollAnchor.value?.scrollIntoView({ behavior: "smooth" })
}

const { researchers, nationalities, partnerInstitutions, eventsPerYear } =
  config.institute

const keyFigures = [
  //!\ TODO:: Bind to SSG content up to date
  {
    label: "key-figures.researchers-welcomed",
    value: researchers,
    url: "/fellows",
  },
  {
    label: "key-figures.nationalities",
    value: String(nationalities),
    url: "/fellows",
  },
  {
    label: "key-figures.institutions-represented",
    value: partnerInstitutions,
    url: "/about/partners",
  },
  {
    label: "key-figures.publications",
    value: "1000+",
    url: "/resources/publications",
  },
  {
    label: "key-figures.scientific-and-public-events-per-year",
    value: eventsPerYear,
    url: "/events",
  },
  {
    label: "key-figures.academic-partner-institutions",
    value: "25",
    url: "/about/partners#supports",
  },
]

onMounted(() => {
  $rootStore.search = ""
  $rootStore.page = 1
})
</script>
<style lang="scss">
.home-search-input {
  width: 100%;

  @media (min-width: 600px) {
    width: 80%;
  }

  @media (min-width: 960px) {
    width: 600px;
  }

  @media (min-width: 1280px) {
    width: 700px;
  }
}

.splash-moto--text {
  font-family: "Bodoni Moda", sans-serif !important;
  font-weight: 900;
  line-height: 1.15;
  font-size: clamp(2.5rem, 6vw, 5rem) !important;
  text-align: center;
  max-width: 20ch;
  padding-bottom: 40px;

  @media (min-width: 960px) {
    text-align: right;
  }
}

// Mobile: first section fills viewport minus topbar height
@media (max-width: 699px) {
  .scroller section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .scroller .splash {
    min-height: calc(100vh - 56px);
  }
}

.presentation-pitch p {
  font-size: 1.2rem;
}

.dark {
  position: relative;
  color: white;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
}
.light {
  color: #0b0b0b;
  background-color: white;
}

.key-figures-section {
  color: white;
}

// The global `.scroller section` rule (assets/styles/main.scss) forces every
// section to a fixed 100vh with align-items:center, which clips the member
// rows out of view. This is a tall content section, so let it grow to fit its
// content while still participating in scroll-snap.
.scroller .ecosystem-section {
  height: auto;
  min-height: calc(100vh - 64px);
  align-items: stretch;
}

.ecosystem-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6rem 0;
  background: #fff;
  overflow: hidden;

  &__overline {
    margin-bottom: 1rem;
  }

  &__rule {
    margin: 0 auto 1.75rem;
  }

  &__link {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }

  &__title {
    font-family: "Bodoni Moda", serif !important;
    font-weight: 500;
    max-width: none;
    margin-bottom: 1rem;
  }

  &__subtitle {
    max-width: 52ch;
    margin: 0 auto;
    font-size: 1.0625rem;
    line-height: 1.7;
    opacity: 0.65;
  }

  &__gallery {
    margin-top: 3rem;
    // Soft fade on the marquee edges for a polished, seamless look
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 8%,
      #000 92%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 8%,
      #000 92%,
      transparent 100%
    );
  }
}

.splash-chevron__btn {
  animation: splash-chevron-pulse 2.4s ease-in-out infinite;
  will-change: transform;
}

@keyframes splash-chevron-pulse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .splash-chevron__btn {
    animation: none;
  }
}
</style>
