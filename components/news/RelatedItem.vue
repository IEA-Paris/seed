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
        <v-skeleton-loader
          v-if="rootStore.loading"
          type="image"
        ></v-skeleton-loader>
        <template v-else>
          <div class="overflow-hidden">
            <nuxt-link
              :to="
                localePath({
                  name: 'activities-events-slug',
                  params: { slug: slugify(item.name) },
                })
              "
            >
              <v-img
                :src="item.image"
                :aspect-ratio="1 / 1"
                cover
                class="img-animation"
              >
              </v-img>
            </nuxt-link>
          </div>
        </template>
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
import { useDisplay } from "vuetify"
const localePath = useLocalePath()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { name, mdAndDown, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const props = defineProps({ item: { type: Object, required: true } })
</script>
