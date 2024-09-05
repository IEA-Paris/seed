<template>
  <!--  {{ name }} -->
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
        {{ item.title }}
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
          :loading="rootStore.news.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </div>
    </v-col>

    <v-col cols="12" md="8" class="pl-0 pb-0">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
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
        <div class="mx-4 mx-md-0">
          <div class="d-flex text-wrap text-h4 text-black" v-if="mdAndUp">
            {{ item.title }}
          </div>
          <div
            class="d-flex flex-column flex-md-row align-md-center mt-6 mx-sm-6"
          >
            <MiscAtomsDateStamp
              :loading="rootStore.events.loading"
              :date="item.date"
              class="ml-0 mt-lg-2"
            />

            <div class="ml-md-8">
              <div
                class="text-body-2 text-lg-body-1 text-black mt-4 mt-sm-4 mt-md-0 mb-md-n4 ml-md-0"
              >
                <!--    TODO use a proper & conditional formatting of names (depending on number of authors) -->
                {{
                  $t("by-author", [
                    item.authors[0].firstname + " " + item.authors[0].firstname,
                  ])
                }}
              </div>
              <div class="mt-lg-n1">
                <MiscMoleculesChipContainer
                  :items="item.tags"
                ></MiscMoleculesChipContainer>
              </div>
            </div>
          </div>
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
        type="project"
        :items="item.relatedProjects"
        class="mx-6 my-2"
      ></MiscMoleculesRelatedItems>
      <MiscMoleculesRelatedItems
        type="people"
        :items="item.relatedPeople"
        class="mx-6 my-2"
      ></MiscMoleculesRelatedItems>
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.news.loading"
        :type="
          [
            'image, text@3, ossein, button',
            'image, text@3, ossein, button',
            'image, text@3, ossein, button',
            'image, text@3, ossein, button',
          ][['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      ></v-skeleton-loader>
      <template v-else>
        <div class="mt-2 mx-n6 mx-sm-0" v-if="mdAndUp">
          <ActionsSmallContainer
            :action="action"
            :ratio="null"
          ></ActionsSmallContainer>
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
      <template v-else>
        <ContentRenderer :value="item" class="mt-md-n2 mx-10 mx-md-0" />
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, mdAndUp, smAndDown } = useDisplay()
const router = useRouter()
const { $i18n } = useNuxtApp()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find(),
)
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
