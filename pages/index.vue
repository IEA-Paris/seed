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
            <div
              id="presentation"
              :key="locale"
              class="presentation-pitch splash-search"
              style="max-width: 600px; min-width: 30vw"
            >
              <ListMoleculesGlobalSearchInput
                key="home-search"
                type="all"
                :loading="false"
                class="mb-6 light"
              ></ListMoleculesGlobalSearchInput>
            </div>
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

const today = new Date()
/* const academicYear = ref(
  today.getMonth() > 6
    ? today.getFullYear() + "-" + (today.getFullYear() + 1)
    : today.getFullYear() - 1 + "-" + today.getFullYear(),
) */

const animationText = computed(() => `text-${locale.value}`)

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
/* 
const variables = computed(() => ({
  options: {
    skip: 0,
    limit: 8,
    sortBy: ["start"],
    sortDesc: false,
    filters: JSON.stringify({}),
  },
  appId: "iea",
  lang: locale.value,
}))

const { data, error, refresh } = await useAsyncQuery(
  $queries.events.list,
  variables,
)
console.log("variables: ", variables)
console.log("data: ", data.value)

if (error.value) {
  console.log("GraphQL error:", error.value)
}
const upcomingEvents = computed(() => data.value?.listEvents?.items || [])
 */
//watch(locale, () => {
//  refresh()
//})

/* if (!upcomingEvents) {
  throw createError({
    statusCode: 404,
    message: "Item not found in response",
  })
} */

onMounted(() => {
  $rootStore.search = ""
  $rootStore.page = 1
})
</script>
<style lang="scss">
.splash-moto--text {
  font-family: "Roboto", sans-serif !important;
  text-align: center;

  // Mobile: fluid font size, proportioned to screen width
  @media (max-width: 959px) {
    font-size: clamp(1.6rem, 7vw, 2.6rem) !important;
    line-height: 1.25;
    padding: 0 20px;
  }

  @media (min-width: 960px) {
    text-align: right;
    padding-bottom: 40px;
    max-width: 700px;
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
