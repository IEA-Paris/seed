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
          @click="scrollToStats"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </section>

    <section ref="statsScrollAnchor" class="key-figures-section section-dark">
      <HomeKeyFigures :src="keyFigures" :duration="2.5" />
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
/* const presentation = ref("/pages/" + locale.value + "/institute_presentation")

const carousel = ref(true)*/

/* const about = ref(null) */
// const events = ref(null)
// const numbers = ref(null)

const statsScrollAnchor = ref(null)

function scrollToStats() {
  statsScrollAnchor.value?.scrollIntoView({ behavior: "smooth" })
}

const { researchers, nationalities, partnerInstitutions, eventsPerYear } =
  config.institute

const keyFigures = [
  {
    label: "key-figures.researchers-welcomed",
    value: researchers,
    url: "/people?groups=fellows",
  },
  {
    label: "key-figures.nationalities",
    value: String(nationalities),
    url: "/people?groups=fellows",
  },
  {
    label: "key-figures.institutions-represented",
    value: partnerInstitutions,
    url: "/about/network",
  },
  {
    label: "key-figures.publications",
    value: "1000+",
    url: "/activities/publications",
  },
  {
    label: "key-figures.scientific-and-public-events-per-year",
    value: eventsPerYear,
    url: "/activities/events",
  },
  {
    label: "key-figures.academic-partner-institutions",
    value: "25",
    url: "/about/network#our-partners",
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
</style>
