<template>
  <!--  TODO: design properly -->
  <v-col cols="12" sm="6" md="4">
    <div v-if="rootStore.loading || rootStore.project.loading">LOADING</div>
    <v-card
      v-else
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
        :loading="rootStore.project.loading"
        :ratio="1 / 1"
        :title="item.title"
        :link="
          localePath({ name: 'project-slug', params: { slug: item.slug } })
        "
      >
      </MiscAtomsImageContainer>
      <div>
        <v-card-title>{{ item.title }}</v-card-title>
      </div>
    </v-card>
  </v-col>
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
