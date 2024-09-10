<template>
  <!--  TODO: design properly -->
  <v-col cols="12" sm="6" md="3">
    <MiscAtomsImageContainer
      :src="item.image"
      class="align-start"
      :loading="rootStore.project.loading"
      :ratio="1 / 1"
      :title="item.title"
      link="activities-projects-slug"
      :slug="getSlugFromPath(item._path)"
    >
    </MiscAtomsImageContainer>
    <div class="pt-3">
      <nuxt-link
        :to="
          localePath({
            name: 'activities-projects-slug',
            params: { slug: getSlugFromPath(item._path) },
          })
        "
        class="text-h5 text-black"
      >
        {{ item.title }}
      </nuxt-link>
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
