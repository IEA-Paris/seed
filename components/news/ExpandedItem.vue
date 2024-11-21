<template>
  <v-expansion-panels class="mb-4">
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-row>
          <v-col class="text-h5" cols="12" md="7">
            {{ item.title }}
          </v-col>

          <v-col cols="12" md="5">
            <MiscMoleculesChipContainer
              :items="item.tags"
            ></MiscMoleculesChipContainer>
          </v-col>
        </v-row>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <v-row>
          <v-col cols="12" md="2">
            <MiscAtomsImageContainer
              cover
              :loading="rootStore.loading"
              :src="item.image"
              :ratio="1 / 1"
            />
          </v-col>
          <v-col cols="12" md="9">
            <ContentRenderer
              :value="item"
              class="text-body-1 clamped-text"
              :style="
                '-webkit-line-clamp:' +
                [5, 5, 4, 7, 8, 10][
                  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
            />
            <v-btn
              class="mt-4"
              variant="outlined"
              tile
              size="small"
              :to="
                localePath({
                  name: 'news-slug',
                  params: { slug: getSlugFromPath(item._path) },
                })
              "
            >
              {{ $t("read-more") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { useRootStore } from "~/store/root"
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

<style></style>
