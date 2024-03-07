<template>
  <v-card
    class="d-flex flex-row pa-6 align-start"
    :to="localePath('/activities/projects/' + slugify(item.title))"
  >
<!--     <MiscAtomsOptimizedImage :src="item.picture" class="align-start">
    </MiscAtomsOptimizedImage> -->
    <div>
      <v-card-title>{{ item.title }}</v-card-title><!-- 
      <v-card-text> <ContentRenderer :value="item" /></v-card-text> -->
    </div>
  </v-card>
</template>

<script setup>
import slugify from "~/assets/utils/slugify"
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
