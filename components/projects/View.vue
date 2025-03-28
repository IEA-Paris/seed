<template>
  <!--  {{ name }} -->
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="text-center">
          <!--   PROJECT IMAGE -->
          <v-skeleton-loader
            v-if="loading"
            height="100%"
            type="image"
          ></v-skeleton-loader>

          <MiscAtomsImageContainer
            v-else
            contain
            :loading="loading"
            :src="item.image.url ? item.image : '/default.png'"
            :ratio="1 / 1"
          />
        </v-col>
      </v-row>
      <v-skeleton-loader
        v-if="loading"
        :type="
          [
            'avatar, paragraph',
            'avatar, paragraph',
            'heading, ossein,	avatar, text, ossein, chip@3',
            'heading, ossein,	avatar, text, ossein, chip@3',
            'heading, ossein, avatar, text, ossein, chip@3',
            'heading',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <div class="d-flex align-center flex-column mt-12" v-else>
        <div class="d-flex text-center text-wrap text-h3 text-black">
          {{ item.name }}
        </div>
        <v-divider width="154px" class="mb-1 mt-6"></v-divider>
        <v-divider width="154px"></v-divider>
        <div
          class="d-flex text-center text-wrap text-h5 text-black mt-6"
          v-if="!loading"
        >
          <ContentRendererMarkdown :value="renderedSubtitle" />
        </div>
        <MiscMoleculesChipContainer
          v-if="item && item.tags"
          :items="item.tags"
          class="py-6 mt-4 align-self-center"
        ></MiscMoleculesChipContainer>
        <v-btn-toggle variant="outlined">
          <MiscAtomsShareMenu :item class="mt-6"></MiscAtomsShareMenu>
        </v-btn-toggle>
        <v-btn
          class="my-6 d-flex"
          variant="outlined"
          :href="item.url"
          target="_blank"
          prepend-icon="mdi-link"
          v-if="item.url"
        >
          {{ $t("visit-this-project-website") }}
        </v-btn>
      </div>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <!-- PROJECT DESCRIPTION -->
      <v-skeleton-loader
        v-if="loading"
        :type="
          ['text@50', 'text@50', 'text@50', 'text@50', 'text@50', 'text@50'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      ></v-skeleton-loader>
      <ContentRendererMarkdown
        :value="renderedDescription"
        class="mt-md-n2 mx-10 mx-md-0"
        v-if="!loading"
      />
    </v-col>
  </v-row>

  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider />
  </v-responsive>
  <MiscAtomsSlidingCarousel
    v-if="item && item.gallery && item.gallery.length"
    :items="item.gallery"
    type="MiscAtomsImage"
    ref="MiscAtomsImage"
    key="MiscAtomsImage"
    :loading="false"
    :more="false"
  >
    <div :class="mdAndUp ? 'text-h5' : 'text-h6'">
      {{ $t("gallery") }}
    </div>
  </MiscAtomsSlidingCarousel>
  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider />
  </v-responsive>

  <MiscOrganismsRelated
    v-if="item && item.related"
    :related="item.related"
  ></MiscOrganismsRelated>
</template>

<script setup>
import { useDisplay } from "vuetify"
// import markdownParser from "@nuxt/content/transformers/markdown"
import { useRenderedMarkdown } from "~/composables/useRenderedMarkdown"

const { name, mdAndUp, smAndDown } = useDisplay()
const router = useRouter()
const { locale } = useI18n()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)

const renderedSubtitle = useRenderedMarkdown(
  () => props.item?.subtitle,
  "subtitle",
)

const renderedDescription = useRenderedMarkdown(
  () => props.item?.description,
  "description",
)
// let renderedSubtitle =
//   props.item?.subtitle && !props.loading
//     ? await markdownParser.parse("subtitle", props.item.subtitle)
//     : ""

// let renderedDescription =
//   props.item?.description && !props.loading
//     ? await markdownParser.parse("description", props.item.description)
//     : ""
// onMounted(async () => {
//   renderedSubtitle =
//     props.item?.subtitle && !props.loading
//       ? await markdownParser.parse("subtitle", props.item.subtitle)
//       : ""
//   renderedDescription =
//     props.item?.description && !props.loading
//       ? await markdownParser.parse("description", props.item.description)
//       : ""
// })

console.log("ITEMRELATED", props.item.related)
</script>
