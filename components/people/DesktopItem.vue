<template>
  <div class="transition-swing">
    <div v-if="isLoading">
      <!--<div v-if="$store.state.loading"> -->
      <v-skeleton-loader
        :class="index > 0 ? 'mt-6' : 'mt-12'"
        tile
        size="160"
        max-width="1000"
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
      <v-divider></v-divider>
    </div>
    <v-card v-else flat>
      <v-row :class="{ 'mt-6': index > 0 }" class="ml-3" no-gutters>
        <v-col
          v-if="mdAndUp"
          cols="3"
          lg="2"
          class="d-flex align-end flex-column"
        >
          <div class="d-flex align-center flex-column">
            <v-avatar
              :size="xl ? 'x-large' : 'large'"
              class="mt-6 mx-6 mb-1"
              tile
              color="black"
            >
              <nuxt-img
                v-if="item.image"
                alt="Avatar"
                :src="item.image"
                :height="xl ? '180' : '120'"
                :ratio="1"
              />
              <template v-else class="white--text headline author-picture">{{
                item.firstname[0] + item.lastname[0]
              }}</template>
            </v-avatar>
            <div
              class="flex-row justify-center text-center mb-3"
              style="max-width: 120px"
            >
              <AuthorSocials
                :key="item.lastname"
                :socials="socials"
              ></AuthorSocials>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="8" class="mx-3 py-6">
          <div :id="slugifyItem(item.lastname)" class="anchor"></div>
          <div
            :class="xl ? 'text-h4' : 'text-h5'"
            v-html="highlightWord(item.lastname + ' ' + item.firstname)"
          ></div>
          <div
            class="text-subtitle-2 mb-1"
            v-html="highlightWord(getTitlesAndInstitutions(item))"
          ></div>
          <div
            v-if="smAndDown"
            class="flex-row justify-center align-center mb-6"
          >
            <AuthorSocials
              :key="item.lastname"
              :socials="socials"
            ></AuthorSocials>
          </div>
          <div
            class="author-exerpt text-subtitle-1"
            v-html="highlightWord(item.exerpt)"
          ></div>
          <small v-if="item.copyright" class="muted caption"
            >Image of &copy; {{ item.caption }}</small
          >
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script setup>
import slugify from "~/assets/utils/slugify"
import {
  formatTitleAndInstitutions,
  highlight,
} from "~/assets/utils/transforms"
import { useDisplay } from "vuetify"
const { smAndDown, xl, mdAndUp } = useDisplay()
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  index: {
    required: true,
    type: Number,
  },
})
// fixture while we don't have store
const isLoading = ref(false)
const socials = computed(() => {
  return [
    ...(props.item.social_channels.website
      ? [
          {
            link: props.item.social_channels.website,
            icon: "mdi-link-variant",
            tooltip: "Visit this author website", // TODO i18n
          },
        ]
      : []),
    ...(props.item.social_channels.wikipedia
      ? [
          {
            link: props.item.social_channels.wikipedia,
            icon: "mdi-wikipedia",
            tooltip: "Check the Wikipedia page of the author",
          },
        ]
      : []),
    ...(props.item.social_channels.orcid
      ? [
          {
            link: props.item.social_channels.orcid,
            icon: "mdi-account",
            tooltip: "Visit the author Orcid page",
          },
        ]
      : []),
    ...(props.item.social_channels.google_scholar
      ? [
          {
            link: props.item.social_channels.google_scholar,
            icon: "mdi-google",
            tooltip: "Visit the author Google Scholar page",
          },
        ]
      : []),
    ...(props.item.social_channels.mendeley
      ? [
          {
            link: props.item.social_channels.mendeley,
            icon: "mdi-school",
            tooltip: "Visit the author Mendeley page",
          },
        ]
      : []),
    ...(props.item.social_channels.researchgate
      ? [
          {
            link: props.item.social_channels.researchgate,
            icon: "mdi-flask",
            tooltip: "Visit the author Researchgate page",
          },
        ]
      : []),
    ...(props.item.social_channels.linkedin
      ? [
          {
            link: props.item.social_channels.linkedin,
            icon: "mdi-linkedin",
            tooltip: "Get in touch on Linkedin",
          },
        ]
      : []),
    ...(props.item.social_channels.twitter
      ? [
          {
            link: props.item.social_channels.twitter,
            icon: "mdi-twitter",
            tooltip: "Follow this author on Twitter",
          },
        ]
      : []),
    ...(props.item.social_channels.instagram
      ? [
          {
            link: props.item.social_channels.instagram,
            icon: "mdi-instagram",
            tooltip: "Visit the author Instagram page",
          },
        ]
      : []),
  ]
})

function slugifyItem(item) {
  return slugify(item)
}

function getTitlesAndInstitutions(item) {
  return item?.positions_and_institutions?.length
    ? formatTitleAndInstitutions(item.positions_and_institutions)
    : ""
}

function highlightWord(word = "") {
  /* return $store.state.authors.search
    ? highlight(word, $store.state.authors.search || "")
    : word */
  return word
}
</script>

<style>
.author-exerpt {
  max-width: 650px;
  height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.author-picture {
  background: black;
  font-style: normal;
}
div.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}
.v-skeleton-loader__avatar {
  height: 120px !important;
  width: 120px !important;
  margin-left: 15px;
}
</style>
