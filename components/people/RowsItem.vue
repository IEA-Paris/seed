<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-6 ml-md-1 px-3 px-md-0">
    <v-col cols="12" md="3" v-if="mdAndUp">
      <MiscAtomsImageContainer
        cover
        v-if="item.image"
        :loading="rootStore.people.loading"
        :src="item.image"
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="getSlugFromPath(item._path)"
        link="people-slug"
      >
        <PeopleGroupBadges :item="item" />
      </MiscAtomsImageContainer>
    </v-col>

    <v-col cols="12" md="8">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        :type="
          [
            'heading, subtitle, text@5',
            'heading, subtitle, text@5',
            'heading, subtitle, text@3',
            'heading, subtitle, text@6',
            'heading, subtitle, text@9',
            'heading, subtitle, text@9',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <div class="ml-md-8" v-else>
        <NuxtLink
          :to="
            localePath({
              name: 'people-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-wrap text-h5 text-md-h4 text-black mb-2"
        >
          {{ item.name }}
        </NuxtLink>
        <MiscAtomsSocials
          v-if="item.socials"
          :socials="item.socials"
          class="my-2"
        />
        <NuxtLink
          :to="
            localePath({
              name: 'people-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-wrap text-h4 text-black"
        >
          <div class="text-body-1 clamped-text mt-n3">
            <ContentRendererMarkdown :value="renderedBiography" />
          </div>
        </NuxtLink>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
import markdownParser from "@nuxt/content/transformers/markdown"
import { getSlugFromPath } from "~/composables/useUtils"
const { name, mdAndUp } = useDisplay()
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
const renderedBiography = props.item?.biography
  ? await markdownParser.parse("biography", props.item.biography)
  : ""
</script>
