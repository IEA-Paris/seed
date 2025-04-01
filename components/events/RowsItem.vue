<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="py-8 px-6 highlight-on-hover" no-gutters>
    <v-col cols="12" md="1">
      <MiscAtomsDateStamp
        v-if="item.start"
        :loading="rootStore.events.loading"
        :dateStart="item.start"
        :dateStop="item.stop"
        class="pr-6 mt-md-2"
      />
    </v-col>
    <v-col cols="12" md="7" class="px-md-6 mt-6 mt-md-0">
      <v-row no-gutters>
        <v-col cols="12" class="pr-lg-6">
          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.events.loading"
            :type="
              [
                'heading, subtitle, text@6,subtitle, text,  ossein,  button, button',
                'heading, subtitle, text@6,subtitle, text,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
              ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
            "
          >
          </v-skeleton-loader>

          <div v-else>
            <nuxt-link
              :to="
                localePath({
                  name: 'activities-events-slug',
                  params: { slug: getSlugFromPath(item._path || '') },
                })
              "
              v-if="item.name"
              class="text-h4 text-black text-wrap mt-4"
            >
              {{ item.name }}
              <!--       <ContentRendererMarkdown :value="renderedTitle" /> -->
            </nuxt-link>
            <div class="mt-2 text-h6 text-overline font-weight-black">
              {{ $t("list.filters.events.category." + item.category) }}
            </div>

            <p
              class="text-wrap clamped-text"
              :style="
                '-webkit-line-clamp:' +
                [5, 5, 5, 10, 12, 14][
                  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
            >
              <ContentRendererMarkdown
                v-if="renderedSummary?.body"
                :value="renderedSummary"
              />
            </p>

            <div class="d-flex flex-row align-center flex-wrap" v-if="lgAndUp">
              <EventsBadges :item></EventsBadges>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
        class="d-flex flex-row align-center flex-wrap"
        no-gutters
        v-if="mdAndDown"
      >
        <v-col cols="12">
          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.events.loading"
            :type="
              ['article, heading, text, heading, text, button, button'][
                ['md'].indexOf(name || 'md')
              ]
            "
          >
          </v-skeleton-loader>

          <div v-else><EventsBadges :item="item"></EventsBadges></div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4">
      <MiscAtomsImageContainer
        cover
        :slug="getSlugFromPath(item._path || '')"
        link="activities-events-slug"
        :loading="rootStore.events.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
      />
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
import { getSlugFromPath } from "~/composables/useUtils"
// import markdownParser from "@nuxt/content/transformers/markdown"
import { useRenderedMarkdown } from "~/composables/useRenderedMarkdown"

const { locale } = useI18n()
const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()
const localePath = useLocalePath()
const rootStore = useRootStore()

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

const renderedSummary = useRenderedMarkdown(
  () => props.item?.summary,
  "summary",
)
</script>
