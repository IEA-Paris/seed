<template>
  <v-row class="cursor-pointer" v-ripple>
    <v-col cols="3" v-if="lgAndUp">
      <div class="overflow-hidden">
        <nuxt-link
          :to="
            localePath({
              name: 'activities-events-slug',
              params: { slug: slugify(item.title) },
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
    </v-col>
    <v-col cols="12" lg="9">
      <div class="text-h6">
        {{ item.title }}
      </div>
      <div class="text-body-1">
        {{ item.shortDescription }}
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import slugify from "~/assets/utils/slugify"
const localePath = useLocalePath()
import { useDisplay } from "vuetify"
const { name, mdAndDown, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const props = defineProps({ item: { type: Object, required: true } })
</script>
