<template>
  <!--  {{ name }} -->
  <v-row justify="center">
    <v-col cols="12" sm="11" md="10" lg="9" xl="8">
      <v-row
        class="justify-center"
        v-if="item && item.image && item.image.length"
      >
        <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="text-center">
          <!--   FELLOWSHIP IMAGE -->
          <MiscAtomsImageContainer
            contain
            :loading
            :src="item.image"
            :ratio="1 / 1"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
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
            <div class="d-flex text-center text-wrap text-h5 text-black mt-6">
              <ContentRendererMarkdown
                v-if="renderedSubtitle?.body"
                :value="renderedSubtitle"
              />
            </div>
            <MiscMoleculesChipContainer
              :items="[
                $t(
                  'list.filters.fellowships.fellowshipType.' +
                    item.fellowshipType,
                ),
                ...(props.item && props.item.disciplines
                  ? props.item.disciplines.map((discipline) => discipline.name)
                  : []),
              ]"
              class="mt-2"
            ></MiscMoleculesChipContainer>
            <div class="mt-5">
              <FellowshipsBadges :item="item" :view="view"></FellowshipsBadges>
            </div>
          </div>
          <div class="mx-6">
            <!-- DIVIDERS -->
            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>

            <!-- FELLOWSHIP DESCRIPTION -->
            <v-skeleton-loader
              v-if="loading"
              :type="
                [
                  'text@50',
                  'text@50',
                  'text@50',
                  'text@50',
                  'text@50',
                  'text@50',
                ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
              "
            ></v-skeleton-loader>
            <ContentRendererMarkdown
              v-if="renderedDescription?.body"
              :value="renderedDescription"
            />

            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>
            <v-skeleton-loader v-if="loading"> </v-skeleton-loader>
            <v-expansion-panels
              flat
              ripple
              variant="accordion"
              class="py-8"
              v-model="accordeon"
              v-else
            >
              <v-expansion-panel
                v-for="(value, key) in Object.keys(renderedDetails)"
                :key="key + value"
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t(value) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="py-2"
                  style="white-space: pre; text-wrap: auto"
                >
                  <ContentRendererMarkdown
                    v-if="renderedDetails[value].value?.body"
                    :value="renderedDetails[value].value"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>

            <MiscAtomsSlidingCarousel
              v-if="item && item.fellows && item.fellows.length"
              :items="item.fellows || []"
              type="people"
              key="people"
              lazy
              ref="fellows"
              :loading
            >
              <div :class="mdAndUp ? 'text-h5' : 'text-h6'">
                {{ $t("this-fellowship-alumni") }}
              </div>
            </MiscAtomsSlidingCarousel>
          </div>
        </v-col>
        <MiscMoleculesRelated
          v-if="!loading && item && item.related"
          :related="item.related"
        ></MiscMoleculesRelated>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import markdownParser from "@nuxt/content/transformers/markdown"
import { useDisplay } from "vuetify"
import getFileIcon from "~/composables/useIcons"
import { useRootStore } from "~/store/root"
import { useRenderedMarkdown } from "~/composables/useRenderedMarkdown"

const rootStore = useRootStore()

const { name, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()
const accordeon = ref(-1)
const localePath = useLocalePath()
const router = useRouter()
const { locale } = useI18n()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const view = ref(true)
onMounted(() => {
  /*   console.log("fellowship item", props.item.value) */
})

const renderedSubtitle = useRenderedMarkdown(
  () => props.item?.subtitle,
  "subtitle",
)

const renderedDescription = useRenderedMarkdown(
  () => props.item?.description,
  "description",
)

const renderedDetails = {
  ...(props.item?.fellowshipDetails?.type && {
    type: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.type,
      "type",
    ),
  }),
  ...(props.item?.fellowshipDetails?.fundingPeriod && {
    fundingPeriod: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.fundingPeriod,
      "fundingPeriod",
    ),
  }),
  ...(props.item?.fellowshipDetails?.profile && {
    profile: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.profile,
      "profile",
    ),
  }),
  ...(props.item?.fellowshipDetails?.tasks && {
    tasks: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.tasks,
      "tasks",
    ),
  }),
  ...(props.item?.fellowshipDetails?.location && {
    location: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.location,
      "location",
    ),
  }),
  ...(props.item?.fellowshipDetails?.funding && {
    funding: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.funding,
      "funding",
    ),
  }),
  ...(props.item?.fellowshipDetails?.housing && {
    housing: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.housing,
      "housing",
    ),
  }),
  ...(props.item?.fellowshipDetails?.meals && {
    meals: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.meals,
      "meals",
    ),
  }),
  ...(props.item?.fellowshipDetails?.applicationMaterials && {
    applicationMaterials: useRenderedMarkdown(
      () => props.item?.fellowshipDetails?.applicationMaterials,
      "applicationMaterials",
    ),
  }),
  ...(props.item?.fellowshipDetails?.selectionProcess && {
    selectionProcess: useRenderedMarkdown(
      () =>
        !props.loading
          ? props.item?.fellowshipDetails?.selectionProcess
          : undefined,
      "selectionProcess",
    ),
  }),
  ...(props.item?.fellowshipDetails?.researchProcess && {
    researchProcess: useRenderedMarkdown(
      () =>
        !props.loading
          ? props.item?.fellowshipDetails?.researchProcess
          : undefined,
      "researchProcess",
    ),
  }),
}
console.log("renderedDetails", renderedDetails)
</script>

<style lang="scss" scoped></style>
