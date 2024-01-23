<template>
  <v-card class="d-flex flex-row pa-6 align-start" :to="localePath(item.link)">
    <MiscAtomsOptimizedImage :src="item.picture" class="align-start">
    </MiscAtomsOptimizedImage>
    <div>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text> <ContentRenderer :value="item" /></v-card-text>
    </div>
  </v-card>
</template>

<script setup>
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
