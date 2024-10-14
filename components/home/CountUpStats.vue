<template>
  <v-row>
    <v-col cols="12">
      <div class="text-h4 text-md-h2 mb-3" v-motion-slide-visible-once-bottom>
        {{ $t("by-the-numbers") }}
      </div>
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="d-flex justify-start flex-column cursor-pointer stat-col"
      v-motion-slide-visible-once-bottom
      @click="router.push(localePath('/people'))"
      v-ripple
    >
      <div class="text-overline">{{ $t("people") }}</div>
      <div class="text-h3 text-md-h1 my-3">
        <MiscAtomsCountUp
          key="active"
          v-intersection-observer="onIntersectionObserver"
          lazy
          :startAmount="0"
          :endAmount="1883"
          :duration="3"
          decimalSeparator="."
          :autoinit="true"
        ></MiscAtomsCountUp>
      </div>

      <div :class="mdAndUp ? 'text-h4' : 'text-h5'" class="count-text">
        {{ $t("people-attending-our-events-since-2011") }}
      </div>
    </v-col>

    <v-col
      cols="12"
      md="4"
      class="d-flex justify-start flex-column cursor-pointer stat-col"
      v-motion-slide-visible-once-bottom
      @click="router.push(localePath('/activities/events'))"
      v-ripple
    >
      <div class="text-overline">{{ $t("events.key") }}</div>
      <div class="text-h3 text-md-h1 my-3">
        <MiscAtomsCountUp
          key="active"
          :startAmount="0"
          :endAmount="1344"
          :duration="3"
          decimalSeparator="."
          :autoinit="true"
        ></MiscAtomsCountUp>
      </div>
      <div :class="mdAndUp ? 'text-h4' : 'text-h5'" class="count-text">
        {{ $t("events-organized-at-paris-ias") }}
      </div>
    </v-col>

    <v-col
      cols="12"
      md="4"
      class="d-flex justify-start flex-column cursor-pointer stat-col"
      v-motion-slide-visible-once-bottom
      @click="router.push(localePath('/activities/fellowships'))"
      v-ripple
    >
      <div class="text-overline">{{ $t("fellowships") }}</div>
      <div class="text-h3 text-md-h1 my-3">
        <MiscAtomsCountUp
          key="active"
          lazy
          :startAmount="0"
          :endAmount="104"
          :duration="3"
          decimalSeparator="."
          :autoinit="true"
        ></MiscAtomsCountUp>
      </div>
      <div :class="mdAndUp ? 'text-h4' : 'text-h5'" class="count-text">
        {{
          $t("fellowships-programs-and-research-projects-hosted-at-paris-ias")
        }}
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { vIntersectionObserver } from "@vueuse/components"
const { mdAndUp } = useDisplay()
const router = useRouter()
const active = ref(null)
const onIntersectionObserver = ([{ isIntersecting }]) => {
  active.value = isIntersecting
}
</script>

<style lang="scss" scoped>
.stat-col:hover .count-text {
  text-decoration: underline;
}
</style>
