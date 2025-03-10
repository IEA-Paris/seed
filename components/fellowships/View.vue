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
              <ContentRendererMarkdown :value="renderedSubtitle" />
            </div>
            <!--      <MiscMoleculesChipContainer
              :items="[
                ...fellowshipType,
                ...(item && item.disciplines ? [item.disciplines] : []),
              ]"
              class="mt-2"
            ></MiscMoleculesChipContainer> -->
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
            <ContentRendererMarkdown v-else :value="renderedDescription" />

            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>

            <v-expansion-panels
              outlined
              flat
              eager
              ripple
              variant="accordion"
              class="py-8"
              v-model="accordeon"
              v-if="!loading"
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
                  <ContentRendererMarkdown :value />
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
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import markdownParser from "@nuxt/content/transformers/markdown"
import { useDisplay } from "vuetify"
import getFileIcon from "~/composables/useIcons"
import { useRootStore } from "~/store/root"
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
const fellowshipType = ref([
  ...(props?.item?.fellowshipType === 2
    ? [{ name: "short-stay" }, { name: "in-groups" }]
    : [
        {
          name: ["long-stay", "short-stay"][props.item?.fellowshipType || 0],
        },
      ]),
])
onMounted(() => {
  /*   console.log("fellowship item", props.item.value) */
})

const renderedSubtitle =
  props.item?.subtitle && !props.loading
    ? await markdownParser.parse("subtitle", props.item.subtitle)
    : ""
const renderedDescription =
  props.item?.description && !props.loading
    ? await markdownParser.parse("description", props.item.description)
    : ""
const renderedDetails = {
  ...(props.item?.fellowshipDetails?.type &&
    !props.loading && {
      type: await markdownParser.parse(
        "fellowshipDetails.type",
        props.item.fellowshipDetails.type,
      ),
    }),
  ...(props.item?.fellowshipDetails?.fundingPeriod &&
    !props.loading && {
      fundingPeriod: await markdownParser.parse(
        "fellowshipDetails.fundingPeriod",
        props.item.fellowshipDetails.fundingPeriod,
      ),
    }),
  ...(props.item?.fellowshipDetails?.profile &&
    !props.loading && {
      profile: await markdownParser.parse(
        "fellowshipDetails.profile",
        props.item.fellowshipDetails.profile,
      ),
    }),
  ...(props.item?.fellowshipDetails?.tasks &&
    !props.loading && {
      tasks: await markdownParser.parse(
        "fellowshipDetails.tasks",
        props.item.fellowshipDetails.tasks,
      ),
    }),
  ...(props.item?.fellowshipDetails?.location &&
    !props.loading && {
      location: await markdownParser.parse(
        "fellowshipDetails.location",
        props.item.fellowshipDetails.location,
      ),
    }),
  ...(props.item?.fellowshipDetails?.funding &&
    !props.loading && {
      funding: await markdownParser.parse(
        "fellowshipDetails.funding",
        props.item.fellowshipDetails.funding,
      ),
    }),
  ...(props.item?.fellowshipDetails?.housing &&
    !props.loading && {
      housing: await markdownParser.parse(
        "fellowshipDetails.housing",
        props.item.fellowshipDetails.housing,
      ),
    }),
  ...(props.item?.fellowshipDetails?.meals &&
    !props.loading && {
      meals: await markdownParser.parse(
        "fellowshipDetails.meals",
        props.item.fellowshipDetails.meals,
      ),
    }),
  ...(props.item?.fellowshipDetails?.applicationMaterials &&
    !props.loading && {
      applicationMaterials: await markdownParser.parse(
        "fellowshipDetails.applicationMaterials",
        props.item.fellowshipDetails.applicationMaterials,
      ),
    }),
  ...(props.item?.fellowshipDetails?.selectionProcess &&
    !props.loading && {
      selectionProcess: await markdownParser.parse(
        "fellowshipDetails.selectionProcess",
        props.item.fellowshipDetails.selectionProcess,
      ),
    }),
  ...(props.item?.fellowshipDetails?.researchProcess &&
    !props.loading && {
      researchProcess: await markdownParser.parse(
        "fellowshipDetails.researchProcess",
        props.item.fellowshipDetails.researchProcess,
      ),
    }),
}
</script>

<style lang="scss" scoped></style>
