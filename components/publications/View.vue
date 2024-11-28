<template>
  <!--  {{ name }} -->
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row class="justify-center">
        <v-col cols="12" sm="10" md="6" lg="4" xl="3" class="text-center">
          <!--   PUBLICATIONS IMAGE -->

          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.publications.loading"
            height="100%"
            type="image"
          ></v-skeleton-loader>

          <MiscAtomsImageContainer
            v-else
            contain
            :loading="rootStore.publications.loading"
            :src="item.image"
            :ratio="1 / 1"
          />
        </v-col>
      </v-row>
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.publications.loading"
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
          {{ item.subtitle }}
        </div>
        <MiscMoleculesChipContainer
          :items="item.tags"
          class="py-6 mt-4 align-self-center"
        ></MiscMoleculesChipContainer>
        <v-btn-toggle variant="outlined">
          <MiscAtomsShareMenu :item class="mt-6"></MiscAtomsShareMenu>
          <v-btn
            class="my-6 d-flex"
            variant="outlined"
            :href="item.url"
            target="_blank"
            prepend-icon="mdi-link"
            v-if="item.url"
          >
            {{ $t("visit-this-publications-website") }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <!-- PUBLICATIONS DESCRIPTION -->
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.publications.loading"
        :type="
          ['text@50', 'text@50', 'text@50', 'text@50', 'text@50', 'text@50'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      ></v-skeleton-loader>
      <ContentRenderer v-else :value="item" class="mt-md-n2 mx-10 mx-md-0" />
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
    <v-divider /> </v-responsive
  ><v-row>
    <!-- RELATED ITEMS -->
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="events"
        :items="item.relatedEvents"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="people"
        :items="item.relatedPeople"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="news"
        :items="item.relatedNews"
      ></MiscMoleculesRelatedItems>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
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

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)
rootStore.publications.loading = false
</script>
