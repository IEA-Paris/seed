<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-4 mx-2 mx-md-0">
    <v-col cols="12" md="4" lg="3" v-if="mdAndUp" class="pr-md-0">
      <MiscAtomsImageContainer
        cover
        :src="item.image"
        :ratio="1 / 1"
        :loading="rootStore.news.loading"
        link="news-slug"
        :slug="item._path && item._path.split('/').pop()"
      >
        <v-chip class="ma-2" style="background-color: white; color: black">{{
          $t("news.categories." + item.category)
        }}</v-chip></MiscAtomsImageContainer
      >
    </v-col>
    <v-col cols="12" md="8" lg="4" class="pl-md-6">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="
          [
            'heading, subtitle, text@5, ossein, button',
            'heading, subtitle, text@5, ossein, button',
            'heading, subtitle, text@3, ossein, button',
            'heading@2, subtitle',
            'heading@2, subtitle',
            'heading@2, subtitle',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <template v-else>
        <template v-if="smAndDown && item.category">
          <v-chip class="mb-4">{{
            $t("news.categories." + item.category)
          }}</v-chip>
          <br
        /></template>
        <NuxtLink
          v-if="renderedTitle && renderedTitle.body"
          :to="
            localePath({
              name: 'news-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-wrap text-h5 text-md-h4 text-black"
        >
          <ContentRendererMarkdown :value="renderedTitle" />
        </NuxtLink>
        <MiscMoleculesChipContainer
          :items="item.tags"
          class="mt-4"
        ></MiscMoleculesChipContainer>
        <template v-if="mdAndDown">
          <nuxt-link
            :to="
              localePath({
                name: 'activities-events-slug',
                params: { slug: getSlugFromPath(item._path || '') },
              })
            "
            class="text-black"
            v-if="renderedSummary && renderedSummary.body"
          >
            <p
              class="text-body-1 text-wrap clamped-text"
              :style="
                '-webkit-line-clamp:' +
                [5, 5, 3, 6, 10, 10][
                  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
            >
              <ContentRendererMarkdown :value="renderedSummary" /></p
          ></nuxt-link>

          <v-btn
            class="mt-4"
            variant="outlined"
            tile
            size="small"
            :to="
              localePath({
                name: 'news-slug',
                params: { slug: getSlugFromPath(item._path) },
              })
            "
          >
            {{ $t("read-more") }}
          </v-btn>
        </template>
      </template>
    </v-col>

    <v-col cols="12" lg="5" v-if="lgAndUp">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        type="text@8, ossein, button"
      ></v-skeleton-loader>

      <template v-else>
        <nuxt-link
          :to="
            localePath({
              name: 'activities-events-slug',
              params: { slug: getSlugFromPath(item._path || '') },
            })
          "
          class="text-black"
          v-if="renderedSummary && renderedSummary.body"
        >
          <p
            class="text-body-1 text-wrap clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 4, 7, 8, 10][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          >
            <ContentRendererMarkdown :value="renderedSummary" /></p
        ></nuxt-link>
        <p v-else></p>
        <v-btn
          class="mt-4"
          variant="outlined"
          tile
          :to="
            localePath({
              name: 'news-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("read-more") }}
        </v-btn>
      </template>
    </v-col>
  </v-row>
  <!-- <MiscMoleculesSearchItem></MiscMoleculesSearchItem> -->
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { getSlugFromPath } from "~/composables/useUtils"
import { useDisplay } from "vuetify"
import markdownParser from "@nuxt/content/transformers/markdown"
const localePath = useLocalePath()
const rootStore = useRootStore()
const { name, smAndDown, mdAndDown, mdAndUp, lgAndUp } = useDisplay()
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
const renderedTitle = props.item?.name
  ? await markdownParser.parse("name", props.item.name)
  : ""
const renderedSummary = props.item?.summary
  ? await markdownParser.parse("summary", props.item.summary)
  : ""
</script>

<style></style>
