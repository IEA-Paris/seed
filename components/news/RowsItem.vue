<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-4 mx-2 mx-sm-8 mx-md-0">
    <v-col cols="12 " md="4" lg="3" v-if="mdAndUp" class="pr-md-0">
      <MiscAtomsImageContainer
        :image="item.image"
        :ratio="1 / 1"
        link="news-slug"
        :slug="item._path.split('/').pop()"
      />
    </v-col>
    <v-col cols="12" md="8" lg="4" class="pl-md-6">
      <v-skeleton-loader
        v-if="rootStore.loading"
        :type="
          [
            'heading, subtitle, text@5, ossein, button',
            'heading, subtitle, text@5, ossein, button',
            'heading, subtitle, text@3, ossein, button',
            'heading@2, subtitle',
            'heading@2, subtitle',
            'heading@2, subtitle',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <template v-else>
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
              [5, 5, 3, 6, 10, 10][
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
      </template>
    </v-col>

    <v-col cols="12" lg="5" v-if="lgAndUp">
      <v-skeleton-loader
        v-if="rootStore.loading"
        type="text@8, ossein, button"
      ></v-skeleton-loader>

      <template v-else>
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
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
const localePath = useLocalePath()
const rootStore = useRootStore()
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

<style></style>
