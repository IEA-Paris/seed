<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        target="_blank"
        :href="'https://scholar.google.com/' + scholarId"
      >
        <v-icon> mdi-google </v-icon>
      </v-btn>
    </template>
    <span>{{ $t("visit-the-author-google-scholar-page") }} </span>
  </v-tooltip>
</template>
<script setup>
const props = defineProps({
  scholarId: {
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
