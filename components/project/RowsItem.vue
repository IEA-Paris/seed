<template>
  <v-card
    class="d-flex flex-row pa-6 align-start"
    :to="
      localePath(getSlugFromPath(item._path))
      /*'/activities/projects/' +
          item._file.split('/').pop().slice(0, -3) /* TODO : make it cleaner */
    "
  >
    <MiscAtomsImageContainer
      :src="item.picture"
      class="align-start"
      max-height="250px"
      :loading="rootStore.project.loading"
      :ratio="1 / 1"
      :title="item.title"
      :link="localePath({ name: 'project-slug', params: { slug: item.slug } })"
    >
    </MiscAtomsImageContainer>
    <div>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text> <ContentRenderer :value="item" /></v-card-text>
    </div>
  </v-card>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

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
