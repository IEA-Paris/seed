<template>
  <HomeCarousel class="carousel" :featured="featured"></HomeCarousel>
  <section>
    <v-container>
      <v-divider inset class="mt-3 mb-12"></v-divider>
      <v-row justify-center align-center>
        <v-col cols="12" md="5" lg="4">
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
            class="text-h4 text-md-h2 mt-6"
            :class="mdAndUp ? 'text-right' : 'text-left'"
          >
            {{ presentation[0].title }}
          </div></v-col
        >
        <v-col cols="12" md="7" lg="8">
          <v-card
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
            flat
            class="d-flex align-center justify-center pa-6 presentation-pitch"
          >
            <ContentDoc
              class="text-body-2"
              :path="
                '/pages/' + $i18n.locale.value + '/institute_presentation'
              "
          /></v-card>
        </v-col>
        <v-divider class="mt-3 mb-12"></v-divider>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row justify-center align-center>
        <v-col cols="12">
          <div class="text-h2 my-12" v-motion-slide-visible-once-bottom>
            {{ $t("upcoming-events") }}
          </div>
          <EventsListContainer :events="events"></EventsListContainer
        ></v-col>
        <!--   <v-col cols="4" v-if="smAndUp">
            <ActionsSmallContainer :action="action"></ActionsSmallContainer>
          </v-col> -->
        <v-divider class="mt-3 mb-12"></v-divider>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12" class="mb-12">
          <HomeCountUpStats></HomeCountUpStats>
        </v-col>
        <v-divider class="mt-3 mb-12"></v-divider>
      </v-row>
    </v-container>
  </section>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12" class="mb-12">
          <!--      <PeopleSlidingGroup :items="fellows">
            <div class="text-h2" v-motion-slide-visible-once-bottom>
              {{ $t("discover-our-0-fellows", ["2023-2024"]) }}
            </div></PeopleSlidingGroup
          > -->
        </v-col>
        <v-divider class="mt-3 mb-12"></v-divider>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { debounce } from "~/composables/debounce"

const router = useRouter()
const { smAndUp, mdAndUp } = useDisplay()
const localePath = useLocalePath()
/* const goTo = useGoTo() */

const config = useAppConfig()
const { locale } = useI18n()

const { $i18n } = useNuxtApp()
const { data: featured } = await useAsyncData("featured-list", () =>
  queryContent("/carousel/" + $i18n.locale.value).find()
)
const { data: events } = await useAsyncData("event-list", () =>
  queryContent("/event/" + $i18n.locale.value)
    .sort({ date: 1 })
    .find()
)
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
)
const { data: fellows } = await useAsyncData("fellows", () =>
  queryContent("/fellows/" + $i18n.locale.value).find()
)
const { data: presentation } = await useAsyncData("presentation", () =>
  queryContent("/pages/" + $i18n.locale.value + "/institute_presentation")
    .limit(1)
    .find()
)
</script>
<style lang="scss">
.presentation-pitch p {
  font-size: 1.2rem;
}
.scroller {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
  section,
  .carousel {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    overflow-y: scroll;

    scroll-padding-top: 64px;
    scroll-padding-bottom: 100vh;
  }
  section {
    height: 100vh;
    display: flex;
    align-items: center;
  }
  .carousel {
    height: 100vh;
  }
}
</style>
