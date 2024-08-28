<template>
  <v-card
    class="d-flex flex-row pa-6 align-start"
    :to="
      localePath(
        /*'/activities/projects/' +
          item._file.split('/').pop().slice(0, -3) /* TODO : make it cleaner */
        '/'
      )
    "
  >
    <MiscAtomsOptimizedImage
      :src="item.picture"
      class="align-start"
      max-height="250px"
    >
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
