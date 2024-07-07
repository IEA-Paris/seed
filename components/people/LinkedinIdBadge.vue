<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        target="_blank"
        :href="'https://www.linkedin.com/' + profilId"
      >
        <v-icon> mdi-linkedin </v-icon>
      </v-btn>
    </template>
    <span>{{ $t("get-in-touch-on-linkedin") }}</span>
  </v-tooltip>
</template>
<script setup>
const props = defineProps({
  profilId: {
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
