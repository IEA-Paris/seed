<template>
  <v-col cols="12" md="6" class="">
    <div v-ripple class="border-thin pa-6">
      <FellowshipBadges :item="item"></FellowshipBadges>
      <div class="d-flex">
        <nuxt-link
          :to="
            localePath({
              name: 'activities-fellowships-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-h4 text-black text-wrap mt-4 pb-4"
        >
          {{ item.title }}
        </nuxt-link>
      </div>
      <div class="d-flex">
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
            class="text-wrap clamped-text"
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
        :items="[...fellowshipType, ...item.disciplines]"
        class="mt-2"
      ></MiscMoleculesChipContainer>
    </div>
  </v-col>
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
const fellowshipType = ref([
  ...(props.item.fellowshipType === 2
    ? [{ name: "short-stay" }, { name: "in-groups" }]
    : [
        {
          name: ["long-stay", "short-stay"][props.item.fellowshipType],
        },
      ]),
])
</script>
<style lang="scss"></style>
