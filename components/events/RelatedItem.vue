<template>
  <v-sheet
    :to="
      localePath({
        name: 'activities-events-slug',
        params: { slug: slugify(item.name) },
      })
    "
  >
    <v-row>
      <v-col cols="3" v-if="lgAndUp">
        <MiscAtomsImageContainer
          :image="item.image"
          :ratio="1 / 1"
          :link="item.name"
          :name="activities - events - slug"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-skeleton-loader
          v-if="rootStore.loading"
          type="heading, text@3"
        ></v-skeleton-loader>
        <template v-else>
          <div class="text-h6">
            {{ item.name }}
          </div>
          <div class="text-body-1">
            {{ item.description }}
          </div>
        </template>
      </v-col></v-row
    ></v-sheet
  >
</template>

<script setup>
import slugify from "~/assets/utils/slugify"
const localePath = useLocalePath()
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { name, mdAndDown, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const props = defineProps({ item: { type: Object, required: true } })
</script>
