<template>
  <!--  {{ name }} -->
  <v-row justify="center">
    <v-col cols="12" sm="11" md="10" lg="9" xl="8">
      <v-row class="justify-center" v-if="item.image && item.image.length">
        <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="text-center">
          <!--   FELLOWSHIP IMAGE -->
          <MiscAtomsImageContainer
            contain
            :loading="rootStore.fellowship.loading"
            :src="item.image"
            :ratio="1 / 1"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.fellowship.loading"
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
              {{ item.title }}
            </div>
            <v-divider width="154px" class="mb-1 mt-6"></v-divider>
            <v-divider width="154px"></v-divider>
            <div class="d-flex text-center text-wrap text-h5 text-black mt-6">
              {{ item.summary }}
            </div>
            <MiscMoleculesChipContainer
              :items="[...fellowshipType, ...item.disciplines]"
              class="mt-2"
            ></MiscMoleculesChipContainer>
            <div class="mt-5">
              <FellowshipBadges :item="item" :view="view"></FellowshipBadges>
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
              v-if="rootStore.loading || rootStore.fellowship.loading"
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
            <ContentRenderer v-else :value="item" />

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
            >
              <v-expansion-panel
                v-for="(value, key) in Object.keys(item.fellowshipDetails)"
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
                  {{ item.fellowshipDetails[value] }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

            <v-responsive class="mx-auto my-9" width="120">
              <v-divider class="mb-1" />
              <v-divider />
            </v-responsive>

            <MiscAtomsSlidingCarousel
              :items="upcomingFellows"
              type="people"
              key="people"
              lazy
              ref="fellows"
              :loading="false"
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
})

const { data: upcomingFellows } = await useAsyncData("fellow-list", () =>
  queryContent("/people/" + locale.value)
    // .where({ outside: false })
    // .sort("date", "desc")
    .limit(12)
    .find(),
)

const view = ref(true)
const fellowshipType = ref([
  ...(props.item.fellowshipType === 2
    ? [{ name: "short-stay" }, { name: "in-groups" }]
    : [
        {
          name: ["long-stay", "short-stay"][props.item.fellowshipType],
        },
      ]),
])
onMounted(() => {
  rootStore.fellowship.loading = false
  /*   console.log("fellowship item", props.item.value) */
})
</script>

<style lang="scss" scoped></style>
