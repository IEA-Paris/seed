<template>
  <div>
    <v-row>
      <v-col cols="12" md="3" v-if="mdAndUp">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :ratio="1 / 1"
          :loading="rootStore.events.loading"
        />
      </v-col>

      <v-col
        cols="12"
        md="9"
        class="d-flex flex-sm-column flex-md-column justify-md-end flex-wrap"
      >
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.events.loading"
          width="100%"
          :type="
            [
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
              'subtitle, heading@2, text, button',
            ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
          "
        ></v-skeleton-loader>

        <template v-else>
          <div class="d-flex align-center flex-column">
            <div class="d-flex text-center text-wrap text-h3 text-black">
              {{ item.name }}
            </div>

            <v-divider width="154px" class="mb-1 mt-6"></v-divider>
            <v-divider width="154px"></v-divider>

            <div
              class="d-flex text-center text-wrap text-h5 font-weight-black mt-6"
            >
              {{ $t("events.categories." + item.category) }}
            </div>

            <div class="d-flex text-center text-wrap text-h5 text-black mt-4">
              {{ item.subtitle }}
            </div>

            <div class="d-flex text-center text-wrap text-h5 text-black mt-4">
              <EventsBadges :item="item" />
            </div>

            <v-divider width="154px" class="mb-1 mt-6"></v-divider>
            <v-divider width="154px"></v-divider>
          </div>
        </template>
      </v-col>
    </v-row>

    <v-row class="mt-md-3 mt-lg-10 mt-xl-12">
      <v-col class="d-flex flex-column" cols="12" md="3" v-if="mdAndUp">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.events.loading"
          height="100%"
          :type="
            [
              '',
              '',
              'image, image, heading, list-item@2',
              'image, image, heading, list-item@2',
              'image, image, heading, list-item@2',
              'image, image, heading, list-item@2',
            ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
          "
        ></v-skeleton-loader>

        <template v-else>
          <div class="bg-grey-lighten-4">
            <div class="ma-md-4 ma-lg-8">
              <EventsDateTimePlace :item="item"></EventsDateTimePlace>

              <div class="mt-md-4">
                <!--  TODO: bind -->
                {{ $t("inscription-gratuite-et-obligatoire") }}
              </div>
            </div>
          </div>

          <div class="mt-md-4 mt-lg-6 mt-xl-8">
            <EventsRegisterModal :item="item">
              <template v-slot:activator="activatorProps"
                ><v-btn
                  color="grey-lighten-3"
                  v-bind="activatorProps"
                  flat
                  tile
                  size="small"
                  class="my-2"
                  style="height: auto"
                >
                  <template v-slot:append>
                    <v-icon class="text-green" size="x-large">
                      mdi-circle-medium</v-icon
                    >
                  </template>
                  {{ $t("inscription-ouverte") }}
                </v-btn></template
              >
            </EventsRegisterModal>
          </div>

          <v-sheet class="mt-md-0 mt-lg-2 mt-xl-4">
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
        </template>
      </v-col>

      <v-col class="d-flex flex-row" cols="12" v-if="sm">
        <v-row class="ml-sm-1">
          <v-col cols="6">
            <MiscAtomsImageContainer
              cover
              :src="item.image"
              :ratio="1 / 1"
              :loading="rootStore.events.loading"
            />
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader
              v-if="rootStore.loading || rootStore.events.loading"
              type="heading, subtitle, heading, subtitle, ossein, button"
            ></v-skeleton-loader>
            <EventsDateTimePlace v-else :item="item"></EventsDateTimePlace>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="ml-2" cols="12" v-if="xs">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :ratio="1 / 1"
          :loading="rootStore.events.loading"
        />
      </v-col>

      <v-col class="ml-2" cols="12" v-if="xs">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.events.loading"
          type="heading, subtitle, heading, subtitle, ossein, button"
        ></v-skeleton-loader>
        <EventsDateTimePlace v-else :item="item"></EventsDateTimePlace>
      </v-col>

      <v-col cols="12" md="9" class="px-0">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.events.loading"
          :type="
            [
              'avatar, text, ossein, avatar, text, ossein, avatar, text',
              'avatar, text, ossein, avatar, text, ossein, avatar, text',
              'button, button, ossein, text@40',
              'button, button, ossein, text@50',
              'button, button, ossein, text@50',
              'button, button, ossein, text@50',
            ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
          "
        ></v-skeleton-loader>

        <template v-else>
          <div class="ml-md-8 ml-lg-10 ml-xl-12">
            <v-expansion-panels
              outlined
              flat
              eager
              ripple
              variant="accordion"
              class="py-8"
              v-model="panel"
            >
              <v-expansion-panel
                :value="panel[0]"
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t("presentation") }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="py-2"
                  style="white-space: pre; text-wrap: auto"
                >
                  {{ item.description }}
                </v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t("programme") }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <ContentRenderer
                    ><ContentRendererMarkdown
                      :value="item"
                    ></ContentRendererMarkdown> </ContentRenderer
                ></v-expansion-panel-text>
              </v-expansion-panel>

              <v-expansion-panel
                class="border-thin text-black"
                :color="key === accordeon ? 'light-grey' : 'white'"
              >
                <v-expansion-panel-title
                  collapse-icon="mdi-minus"
                  expand-icon="mdi-plus"
                  class="text-h6"
                  :class="{ 'font-weight-black': key === accordeon }"
                >
                  {{ $t("details-0") }}
                </v-expansion-panel-title>
                <v-expansion-panel-text
                  class="border-thin text-black"
                  :color="key === accordeon ? 'light-grey' : 'white'"
                >
                  Details content<!--  TODO: bind --></v-expansion-panel-text
                >
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </template>
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
    <v-responsive class="mx-auto my-9" width="120">
      <v-divider class="mb-1" />
      <v-divider />
    </v-responsive>
    <v-row>
      <v-col cols="12" md="4">
        <MiscMoleculesRelatedItems
          type="events"
          :items="item.relatedEvents"
        ></MiscMoleculesRelatedItems
      ></v-col>

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
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import getFileIcon from "~/composables/useIcons"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const { name, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const localePath = useLocalePath()
const router = useRouter()
const { locale } = useI18n()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// UI components models
const panel = ref(["presentation"])

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)

function redirectToMap(long, lat) {
  router.push(
    `https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${long}#map=19/${lat}/${long}`,
  )
}
</script>
