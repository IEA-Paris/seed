<template>
  <div class="scroller">
    <!--   <v-btn color="success" @click="$rootStore.setLoading(!$rootStore.loading)"
    >ext</v-btn
  > -->

    <section class="d-flex flex-column justify-center dark">
      <v-container fluid>
        <v-row class="d-flex justify-center" ref="about">
          <v-col cols="12" md="6" class="d-flex justify-end my-6">
            <div
              v-motion
              :initial="{
                opacity: 0,
                x: -100,
              }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: {
                  type: 'slide',
                  stiffness: '100',
                  delay: 500,
                },
              }"
              class="text-h4 text-sm-h3 text-md-h2 pr-6"
              :class="mdAndUp ? 'text-right' : 'text-left'"
              :style="mdAndUp ? 'max-width: 500px' : 'padding: 0 24px'"
            >
              {{ $t("moto") }}
            </div>
          </v-col>
          <v-col cols="12" md="6" class="my-6 d-flex align-end">
            <div
              v-motion
              :initial="{
                opacity: 0,
                x: 100,
              }"
              :enter="{
                opacity: 1,
                x: 0,
                transition: {
                  type: 'slide',
                  stiffness: '100',
                  delay: 1000,
                },
              }"
              id="presentation"
              class="presentation-pitch f-flex justify-end align-end"
              style="max-width: 600px"
            >
              <!--     <v-img
                src="/logo_b&w.svg"
                contain
                width="150"
                class="ma-6"
              ></v-img> -->
              <ListAtomsSearchInput
                type="all"
                :loading="false"
                class="mb-6 light"
              ></ListAtomsSearchInput>
              <v-btn-toggle tile variant="outlined" divided theme="dark">
                <v-btn :to="localePath('activities-events')">{{
                  $t("items.events", 2)
                }}</v-btn>
                <v-btn :href="localePath('/people?groups=fellows')">{{
                  $t("fellows")
                }}</v-btn>
                <v-btn :href="localePath('activities-projects')">{{
                  $t("items.projects", 2)
                }}</v-btn>
                <v-btn :href="localePath('activities-publications')">{{
                  $t("items.publications")
                }}</v-btn>
              </v-btn-toggle>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div
        class="d-flex justify-center"
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            type: 'slide',
            stiffness: '100',
            delay: 1200,
          },
        }"
      >
        <v-btn
          color="default"
          icon
          flat
          @click="scrollToEvents"
          variant="outlined"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </section>
    <section class="d-flex flex-column justify-center align-center">
      <!--       <ListOrganismsList
        type="people"
        customView="slider"
        :headless="true"
      ></ListOrganismsList> -->

      <v-container>
        <div ref="eventsScrollAnchor">
          <MiscAtomsSlidingCarousel
            :items="upcomingEvents"
            key="events"
            type="events"
            :loading="false"
          >
            <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
              {{ $t("upcoming-events") }}
            </div>
          </MiscAtomsSlidingCarousel>
        </div>
        <!--  <ListOrganismsSlider type="events" /> -->

        <div ref="numbersScrollAnchor" class="d-flex justify-center">
          <v-btn
            color="default"
            icon
            flat
            @click="scrollToNumbers"
            class="justify-self-center"
            variant="outlined"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
      </v-container>
    </section>

    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
definePageMeta({
  layout: "about",
})
const { $rootStore, $queries } = useNuxtApp()
const { mdAndUp } = useDisplay()
const localePath = useLocalePath()
/* const goTo = useGoTo() */
const { locale } = useI18n()
const presentation = ref("/pages/" + locale.value + "/institute_presentation")

const carousel = ref(true)

const about = ref(null)
// const events = ref(null)
// const numbers = ref(null)

const eventsScrollAnchor = ref(null)
const numbersScrollAnchor = ref(null)

function scrollToEvents() {
  eventsScrollAnchor.value?.scrollIntoView({ behavior: "smooth" })
}

function scrollToNumbers() {
  numbersScrollAnchor.value?.scrollIntoView({ behavior: "smooth" })
}

const today = new Date()
/* const academicYear = ref(
  today.getMonth() > 6
    ? today.getFullYear() + "-" + (today.getFullYear() + 1)
    : today.getFullYear() - 1 + "-" + today.getFullYear(),
) */

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

const { data, error } = await useAsyncQuery($queries.events.list, variables)
console.log("variables: ", variables)
console.log("data: ", data.value)

if (error.value) {
  console.log("GraphQL error:", error.value)
}
const upcomingEvents = computed(() => data.value?.listEvents?.items || [])

watch(locale, () => {
  refresh()
})

/* if (!upcomingEvents) {
  throw createError({
    statusCode: 404,
    message: "Item not found in response",
  })
} */
onMounted(() => {
  // init defaults from a possible previous session
  // $rootStore.setDefaults()
})
</script>
<style lang="scss">
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
</style>
