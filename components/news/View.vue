<template>
  {{ name }}
  <v-row>
    <v-col cols="12"> {{ item.title }}</v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped></style>
