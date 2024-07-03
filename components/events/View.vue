<template>
  <v-row>
    <v-col cols="12" lg="3" md="3" v-if="mdAndUp">
      <div class="overflow-hidden">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col
      cols="12"
      lg="6"
      md="9"
      class="d-flex flex-sm-column flex-md-column justify-md-end flex-wrap"
    >
      <div class="ml-2 ml-sm-4 ml-md-8 ml-lg-10 ml-xl-12">
        <div
          class="text-wrap text-body-1 mb-2 mb-sm-2 mb-md-4 font-weight-bold"
        >
          {{ item.date_text }} -
          {{ $t("events.categories." + item.category) }}
        </div>

        <div class="text-wrap text-h4 mb-3 mb-sm-2 mb-md-4">
          {{ item.name }}
        </div>

        <div class="text-body-1 mb-4 mb-sm-3 mb-md-4">
          {{ item.subtitle }}
        </div>

        <div class="d-flex">
          <EventsRegisterModal :item="item"></EventsRegisterModal>
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="3" v-if="lgAndUp"> </v-col>
  </v-row>

  <v-row class="mt-md-8 mt-lg-10 mt-xl-12">
    <v-col
      class="d-flex flex-column"
      cols="12"
      xl="3"
      lg="3"
      md="3"
      v-if="mdAndUp"
    >
      <div class="bg-grey-lighten-4">
        <div class="ma-md-4 ma-lg-8">
          <EventsDateTimePlace :item="item"></EventsDateTimePlace>

          <div class="mt-md-4">
            {{ $t("inscription-gratuite-et-obligatoire") }}
          </div>
        </div>
        <v-responsive :aspect-ratio="1 / 1">
          <iframe
            title="openstreetmap"
            width="100%"
            height="100%"
            absolute
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&amp;layer=mapnik&amp;marker=48.851684276691216%2C2.359112799167633"
            @click="redirectToMap(2.35911, 48.85168)"
            @keyup.enter="redirectToMap(2.35911, 48.85168)"
          ></iframe
        ></v-responsive>
      </div>

      <v-sheet class="mt-md-8 mt-lg-10 mt-xl-12">
        <v-list>
          <v-list-subheader class="text-overline font-weight-bold">{{
            $t("document")
          }}</v-list-subheader>

          <v-list-item
            v-for="(file, i) in item.files"
            :key="i"
            :value="file"
            v-if="item.files && item.files.length"
          >
            <template v-slot:prepend>
              <v-icon v-if="mdAndUp" :icon="getFileIcon(file.url)"></v-icon>
            </template>
            <v-list-item-title
              class="text-wrap"
              v-text="file.name"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>

      <MiscMoleculesRelatedItems
        type="news"
        :items="item.relatedNews"
      ></MiscMoleculesRelatedItems>
      <MiscMoleculesRelatedItems
        type="project"
        :items="item.relatedProjects"
      ></MiscMoleculesRelatedItems>
    </v-col>

    <v-col class="d-flex flex-row" cols="12" v-if="sm">
      <v-row class="ml-sm-1">
        <v-col cols="6">
          <v-responsive :aspect-ratio="1 / 1" class="bg-grey-lighten-4">
            <v-img
              :src="item.image"
              :aspect-ratio="1 / 1"
              cover
              class="img-animation"
            >
            </v-img>
          </v-responsive>
        </v-col>
        <v-col cols="6">
          <EventsDateTimePlace :item="item"></EventsDateTimePlace>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="ml-2" cols="12" v-if="xs">
      <v-responsive :aspect-ratio="1 / 1" class="bg-grey-lighten-4">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </v-responsive>
    </v-col>

    <v-col class="ml-2" cols="12" v-if="xs">
      <EventsDateTimePlace :item="item"></EventsDateTimePlace>
    </v-col>

    <v-col cols="12" xl="6" lg="6" md="8" class="px-0">
      <div class="ml-md-8 ml-lg-10 ml-xl-12" v-if="mdAndUp">
        <v-sheet>
          <v-tabs v-model="panel" bg-color="transparent" grow>
            <v-tab class="font-weight-bold text-body-1">
              {{ $t("presentation") }}
            </v-tab>

            <v-tab class="font-weight-bold text-body-1">
              {{ $t("programme") }}
            </v-tab>
          </v-tabs>

          <v-tabs-window v-model="panel">
            <v-tabs-window-item>
              <v-sheet class="my-6">
                {{ item.description }}
              </v-sheet>
            </v-tabs-window-item>
            <v-tabs-window-item>
              <v-sheet class="my-6">
                <ContentRenderer
                  ><ContentRendererMarkdown
                    :value="item"
                  ></ContentRendererMarkdown>
                </ContentRenderer>
              </v-sheet>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-sheet>
      </div>

      <div class="" v-if="smAndDown">
        <v-expansion-panels v-model="panel" ripple elevation="0" class="">
          <v-expansion-panel
            :text="item.description"
            :title="$t('presentation')"
            value="presentation"
          ></v-expansion-panel>

          <v-expansion-panel :title="$t('programme')" value="program">
            <v-expansion-panel-text>
              <ContentRenderer
                ><ContentRendererMarkdown
                  :value="item"
                ></ContentRendererMarkdown> </ContentRenderer
            ></v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel :title="$t('details-0')" value="details">
            <v-expansion-panel-text> Details content</v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-col>
    <v-col cols="12" xl="3" lg="3" v-if="lgAndUp" class="d-flex">
      <ActionsSmallContainer
        :action="action"
        :ratio="1 / 2"
      ></ActionsSmallContainer>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import getFileIcon from "~/composables/useIcons"
const { name, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const localePath = useLocalePath()
const router = useRouter()
const { $i18n } = useNuxtApp()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// UI components models
const panel = ref(["presentation"])

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
)

function redirectToMap(long, lat) {
  router.push(
    `https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${long}#map=19/${lat}/${long}`
  )
}
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
