<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3" md="3" v-if="mdAndUp">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :ratio="1 / 1"
          :loading="rootStore.events.loading"
        />
      </v-col>

      <v-col
        cols="12"
        lg="6"
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
          <div class="ml-2 ml-sm-4 ml-md-8 ml-lg-10 ml-xl-12">
            <div class="mt-2 text-h6 text-overline font-weight-black">
              {{ $t("events.categories." + item.category) }}
            </div>

            <div class="text-wrap text-h4 mb-3 mb-sm-2 mb-md-4">
              {{ item.name }}
            </div>

            <div class="text-body-1 mb-4 mb-sm-3 mb-md-4">
              {{ item.subtitle }}
            </div>

            <div class="d-flex">
              <EventsBadges :item="item"></EventsBadges>
            </div>
          </div>
        </template>
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

      <v-col cols="12" xl="6" lg="6" md="8" class="px-0">
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

          <div v-if="smAndDown">
            <v-expansion-panels v-model="panel" ripple elevation="0">
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
                <v-expansion-panel-text>
                  Details content<!--  TODO: bind --></v-expansion-panel-text
                >
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </template>
      </v-col>
      <v-col cols="12" xl="3" lg="3" v-if="lgAndUp" class="d-flex">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.events.loading"
          :type="['', '', ''][['lg', 'xl', 'xxl'].indexOf(name || 'md')]"
        ></v-skeleton-loader>

        <ActionsSmallContainer
          v-else
          :action="action"
          :ratio="1 / 2"
        ></ActionsSmallContainer>
      </v-col>
    </v-row>
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
