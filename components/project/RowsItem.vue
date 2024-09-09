<template>
  <!--  TODO: design properly -->
  <v-col cols="12" sm="6" md="3">
    <div v-if="rootStore.loading || rootStore.project.loading">LOADING</div>
    <div v-else>
      <MiscAtomsImageContainer
        :src="item.picture"
        class="align-start"
        :loading="rootStore.project.loading"
        :ratio="1 / 1"
        :title="item.title"
        link="activities-projects-slug"
        :slug="getSlugFromPath(item._path)"
      >
      </MiscAtomsImageContainer>
      <div class="text-h5 pt-3">
        {{ item.title }}
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
