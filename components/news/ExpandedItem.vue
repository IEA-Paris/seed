<template>
  <div
    class="expanded-item mb-4"
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

        <template v-if="expanded">
          <MiscMoleculesChipContainer
            :items="item.tags"
          ></MiscMoleculesChipContainer>
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
        </template>

        <template v-else>
          <ContentRenderer
            :value="item"
            class="text-body-1 clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 4, 7, 8, 10][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
        /></template>
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
<!-- 
<style lang="scss">
.expanded-item {
  cursor: pointer;

  transition: all 1.9s ease-in-out;
}

.expanded-item.expanded {
  height: auto;
}
.expanded-item.collapsed {
  height: 100px;
  overflow: hidden;
}
</style> -->

<style lang="scss">
.expanded-item {
  cursor: pointer;
  overflow: hidden;
  transition: max-height 0.9s ease;
}

.expanded-item.expanded {
  max-height: 1000px;
}

.expanded-item.collapsed {
  max-height: 130px;
}
</style>
