<template>
  <div
    class="expanded-item mb-4"
    :class="expanded ? 'expanded' : 'collapsed'"
    @click="(expanded = !expanded)"
  >
    <v-row>
      <v-col cols="12" :md="expanded ? '4' : '2'" class="animated-col">
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </v-col>
      <v-col class="text-h5" cols="12" :md="expanded ? '7' : '8'">
        <template v-if="expanded">
          <div class="text-h4">
            {{ item.title }}
          </div>

          <MiscMoleculesChipContainer
            v-if="lgAndUp"
            :items="item.tags"
            class="fade-in"
          ></MiscMoleculesChipContainer>

          <ContentRenderer
            :value="item"
            class="text-body-1 clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 3, 6, 9, 11][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          />

          <v-btn
            class="mt-4"
            variant="outlined"
            tile
            :to="
              localePath({
                name: 'news-slug',
                params: { slug: getSlugFromPath(item._path) },
              })
            "
          >
            {{ $t("read-more") }}
          </v-btn>
        </template>

        <template v-else>
          <div>
            {{ item.title }}
          </div>
          <ContentRenderer
            :value="item"
            class="text-body-1 clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 2, 4, 6, 8][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
        /></template>
      </v-col>

      <v-col
        v-if="mdAndUp"
        class="d-flex justify-center align-center"
        cols="12"
        :md="expanded ? '1' : '2'"
      >
        <v-btn flat :icon="expanded ? 'mdi-minus' : 'mdi-plus'"></v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"

import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const expanded = ref(false)
const { name, mdAndUp, lgAndUp } = useDisplay()
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
.expanded-item {
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &.expanded {
    .v-col:first-child {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }

    .v-col:last-child {
      flex: 0 0 66.666%;
      max-width: 66.666%;
    }
  }

  &.collapsed {
    .v-col:first-child {
      flex: 0 0 16.666%;
      max-width: 16.666%;
    }

    .v-col:last-child {
      flex: 0 0 83.333%;
      max-width: 83.333%;
    }
  }

  .animated-col {
    transition:
      flex 0.3s ease-in-out,
      max-width 0.3s ease-in-out;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
