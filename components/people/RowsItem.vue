<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row
    class="my-6 ml-md-1 px-3 px-md-0 highlight-on-hover"
    @click="
      $router.push(
        localePath({
          name: 'people-slug',
          params: { slug: getSlugFromPath(item._path) },
        }),
      )
    "
  >
    <v-col cols="12" md="3" v-if="mdAndUp">
      <MiscAtomsImageContainer
        cover
        :loading="loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="getSlugFromPath(item._path)"
        link="people-slug"
      >
      </MiscAtomsImageContainer>
    </v-col>

    <v-col cols="12" md="8">
      <v-skeleton-loader
        v-if="loading"
        :type="
          [
            'heading, subtitle, text@5',
            'heading, subtitle, text@5',
            'heading, subtitle, text@3',
            'heading, subtitle, text@6',
            'heading, subtitle, text@9',
            'heading, subtitle, text@9',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <div class="ml-md-8" v-else>
        <NuxtLink
          :to="
            localePath({
              name: 'people-slug',
              params: { slug: getSlugFromPath(item._path) },
            })
          "
          class="text-wrap text-h5 text-md-h4 text-black"
        >
          {{ item.firstname + " " + item.lastname }}
        </NuxtLink>
        <MiscAtomsSocials v-if="item.socials" :socials="item.socials" />
        <PeopleGroupBadges :item="item" />

        <p
          class="text-wrap clamped-text text-black"
          :style="'-webkit-line-clamp:' + lineClamp"
        >
          <ContentRendererMarkdown
            v-if="renderedBiography?.body"
            :value="renderedBiography"
          />
        </p>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useRootStore } from "~/store/root"
import { useDisplay } from "vuetify"
// import markdownParser from "@nuxt/content/transformers/markdown"
import { getSlugFromPath } from "~/composables/useUtils"
import { useRenderedMarkdown } from "~/composables/useRenderedMarkdown"

const { name, mdAndUp } = useDisplay()
const localePath = useLocalePath()
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
  loading: {
    type: Boolean,
    default: false,
  },
})
const lineClamp = computed(() => {
  let base = [5, 6, 3, 6, 8, 10][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ]
  console.log("base: ", base)
  if (props.item?.socials && Object.keys(props.item.socials).length > 0) {
    base =
      base -
      [0, 0, 1, 1, 1, 2][
        ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
      ]
  }
  console.log("base: ", base)

  return base
})
// const renderedBiography = ref("")
// watchEffect(async () => {
//   if (props.item?.biography) {
//     renderedBiography.value = await markdownParser.parse(
//       "biography",
//       props.item.biography,
//     )
//   } else {
//     renderedBiography.value = ""
//   }
// })

const renderedBiography = useRenderedMarkdown(
  () => props.item?.biography,
  "biography",
)
</script>
