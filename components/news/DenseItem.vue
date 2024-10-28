<template>
  <v-row
    v-ripple
    class="cursor-pointer"
    @click="$router.push(localePath('/news/' + getSlugFromPath(item._path)))"
  >
    <v-col align-self="center" cols="7" class="text-h6 dense">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        type="heading"
      ></v-skeleton-loader>
      <template v-else>
        {{ item.title }}
      </template>
    </v-col>

    <v-col align-self="center" cols="5" class="dense">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="
          ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      ></v-skeleton-loader>

      <template v-else>
        <MiscMoleculesChipContainer
          :items="item.tags"
          size="small"
        ></MiscMoleculesChipContainer>
      </template>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"

const { locale } = useI18n()
const { name, smAndUp, mdAndDown, mdAndUp, lgAndUp } = useDisplay()
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
