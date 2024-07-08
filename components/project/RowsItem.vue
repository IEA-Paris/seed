<template>
  <v-col cols="12" sm="6" md="4" lg="4" xl="3">
    <v-card
      class="d-flex flex-column align-start"
      :to="
        localePath(
          '/activities/projects/' + item._file.split('/').pop().slice(0, -3)
        )
      "
    >
      <MiscAtomsOptimizedImage :src="item.picture" class="align-start">
      </MiscAtomsOptimizedImage>
      <v-card-item>
        <div class="my-3 text-h5">{{ item.title }}</div>
        <v-card-text>
          <ContentRenderer
            :value="item"
            class="text-body-1 mx-n3 clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 4, 8, 10][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          ></ContentRenderer
        ></v-card-text>
        <!--      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
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
        </v-card-actions> -->
      </v-card-item>
    </v-card>
  </v-col>
</template>

<script setup>
import { useDisplay } from "vuetify"

import slugify from "~/assets/utils/slugify"
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
    required: true,
  },
})
</script>

<style lang="scss" scoped></style>
