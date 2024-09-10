<template>
  <!--  {{ name }} -->
  <v-row>
    <v-col
      cols="12"
      v-if="smAndDown"
      class="text-wrap text-h4 text-black mx-sm-6"
    >
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.project.loading"
        :type="['heading', 'heading'][['xs', 'sm'].indexOf(name || 'sm')]"
      ></v-skeleton-loader>
      <template v-else>
        {{ item.title }}
      </template>
    </v-col>
    <v-col cols="12" md="4" class="pb-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.project.loading"
        height="100%"
        type="image"
      ></v-skeleton-loader>

      <div v-else class="mx-sm-6">
        <MiscAtomsImageContainer
          :loading="rootStore.project.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </div>
    </v-col>

    <v-col cols="12" md="8" class="pl-0 pb-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.project.loading"
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

      <template v-else>
        <div
          class="d-flex text-wrap text-h4 text-black mx-4 mx-md-0"
          v-if="mdAndUp"
        >
          {{ item.title }}
        </div>
        <div
          class="d-flex flex-column flex-md-row align-md-center mt-6 mx-9 mx-md-0"
        >
          <MiscMoleculesChipContainer
            :items="item.tags"
          ></MiscMoleculesChipContainer>
        </div>
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-12">
    <v-col cols="12" md="4" :order="mdAndUp ? 'first' : 'last'" class="pt-0">
      <MiscMoleculesRelatedItems
        type="events"
        :items="item.relatedEvents"
        class="mx-6 my-2"
      ></MiscMoleculesRelatedItems>
      <MiscMoleculesRelatedItems
        type="news"
        :items="item.relatedNews"
        class="mx-6 my-2"
      ></MiscMoleculesRelatedItems>
      <MiscMoleculesRelatedItems
        type="people"
        :items="item.relatedPeople"
        class="mx-6 my-2"
      ></MiscMoleculesRelatedItems>
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.project.loading"
        :type="
          [
            'image, text@3, ossein, button',
            'image, text@3, ossein, button',
            'image, text@3, ossein, button',
            'image, text@3, ossein, button',
          ][['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>
      <ActionsSmallContainer
        v-else
        class="mt-2 mx-n6 mx-sm-0"
        v-if="mdAndUp"
        :action="action"
        :ratio="1"
      ></ActionsSmallContainer>
    </v-col>
    <v-col cols="12" md="8" class="pl-0 pt-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.project.loading"
        :type="
          ['text@50', 'text@50', 'text@50', 'text@50', 'text@50', 'text@50'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      ></v-skeleton-loader>
      <ContentRenderer v-else :value="item" class="mt-md-n2 mx-10 mx-md-0" />
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
</script>
