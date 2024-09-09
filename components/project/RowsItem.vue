<template>
  <!--  TODO: design properly -->
  <v-col cols="12" sm="6" md="4">
    <div v-if="rootStore.loading || rootStore.project.loading">LOADING</div>

    <div v-else class="d-flex flex-row pa-6 align-start">
      <MiscAtomsImageContainer
        :src="item.picture"
        :width="150"
        class="align-start"
        :loading="rootStore.project.loading"
        :ratio="1 / 1"
        :title="item.title"
        link="project-slug"
        :slug="getSlugFromPath(item._path)"
      >
      </MiscAtomsImageContainer>
      <div>
        <v-card-title>{{ item.title }}</v-card-title>
      </div>
    </div>
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
