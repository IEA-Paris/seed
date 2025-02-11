<template>
  <v-row
    v-ripple
    class="expanded-item my-6 cursor-pointer"
    :class="expanded ? 'expanded' : 'collapsed'"
    @click="expanded = !expanded"
  >
    <v-col
      cols="12"
      :md="expanded ? '4' : '2'"
      class="animated-col"
      @click.prevent="
        expanded
          ? router.push(
              localePath({
                name: 'news-slug',
                params: { slug: getSlugFromPath(item._path) },
              }),
            )
          : null
      "
    >
      <MiscAtomsImageContainer
        cover
        :loading="rootStore.loading"
        :src="item.image"
        :ratio="1 / 1"
      />
    </v-col>
    <v-col class="text-h5" cols="12" :md="expanded ? '8' : '9'">
      <div
        :class="expanded ? 'text-h4' : 'text-h5'"
        @click.prevent="
          expanded
            ? router.push(
                localePath({
                  name: 'news-slug',
                  params: { slug: getSlugFromPath(item._path) },
                }),
              )
            : null
        "
      >
        <ContentRendererMarkdown :value="renderedTitle" />
      </div>
      <v-expand-transition v-if="lgAndUp">
        <div v-show="expanded">
          <MiscMoleculesChipContainer
            :items="item.tags"
          ></MiscMoleculesChipContainer>
        </div>
      </v-expand-transition>
      <p
        class="text-body-1 text-wrap clamped-text"
        :style="
          '-webkit-line-clamp:' +
          (expanded ? [5, 5, 3, 6, 9, 11] : [5, 5, 2, 4, 6, 8])[
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      >
        <ContentRendererMarkdown :value="renderedSummary" />
      </p>

      <v-expand-transition>
        <v-btn
          class="mt-4"
          variant="outlined"
          v-show="expanded"
          tile
          @click.prevent="
            router.push(
              localePath({
                name: 'news-slug',
                params: { slug: getSlugFromPath(item._path) },
              }),
            )
          "
        >
          {{ $t("read-more") }}
        </v-btn>
      </v-expand-transition>
    </v-col>

    <!--     <v-col
      v-if="mdAndUp"
      class="d-flex justify-start align-start"
      cols="12"
      :md="expanded ? '1' : '2'"
    >
      <v-btn flat tile size="x-large">
        <v-icon size="x-large">{{
          expanded ? "mdi-minus" : "mdi-plus"
        }}</v-icon></v-btn
      >
    </v-col> -->
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import markdownParser from "@nuxt/content/transformers/markdown"
const router = useRouter()
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
const renderedTitle = props.item?.name
  ? await markdownParser.parse("name", props.item.name)
  : ""
const renderedSummary = props.item?.summary
  ? await markdownParser.parse("summary", props.item.summary)
  : ""
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
