<template>
  <v-sheet
    :to="
      localePath({
        name: 'activities-projects-slug',
        params: { slug: item.title },
      })
    "
  >
    <v-row>
      <v-col cols="3" v-if="lgAndUp">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :loading="rootStore.project.loading"
          :ratio="1 / 1"
          :link="item.title"
          name="activities-projects-slug"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.project.loading"
          type="heading, text@3"
        ></v-skeleton-loader>
        <template v-else>
          <div class="text-h6">
            {{ item.title }}
          </div>
          <div class="text-body-1">
            {{ item.shortDescription }}
          </div>
        </template>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const localePath = useLocalePath()
const rootStore = useRootStore()
const { lgAndUp } = useDisplay()

const props = defineProps({ item: { type: Object, required: true } })
</script>
