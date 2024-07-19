<template>
  <v-tooltip location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn
        flat
        icon
        v-bind="props"
        target="_blank"
        :href="scholarId"
        :size="
          ['small', 'default', 'default', 'large', 'large', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      >
        <v-icon> mdi-google </v-icon>
      </v-btn>
    </template>
    <span>{{ $t("visit-the-author-google-scholar-page") }} </span>
  </v-tooltip>
</template>
<script setup>
import { useDisplay } from "vuetify"
const { name } = useDisplay()
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
