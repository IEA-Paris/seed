<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-4 mx-0 mx-sm-8 mx-md-0">
    <v-col cols="12 " md="5" lg="3" v-if="mdAndUp">
      <div class="overflow-hidden">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col cols="12" md="7" lg="4">
      <NuxtLink
        :to="
          localePath({
            name: 'news-slug',
            params: { slug: item._path.split('/').pop() },
          })
        "
        class="text-wrap text-h4 text-md-h5 text-xl-h4 text-black"
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
            [5, 5, 4, 6, 10][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />
        <v-btn
          class="mt-4"
          variant="outlined"
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
    </v-col>
    <v-col cols="12" lg="5" v-if="lgAndUp">
      <ContentRenderer
        :value="item"
        class="text-body-1 mt-n3 clamped-text"
        :style="
          '-webkit-line-clamp:' +
          [5, 5, 4, 6, 10][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />
      <v-btn
        class="mt-4"
        variant="outlined"
        :to="
          localePath({
            name: 'news-slug',
            params: { slug: item._path.split('/').pop() },
          })
        "
        :size="
          ['small', 'small', 'small', 'default', 'large', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      >
        {{ $t("read-more") }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
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
