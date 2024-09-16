<template>
  <v-sheet
    :to="
      localePath({
        name: 'news-slug',
        params: { slug: item.title },
      })
    "
  >
    <v-row>
      <v-col cols="3" v-if="lgAndUp">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :loading="rootStore.news.loading"
          :ratio="1 / 1"
          :link="item.name"
          name="news-slug"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.news.loading"
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
import { useDisplay } from "vuetify"
const localePath = useLocalePath()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { lgAndUp } = useDisplay()

const props = defineProps({ item: { type: Object, required: true } })
</script>
