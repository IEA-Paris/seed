<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        target="_blank"
        :href="'https://orcid.org/' + orcId"
      >
        <v-icon> mdi-account </v-icon>
      </v-btn>
    </template>
    <span>{{ $t("visit-the-author-orcid-page") }}</span>
  </v-tooltip>
</template>
<script setup>
const props = defineProps({
  orcId: {
    type: String,
    required: true,
  },
  small: {
    type: Boolean,
    default: true,
    required: false,
  },
})
</script>
<style lang="scss"></style>
