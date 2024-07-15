<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-4 mx-2 mx-sm-8 mx-md-0">
    <v-col cols="12 " md="4" lg="3" v-if="mdAndUp" class="pr-md-0">
      <v-skeleton-loader v-if="true" type="image"></v-skeleton-loader>

      <div v-else class="overflow-hidden">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col cols="12" md="8" lg="4" class="pl-md-6">
      <v-skeleton-loader v-if="true" type="article"></v-skeleton-loader>

      <div v-else>
        <NuxtLink
          :to="
            localePath({
              name: 'news-slug',
              params: { slug: item._path.split('/').pop() },
            })
          "
          class="text-wrap text-h4 text-black"
        >
          {{ item.title }}</NuxtLink
        >
        <MiscMoleculesChipContainer
          :items="item.tags"
        ></MiscMoleculesChipContainer>
        <template v-if="mdAndDown">
          <ContentRenderer
            :value="item"
            class="text-body-1 clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 3, 6, 10][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          />
          <v-btn
            class="mt-4"
            variant="outlined"
            size="small"
            :to="
              localePath({
                name: 'news-slug',
                params: { slug: item._path.split('/').pop() },
              })
            "
          >
            {{ $t("read-more") }}
          </v-btn>
        </template>
      </div>
    </v-col>

    <v-col cols="12" lg="5" v-if="lgAndUp">
      <v-skeleton-loader v-if="true" type="article"></v-skeleton-loader>

      <div v-else>
        <ContentRenderer
          :value="item"
          class="text-body-1 mt-n3 clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 4, 8, 10][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />
        <v-btn
          variant="outlined mt-4"
          :to="
            localePath({
              name: 'news-slug',
              params: { slug: item._path.split('/').pop() },
            })
          "
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("read-more") }}
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const localePath = useLocalePath()
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()
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

<style lang="scss" scoped>
.clamped-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
