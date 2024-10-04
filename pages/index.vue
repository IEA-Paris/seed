<template>
  <!--   <v-btn color="success" @click="rootStore.setLoading(!rootStore.loading)"
    >ext</v-btn
  > -->
  <div class="scroller">
    <HomeCarousel class="carousel" :featured="featured"></HomeCarousel>
    <div class="d-flex justify-center mt-n12">
      <v-btn
        color="default"
        icon
        flat
        @click="about?.$el.scrollIntoView({ behavior: 'smooth' })"
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
    <section class="d-flex flex-column justify-center">
      <v-container fluid>
        <v-divider inset class="mt-3 mb-12"></v-divider>
        <v-row class="d-flex align-center justify-center" ref="about">
          <v-row no-gutters>
            <v-col cols="12" md="6" class="d-flex justify-end">
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
                class="text-h4 text-sm-h3 text-md-h2 mt-6 pr-6"
                :class="mdAndUp ? 'text-right' : 'text-left'"
                :style="mdAndUp ? 'max-width: 500px' : 'text-left'"
              >
                {{ $t("moto") }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
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
                id="presentation"
                class="d-flex align-center justify-center pa-6 presentation-pitch"
                style="max-width: 600px"
              >
                <ContentDoc class="text-body-2" :path="presentation" />
              </v-card>
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-12"></v-divider>
        </v-row>
      </v-container>
      <div class="d-flex justify-center">
        <v-btn
          color="default"
          icon
          flat
          @click="events?.$el.scrollIntoView({ behavior: 'smooth' })"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </div>
    </section>
    <section class="d-flex flex-column justify-center align-center">
      <v-container>
        <MiscAtomsSlidingCarousel type="events" key="events" ref="events">
          {{ $t("upcoming-events") }}
        </MiscAtomsSlidingCarousel>
        <div class="d-flex justify-center">
          <v-btn
            color="default"
            icon
            flat
            @click="numbers?.$el.scrollIntoView({ behavior: 'smooth' })"
            class="justify-self-center"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </div></v-container
      >
    </section>
    <section class="d-flex flex-column justify-center">
      <v-container>
        <v-row class="d-flex align-center justify-center" ref="numbers">
          <v-col cols="12" md="10" class="justify-center">
            <HomeCountUpStats></HomeCountUpStats>
          </v-col>
          <v-divider class="mt-3 mb-12"></v-divider>
          <v-btn
            color="default"
            icon
            flat
            @click="fellows?.$el.scrollIntoView({ behavior: 'smooth' })"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </section>
    <section class="d-flex flex-column justify-center align-center">
      <v-container>
        <MiscAtomsSlidingCarousel type="people" key="people" lazy ref="fellows">
          {{ $t("discover-our-0-fellows", [academicYear]) }}
        </MiscAtomsSlidingCarousel></v-container
      >
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
onMounted(() => {
  // init defaults from a possible previous session
  rootStore.setDefaults()
})
</script>
<style lang="scss">
.presentation-pitch p {
  font-size: 1.2rem;
}
</style>
