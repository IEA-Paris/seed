<template>
  <v-row>
    <v-col
      cols="12"
      v-if="smAndDown"
      class="text-wrap text-h4 text-black mx-sm-6"
    >
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="['heading', 'heading'][['xs', 'sm'].indexOf(name || 'sm')]"
      ></v-skeleton-loader>
      <template v-else>
        <v-chip class="mb-4">{{
          $t("news.categories." + item.category)
        }}</v-chip>
        <br />
        {{ item.name }}
      </template>
    </v-col>
    <v-col cols="12" md="4" class="pb-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        height="100%"
        type="image"
      ></v-skeleton-loader>

      <div v-else class="mx-sm-6">
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.news.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </div>
    </v-col>

    <v-col cols="12" md="8" class="pl-0 pb-0 d-flex flex-column justify-md-end">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="
          [
            'text, chip@4',
            'text, chip@4',
            'heading, text',
            'heading, text',
            'heading, text',
            'heading',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>

      <div v-else class="mx-4 mx-md-0 justify-md-end">
        <v-chip class="mb-4" v-if="mdAndUp">{{
          $t("news.categories." + item.category)
        }}</v-chip>
        <div class="d-flex text-wrap text-h4 text-black" v-if="mdAndUp">
          {{ item.name }}
        </div>

        <div class="d-flex text-wrap text-h6 text-black mt-3" v-if="mdAndUp">
          <ContentRendererMarkdown
            :value="renderedDescription"
            class="mt-md-n2 mx-4 mx-sm-8 mx-md-0"
          />
        </div>
        <div
          class="d-flex flex-column flex-md-row align-md-center mt-6 mx-sm-4 mx-md-6"
        >
          <!-- <MiscAtomsDateStamp
              :loading="rootStore.news.loading"
              :date="item.date"
              class="ml-0 mt-lg-2"
            /> -->

          <div class="ml-md-n6">
            <div class="text-body-2 text-lg-body-1 text-black">
              <!--    TODO use a proper & conditional formatting of names (depending on number of authors) -->
              {{
                $t("by-author", [
                  item.authors[0].firstname + " " + item.authors[0].firstname,
                ])
              }}
            </div>
            <div class="" v-if="smAndDown">
              <MiscMoleculesChipContainer
                :items="item.tags"
                class="mt-4"
              ></MiscMoleculesChipContainer>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>

  <v-row class="mt-12">
    <v-col cols="12" md="4" :order="mdAndUp ? 'first' : 'last'" class="pt-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="
          ['chip@2', 'chip@3', 'chip@4', 'chip@5'][
            ['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      ></v-skeleton-loader>
      <template v-else>
        <div class="mt-2 mx-sm-6" v-if="mdAndUp">
          <MiscMoleculesChipContainer
            :items="item.tags"
            class="mt-4"
          ></MiscMoleculesChipContainer>
        </div>
      </template>
    </v-col>
    <v-col cols="12" md="8" class="pl-0 pt-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="
          ['text@50', 'text@50', 'text@50', 'text@50', 'text@50', 'text@50'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      ></v-skeleton-loader>
      <ContentRendererMarkdown
        :value="renderedDescription"
        class="mt-md-n2 mx-4 mx-sm-8 mx-md-0"
      />
    </v-col>
  </v-row>

  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider />
  </v-responsive>
  <MiscAtomsSlidingCarousel
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
  <v-row>
    <!-- RELATED ITEMS -->
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="events"
        :items="item.relatedEvents"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="project"
        :items="item.relatedProjects"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="people"
        :items="item.relatedPeople"
      ></MiscMoleculesRelatedItems>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import markdownParser from "@nuxt/content/transformers/markdown"
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
})

const today = new Date()
const academicYear = ref(
  today.getMonth() > 6
    ? today.getFullYear() + "-" + (today.getFullYear() + 1)
    : today.getFullYear() - 1 + "-" + today.getFullYear(),
)
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)

const renderedDescription = props.item?.description
  ? await markdownParser.parse("description", props.item.description)
  : ""
</script>
