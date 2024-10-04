<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-6 ml-md-1 px-3 px-md-0">
    <v-col cols="12" md="3" v-if="mdAndUp">
      <NuxtLink
        :to="
          localePath({
            name: 'people-slug',
            params: { slug: getSlugFromPath(item._path) },
          })
        "
      >
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.people.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </NuxtLink>
    </v-col>

    <v-col cols="12" md="8">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        :type="
          [
            'heading, subtitle, text@5',
            'heading, subtitle, text@5',
            'heading, subtitle, text@3',
            'heading, subtitle, text@6',
            'heading, subtitle, text@9',
            'heading, subtitle, text@9',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <div class="ml-md-8" v-else>
        <NuxtLink
          :to="
            localePath({
              name: 'people-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-wrap text-h4 text-black mb-2"
        >
          {{ item.title }}</NuxtLink
        >
        <MiscAtomsSocials :socials="item.socials" class="ml-n3" />
        <NuxtLink
          :to="
            localePath({
              name: 'people-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-wrap text-h4 text-black"
        >
          <ContentRenderer
            :value="item"
            class="text-body-1 clamped-text mt-n3"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 3, 6, 9, 9][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          />
        </NuxtLink>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
const { name, mdAndUp } = useDisplay()
const localePath = useLocalePath()
const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
