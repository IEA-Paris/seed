<template>
  <div
    class="expanded-item"
    :class="expanded ? 'expanded' : 'collapsed'"
    @click="expanded = !expanded"
  >
    <v-row>
      <v-col cols="12" :md="expanded ? '4' : '2'">
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </v-col>
      <v-col class="text-h5" cols="12" :md="expanded ? '8' : '10'">
        {{ item.title }}
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
        <template v-if="expanded">
          <MiscMoleculesChipContainer
            :items="item.tags"
          ></MiscMoleculesChipContainer>

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
          </v-btn></template
        >
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const expanded = ref(false)
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

<style lang="scss">
.expanded-item {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.expanded-item.expanded {
  height: auto;
}
.expanded-item.collapsed {
  height: 100px;
  overflow: hidden;
}
</style>
