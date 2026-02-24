<template>
  <div class="scroller">
    <section class="d-flex flex-column justify-center">
      <v-container fluid>
        <v-row class="d-flex justify-center" ref="about" :key="locale">
          <v-col cols="12" md="6" class="d-flex justify-end my-6">
            <div
              :key="animationText"
              class="text-h2 pr-6 splash-moto splash-moto--text"
            >
              {{ $t("moto") }}
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="my-6 d-md-flex align-center align-md-end"
          >
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
          @click="scrollToFooter"
          variant="outlined"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </section>

    <section class="key-figures-section">
      <HomeKeyFigures :src="keyFigures" :duration="2.5" />
    </section>

    <div ref="footerScrollAnchor">
      <NavigationFooter :isSnapScroll="false" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "about",
})
import config from "@/static.config"

const { $rootStore, $queries, $router } = useNuxtApp()
/* const goTo = useGoTo() */
const { locale } = useI18n()
/* const presentation = ref("/pages/" + locale.value + "/institute_presentation") 

const carousel = ref(true)*/

/* const about = ref(null) */
// const events = ref(null)
// const numbers = ref(null)

const footerScrollAnchor = ref(null)

function scrollToFooter() {
  footerScrollAnchor.value?.scrollIntoView({ behavior: "smooth" })
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
@keyframes splash-from-left {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes splash-from-right {
  from {
    opacity: 0;
    transform: translateX(60px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes splash-from-bottom {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Mobile-only: elegant reveal with a subtle upward drift
@keyframes splash-mobile-reveal {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
    letter-spacing: 0.04em;
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    letter-spacing: normal;
  }
}

.splash-moto {
  opacity: 0;
  animation: splash-from-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;

  @media (max-width: 959px) {
    animation: splash-mobile-reveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.2s
      forwards;
  }
}

.splash-moto--text {
  font-family: "Roboto", sans-serif !important;
  text-align: center;
  padding: 0 24px;

  // Mobile: fluid font size, proportioned to screen width
  @media (max-width: 959px) {
    font-size: clamp(1.6rem, 7vw, 2.6rem) !important;
    line-height: 1.25;
    padding: 0 20px;
  }

  @media (min-width: 960px) {
    text-align: right;
    padding: 0;
    max-width: 500px;
  }
}

.splash-search {
  opacity: 0;
  animation: splash-from-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.65s
    forwards;

  @media (max-width: 959px) {
    animation: splash-mobile-reveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.55s
      forwards;
  }
}

.splash-chevron {
  opacity: 0;
  animation: splash-from-bottom 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1s forwards;
}

// Mobile: first section fills viewport minus topbar height
@media (max-width: 699px) {
  .scroller section:first-child {
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.presentation-pitch p {
  font-size: 1.2rem;
}

.dark {
  background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 50%, #0b0b0b 100%);
  position: relative;
  color: white;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(var(--primary-rgb), 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
}
.light {
  color: #0b0b0b;
  background-color: white;
}

.key-figures-section {
  background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 50%, #0b0b0b 100%);
  color: white;
}
</style>
