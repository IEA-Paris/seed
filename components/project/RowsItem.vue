<template>
  <!--  TODO: design properly -->
  <v-hover v-slot="{ isHovering, props }">
  <v-col cols="12" sm="6" md="4" xl="3" v-ripple v-bind="props">
    <MiscAtomsImageContainer
      contain
      :src="item.image"
      :loading="rootStore.project.loading"
      :ratio="1 / 1"
      :title="item.title"
      link="activities-projects-slug"
      :slug="getSlugFromPath(item._path)"
    >
    <v-expand-transition>
      <v-card class="pa-3 d-flex text-center align-center justify-center  transition-fast-in-fast-out bg-grey v-card--reveal"  
      style="height: 100%; opacity:90%;"
       v-if="isHovering">
      <nuxt-link
        :to="
          localePath({
            name: 'activities-projects-slug',
            params: { slug: getSlugFromPath(item._path) },
          })
        "
        class="text-h5 text-md-h4 text-white bg-black pa-3"
        style="opacity:100%"
      >
        {{ item.title }}
      </nuxt-link>
    </v-card>
    </v-expand-transition>
  </MiscAtomsImageContainer>
  

  </v-col>
</v-hover>
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
