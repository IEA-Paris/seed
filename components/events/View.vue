<template>
  {{ name }}
  <v-row>
    <v-col cols="12" xl="3" lg="3" md="3" v-if="mdAndUp">
      <div class="overflow-hidden">
        <v-img
          :src="data.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col
      cols="12"
      xl="6"
      lg="6"
      md="9"
      class="d-flex flex-sm-column flex-md-column justify-md-end flex-wrap"
    >
      <div class="text-wrap text-body-1 mb-md-4 mb-sm-2 mb-xs-2">
        {{ data.date_text }}
      </div>

      <div class="text-wrap text-h5 mb-xs-2 mb-sm-2 mb-md-4">
        {{ data.name }}
      </div>

      <div class="text-body-1 mb-md-4 mb-sm-3 mb-xs-2">
        {{ data.subtitle }}
      </div>

      <div class="d-flex">
        <div class="mr-12">
          <v-btn
            class="text-body-1"
            rounded
            variant="tonal"
            append-icon="mdi-circle-medium"
          >
            <template v-slot:append>
              <v-icon class="text-brown-lighten-3"> mdi-circle-medium</v-icon>
            </template>
            {{ $t("inscription-ouverte") }}
          </v-btn>
        </div>

        <div class="text-body-1">
          <v-btn variant="text" class="text-body-1">
            {{ data.category }}
          </v-btn>
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="3" v-if="lgAndUp"> </v-col>
  </v-row>

  <v-row>
    <v-col
      class="d-flex flex-column"
      cols="12"
      xl="3"
      lg="3"
      md="3"
      v-if="mdAndUp"
    >
      <v-responsive :aspect-ratio="1 / 2" class="bg-grey-lighten-2">
        <div class="ma-md-4 ma-lg-8">
          <div class="text-body-1">{{ $t("date-et-heure") }}</div>
          <div>
            <div>{{ startDay }}</div>
            <div>{{ startTime }} - {{ stopTime }}</div>
          </div>

          <div class="text-body-1 mt-md-4">
            {{ $t("location") }}
          </div>
          <div>
            <div>
              {{ startDay }}
            </div>
            <div>{{ data.location }}</div>

            <div>
              <v-icon class="text-blue-accent-4"
                >mdi-chevron-double-right
              </v-icon>
              <nuxt-link to="/"> {{ $t("details") }} </nuxt-link>
            </div>
          </div>

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
      </v-responsive>

      <v-card flat class="mt-md-4 mt-lg-8 mt-xl-12">
        <v-list>
          <v-list-subheader>{{ $t("document") }}</v-list-subheader>

          <v-list-item v-for="(item, i) in items" :key="i" :value="item">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title
              class="text-wrap"
              v-text="item.text"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>

    <v-col class="d-flex flex-row" cols="12" v-if="sm">
      <v-row>
        <v-col cols="6">
          <v-responsive :aspect-ratio="1 / 1" class="bg-grey-lighten-2">
            <v-img
              :src="data.image"
              :aspect-ratio="1 / 1"
              cover
              class="img-animation"
            >
            </v-img>
          </v-responsive>
        </v-col>
        <v-col cols="6">
          <div class="text-body-1">
            {{ $t("location") }}
          </div>
          <div>
            <div>
              {{ startDay }}
            </div>
            <div>{{ data.location }}</div>

            <div>
              <v-icon class="text-blue-accent-4"
                >mdi-chevron-double-right
              </v-icon>
              <nuxt-link to="/"> {{ $t("details") }}</nuxt-link>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="xs">
      <v-responsive :aspect-ratio="1 / 1" class="bg-grey-lighten-2">
        <v-img
          :src="data.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </v-responsive>
    </v-col>

    <v-col cols="12" v-if="xs">
      <div class="text-body-1">
        {{ $t("location") }}
      </div>
      <div>
        <div>
          {{ startDay }}
        </div>
        <div>{{ data.location }}</div>

        <div>
          <v-icon class="text-blue-accent-4">mdi-chevron-double-right </v-icon>
          <nuxt-link to="/"> {{ $t("details") }}</nuxt-link>
        </div>
      </div>
    </v-col>

    <v-col cols="12" xl="6" lg="6" md="8">
      <div v-if="mdAndUp">
        <v-sheet>
          <v-tabs v-model="tab" bg-color="transparent" grow>
            <v-tab
              v-for="item in items"
              :key="item.header"
              :text="item.header"
              :value="item.header"
            ></v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item
              v-for="item in items"
              :key="item.header"
              :value="item.header"
            >
              <v-sheet mt-md-4>
                {{ item.content }}
              </v-sheet>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-sheet>
      </div>

      <div v-if="smAndDown"></div>
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
import { getDetailedFormatedDate } from "~/composables/useUtils"
const { name, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()

const localePath = useLocalePath()
const router = useRouter()
const { $i18n } = useNuxtApp()
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const detailedStart = getDetailedFormatedDate(
  props.data.start,
  $i18n.locale.value
)
const startDay = ref(
  `${detailedStart.day} ${detailedStart.month} ${detailedStart.year}`
)
const startTime = ref(detailedStart.hours)
const detailedStop = getDetailedFormatedDate(
  props.data.stop,
  $i18n.locale.value
)
const stopTime = ref(detailedStop.hours)

// const items = [
//   { text: "Le programme (PDF)", icon: "mdi-file-pdf-box" },
//   { text: "Resumés des présentations", icon: "mdi-file-pdf-box" },
// ]
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

const dataValue = [
  {
    header: props.data.label[0],
    content: props.data.presentation,
  },
  {
    header: props.data.label[1],
    content: props.data.programme,
  },
]
const tab = ref(dataValue[0].header)
const items = ref(dataValue)
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
