<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-ripple>
    <MiscAtomsImageContainer
      contain
      :src="item.image"
      :loading="rootStore.project.loading"
      :ratio="1 / 1"
      :title="item.title"
      link="activities-projects-slug"
      :slug="getSlugFromPath(item._path)"
    >
    </MiscAtomsImageContainer>
  </v-col>
  <v-col
    cols="12"
    sm="6"
    md="8"
    lg="9"
    xl="10"
    class="px-6 cursor-pointer"
    v-ripple
    @click="
      router.push(
        localePath('/activities/projects/' + getSlugFromPath(item._path)),
      )
    "
  >
    <v-skeleton-loader
      v-if="rootStore.loading"
      type="header, ossein text@8, ossein, button , button"
    ></v-skeleton-loader>

    <template v-else>
      <div class="text-h4 text-sm-h3 text-md-h4 my-6">
        {{ item.title }}
      </div>

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
        class="mt-4"
        variant="outlined"
        tile
        :to="
          localePath({
            name: 'project-slug',
            params: { slug: getSlugFromPath(item._path) },
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
      <v-btn
        variant="outlined"
        tile
        class="mt-4 ml-4"
        prepend-icon="mdi-web"
        :size="
          ['small', 'small', 'small', 'default', 'default', 'large'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
        >{{ $t("visit-the-project-website") }}</v-btn
      >
    </template>
  </v-col>
  <v-divider></v-divider>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const router = useRouter()
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

<style lang="scss"></style>
