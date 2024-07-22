<template>
  <v-tooltip v-for="item in socials" :key="item.id" :location="location">
    <template v-slot:activator="{ props }">
      <v-btn
        flat
        icon
        v-bind="props"
        target="_blank"
        :href="getSocialId(item)"
        :size="
          ['small', 'default', 'default', 'large', 'large', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      >
        <v-icon> {{ getProfileIcon(item) }}</v-icon>
      </v-btn>
    </template>
    <span>{{ getTooltipText(item) }}</span>
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

const getSocialId = (item) => {
  if (item.name === "linkedin") {
    return `https://www.linkedin.com/in/${item.id}`
  } else if (item.name === "twitter") {
    return `https://x.com/${item.id}`
  } else if (item.name === "orcid") {
    return `https://orcid.org/${item.id}`
  } else if (item.name === "scholar") {
    return `https://scholar.google.com/${item.id}`
  } else if (item.name === "wikipedia") {
    return `https://fr.wikipedia.org/${item.id}`
  } else if (item.name === "researchgate") {
    return `https://www.researchgate.net/${item.id}`
  }
}

const getProfileIcon = (item) => {
  if (item.name === "linkedin") {
    return "mdi-linkedin"
  } else if (item.name === "twitter") {
    return "mdi-account"
  } else if (item.name === "orcid") {
    return "mdi-account"
  } else if (item.name === "scholar") {
    return " mdi-google"
  } else if (item.name === "wikipedia") {
    return "mdi-wikipedia"
  } else if (item.name === "researchgate") {
    return "mdi-account"
  }
}
const getTooltipText = (item) => {
  if (item.name === "linkedin") {
    return "linkedIn"
  } else if (item.name === "orcid") {
    return "orcid"
  } else if (item.name === "twitter") {
    return "twitter"
  } else if (item.name === "scholar") {
    return "scholar"
  } else if (item.name === "wikipedia") {
    return "wikipedia"
  } else if (item.name === "researchgate") {
    return "researchgate"
  }
}
</script>

<style lang="scss"></style>
