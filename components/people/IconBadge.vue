<template>
  <v-tooltip v-for="(id, name) in socials[0]" :key="name" :location="location">
    <template v-slot:activator="{ props }">
      <v-btn
        flat
        icon
        v-bind="props"
        target="_blank"
        :href="getSocialId(name, id)"
        :size="
          ['small', 'default', 'default', 'large', 'large', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      >
        <v-icon> {{ getProfileIcon(name) }}</v-icon>
      </v-btn>
    </template>
    <span>{{ getTooltipText(name) }}</span>
  </v-tooltip>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name } = useDisplay()

const props = defineProps({
  socials: {
    type: Array,
    required: true,
  },
  location: {
    type: String,
    default: "bottom",
  },
})

const getSocialId = (name, id) => {
  switch (name) {
    case "linkedin":
      return `https://www.linkedin.com/in/${id}`
    case "twitter":
      return `https://x.com/${id}`
    case "orcid":
      return `https://orcid.org/${id}`
    case "scholar":
      return `https://scholar.google.com/${id}`
    case "wikipedia":
      return `https://fr.wikipedia.org/${id}`
    case "researchgate":
      return `https://www.researchgate.net/${id}`
  }
}

const getProfileIcon = (name) => {
  switch (name) {
    case "linkedin":
      return "mdi-linkedin"
    case "twitter":
      return "mdi-twitter"
    case "orcid":
      return "mdi-account"
    case "scholar":
      return "mdi-google"
    case "wikipedia":
      return "mdi-wikipedia"
    case "researchgate":
      return "mdi-account"
  }
}

const getTooltipText = (name) => {
  switch (name) {
    case "linkedin":
      return "LinkedIn"
    case "orcid":
      return "Orcid"
    case "twitter":
      return "Twitter"
    case "scholar":
      return "Scholar"
    case "wikipedia":
      return "Wikipedia"
    case "researchgate":
      return "ResearchGate"
  }
}
</script>

<style lang="scss"></style>
