<template>
  <v-row class="my-8 mx-2 pa-6 border-thin" no-gutters>
    <v-col cols="12" md="8">
      <div class="">
        <div>
          <nuxt-link
            :to="
              localePath({
                name: 'activities-fellowships-slug',
                params: { slug: getSlugFromPath(item._path) },
              })
            "
            class="text-h4 text-black text-wrap mt-4"
          >
            {{ item.title }}
          </nuxt-link>

          <nuxt-link
            :to="
              localePath({
                name: 'activities-fellowships-slug',
                params: { slug: getSlugFromPath(item._path) },
              })
            "
            class="text-black"
          >
            <p
              class="text-body-1 text-wrap clamped-text"
              :style="
                '-webkit-line-clamp:' +
                [5, 5, 5, 10, 12, 14][
                  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
            >
              {{ item.description }}
            </p></nuxt-link
          >
        </div>
        <MiscMoleculesChipContainer
          :items="item.tags"
          class="mt-n2"
        ></MiscMoleculesChipContainer>
        <div class="d-flex mt-4">
          <FellowshipBadges :item="item"></FellowshipBadges>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
const { locale } = useI18n()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

import { useDisplay } from "vuetify"
// import { FellowshipBadges } from "#build/components"
const { smAndUp, mdAndUp, name } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
<style lang="scss"></style>
