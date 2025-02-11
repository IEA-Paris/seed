<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-ripple>
    <MiscAtomsImageContainer
      contain
      :src="item.image"
      :loading="rootStore.publications.loading"
      :ratio="1 / 1"
      :title="item.name"
      link="activities-publications-slug"
      :slug="getSlugFromPath(item._path)"
    >
    </MiscAtomsImageContainer>
  </v-col>
  <v-col
    cols="12"
    sm="6"
    md="8"
    lg="9"
    xl="10"
    class="px-6 cursor-pointer"
    v-ripple
    @click="
      router.push(
        localePath('/activities/publications/' + getSlugFromPath(item._path)),
      )
    "
  >
    <v-skeleton-loader
      v-if="rootStore.loading"
      type="header, ossein text@8, ossein, button , button"
    ></v-skeleton-loader>

    <template v-else>
      <div class="text-h5 text-sm-h3 text-md-h4 text-md-h4 my-6">
        <ContentRendererMarkdown :value="renderedTitle" />
      </div>

      <nuxt-link
        :to="
          localePath({
            name: 'activities-publications-slug',
            params: { slug: getSlugFromPath(item._path || '') },
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
          <ContentRendererMarkdown :value="renderedSummary" /></p
      ></nuxt-link>

      <v-btn
        class="mt-4"
        variant="outlined"
        tile
        :to="
          localePath({
            name: 'publications-slug',
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
      <v-btn
        variant="outlined"
        tile
        class="mt-4 ml-4"
        prepend-icon="mdi-web"
        :size="
          ['small', 'small', 'small', 'default', 'default', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
        >{{ $t("visit-the-publications-website") }}</v-btn
      >
    </template>
  </v-col>
  <v-divider></v-divider>
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { getSlugFromPath } from "~/composables/useUtils"
import { useDisplay } from "vuetify"
import markdownParser from "@nuxt/content/transformers/markdown"
const { name, smAndDown, mdAndDown, mdAndUp, lgAndUp } = useDisplay()

const rootStore = useRootStore()
const router = useRouter()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
const renderedSummary = props.item?.subtitle
  ? await markdownParser.parse("subtitle", props.item.subtitle)
  : ""
const renderedTitle = props.item?.name
  ? await markdownParser.parse("name", props.item.name)
  : ""
</script>

<style lang="scss"></style>
