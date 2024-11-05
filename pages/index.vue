<template>
  <div class="scroller">
    <!--   <v-btn color="success" @click="rootStore.setLoading(!rootStore.loading)"
    >ext</v-btn
  > -->
    <HomeCarousel
      v-if="carousel"
      class="carousel"
      :featured="featured"
    ></HomeCarousel>
    <HomeCarouselAlt
      v-else
      class="carousel"
      :featured="featured"
    ></HomeCarouselAlt>
    <div class="d-flex justify-center mt-n12">
      <v-switch label="" v-model="carousel"></v-switch>
      <v-btn
        color="default"
        icon
        flat
        @click="about?.$el.scrollIntoView({ behavior: 'smooth' })"
        variant="outlined"
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
    <section class="d-flex flex-column justify-center dark">
      <v-container fluid>
        <v-row
          class="d-flex align-center justify-center"
          ref="about"
          no-gutters
        >
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
          <v-col cols="12" md="6" class="my-6">
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
              color="transparent"
              flat
              id="presentation"
              class="d-flex align-center justify-center px-6 pb-6 pt-0 mt-md-6 presentation-pitch"
              style="max-width: 600px"
            >
              <ContentDoc :path="presentation" />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="d-flex justify-center">
        <v-btn
          color="default"
          icon
          flat
          @click="events?.$el.scrollIntoView({ behavior: 'smooth' })"
          variant="outlined"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </section>
    <section class="d-flex flex-column justify-center align-center">
      <v-container>
        <MiscAtomsSlidingCarousel
          :items="upcomingEvents"
          key="events"
          ref="events"
          type="events"
          :loading="false"
        >
          <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
            {{ $t("upcoming-events") }}
          </div>
        </MiscAtomsSlidingCarousel>
        <div class="d-flex justify-center">
          <v-btn
            color="default"
            icon
            flat
            @click="numbers?.$el.scrollIntoView({ behavior: 'smooth' })"
            class="justify-self-center"
            variant="outlined"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </div>
      </v-container>
    </section>
    <section class="d-flex flex-column justify-center dark">
      <v-container>
        <v-row
          class="d-flex align-center justify-center flex-column"
          ref="numbers"
        >
          <v-col cols="12" md="10" class="justify-center">
            <HomeCountUpStats></HomeCountUpStats>
          </v-col>
          <v-btn
            color="default"
            icon
            flat
            @click="fellows?.$el.scrollIntoView({ behavior: 'smooth' })"
            variant="outlined"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </section>
    <section class="d-flex flex-column justify-center align-center">
      <v-container>
        <MiscAtomsSlidingCarousel
          :items="upcomingFellows"
          type="people"
          key="upcomingFellows"
          ref="fellows"
          :loading="false"
        >
          <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
            {{ $t("discover-our-0-fellows", [academicYear]) }}
          </div>
        </MiscAtomsSlidingCarousel>
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
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const router = useRouter()
const { smAndUp, mdAndUp } = useDisplay()
const localePath = useLocalePath()
/* const goTo = useGoTo() */
const config = useAppConfig()
const { locale } = useI18n()
const presentation = ref("/pages/" + locale.value + "/institute_presentation")

const carousel = ref(true)

const about = ref(null)
const events = ref(null)
const numbers = ref(null)
const fellows = ref(null)

const today = new Date()
const academicYear = ref(
  today.getMonth() > 6
    ? today.getFullYear() + "-" + (today.getFullYear() + 1)
    : today.getFullYear() - 1 + "-" + today.getFullYear(),
)
const { data: featured } = await useAsyncData("featured-list", () =>
  queryContent("/news/" + locale.value)
    .where({ pinned: true })
    .sort("date", "desc")
    .limit(3)
    .find(),
)

const { data: upcomingEvents } = await useAsyncData("event-list", () =>
  queryContent("/events/" + locale.value)
    .where({ outside: false })
    .sort("date", "desc")
    .limit(12)
    .find(),
)
const { data: upcomingFellows } = await useAsyncData("fellow-list", () =>
  queryContent("/people/" + locale.value)
    // .where({ outside: false })
    // .sort("date", "desc")
    .limit(12)
    .find(),
)

onMounted(() => {
  // init defaults from a possible previous session
  rootStore.setDefaults()
})
</script>
<style lang="scss">
.presentation-pitch p {
  font-size: 1.2rem;
}

.dark {
  background-color: #0b0b0b;
  color: white;
}
</style>
