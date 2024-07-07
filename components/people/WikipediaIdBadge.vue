<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        target="_blank"
        :href="'https://www.wikipedia.org/' + pageId"
      >
        <v-icon>mdi-wikipedia </v-icon>
      </v-btn>
    </template>
    <span>{{ $t("check-the-wikipedia-page-of-the-author") }}</span>
  </v-tooltip>
</template>
<script setup>
const props = defineProps({
  pageId: {
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
