<template>
  {{ name }}
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-md-6 ml-md-1">
    <v-col cols="12" md="3" v-if="mdAndUp">
      <div class="overflow-hidden">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <div class="ml-md-8">
        <NuxtLink to="/" class="text-wrap text-h4 text-black">
          {{ item.title }}</NuxtLink
        >

        <ContentRenderer
          :value="item"
          class="text-body-1 clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 4, 6, 9, 9][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />
        <div class="mt-lg-2 mt-xl-0 d-flex">
          <div class="mr-md-2 mr-lg-4">
            <PeopleOrcidIdBadge :orcId="item.socials.orcid" />
          </div>
          <div class="mr-md-2 mr-lg-4">
            <PeopleGoogleScholarIdBadge :scholarId="item.socials.scholar" />
          </div>
          <div class="mr-md-2 mr-lg-4">
            <PeopleLinkedinIdBadge :profilId="item.socials.linkedin" />
          </div>
          <div class="mr-md-2 mr-lg-4">
            <PeopleWikipediaIdBadge :pageId="item.socials.wikipedia" />
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="1"></v-col>
  </v-row>
</template>
<script setup>
import { highlight } from "~/assets/utils/transforms"
import { useDisplay } from "vuetify"
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()

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
console.log("toto", props.item.socials)
</script>

<style lang="scss"></style>
