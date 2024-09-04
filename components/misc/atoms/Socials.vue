<template>
  <v-row no-gutters>
    <v-col>
      <v-tooltip
        v-for="(value, key, index) in socials"
        :key="key + value"
        :location="location"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            flat
            icon
            v-bind="props"
            target="_blank"
            :href="getSocialId(key, value)"
            :size="
              ['small', 'small', 'small', 'default', 'large', 'large'][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          >
            <v-icon> {{ getProfileIcon(key) }}</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("socials." + key) }}</span>
      </v-tooltip>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { name } = useDisplay();

const props = defineProps({
  socials: {
    type: Object,
    required: true,
  },
  location: {
    type: String,
    default: "bottom",
  },
});

const getSocialId = (name, id) => {
  switch (name) {
    case "linkedin":
      return `https://www.linkedin.com/in/${id}`;
    case "twitter":
      return `https://x.com/${id}`;
    case "orcid":
      return `https://orcid.org/${id}`;
    case "scholar":
      return `https://scholar.google.com/${id}`;
    case "wikipedia":
      return `https://fr.wikipedia.org/${id}`;
    case "researchgate":
      return `https://www.researchgate.net/${id}`;
  }
};

const getProfileIcon = (name) => {
  switch (name) {
    case "linkedin":
      return "mdi-linkedin";
    case "twitter":
      return "mdi-twitter";
    case "orcid":
      return "mdi-account";
    case "scholar":
      return "mdi-google";
    case "wikipedia":
      return "mdi-wikipedia";
    case "researchgate":
      return "mdi-account";
  }
};
</script>

<style lang="scss"></style>
