<template>
  <v-col cols="12" md="6" class="">
    <div v-ripple class="border-thin pa-6">
      <FellowshipsBadges :item="item"></FellowshipsBadges>
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
          {{ item.name }}
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
        :items="[
          $t('list.filters.fellowships.duration.' + item.fellowshipType),
          ...(props.item && props.item.disciplines
            ? props.item.disciplines.map((discipline) => discipline.name)
            : []),
        ]"
        class="mt-2"
      ></MiscMoleculesChipContainer>
    </div>
  </v-col>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const i18n = useI18n()
const { locale, locales, messages } = useI18n()

import { useDisplay } from "vuetify"
// import { FellowshipBadges } from "#build/components"
import { getSlugFromPath } from "~/composables/useUtils"
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
onMounted(() => {
  console.log("fellowshipType: ", props.item.fellowshipType)
})
</script>
<style lang="scss"></style>
