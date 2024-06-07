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
      <div class="text-wrap text-body-1 mb-md-4">
        {{ data.date_text ?? "Not defined" }}
      </div>

      <div class="text-wrap text-h5 mb-md-4">
        {{ data.name ?? "Not defined" }}
      </div>

      <div class="text-body-1 mb-md-4">
        {{ data.subtitle ?? "Not defined" }}
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
            Inscription Ouverte
          </v-btn>
        </div>

        <div class="text-body-1">
          <v-btn variant="text" class="text-body-1">
            {{ data.category ?? "Not defined" }}
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
            <div>De {{ startTime }}H à {{ stopTime }}H</div>
          </div>

          <div class="text-body-1 mt-md-4">
            {{ $t("location") }}
          </div>
          <div>
            <div>
              {{ startDay }}
            </div>
            <div>IEA Paris</div>

            <div>
              <v-icon class="text-blue-accent-4"
                >mdi-chevron-double-right
              </v-icon>
              <nuxt-link to="/"> {{ $t("details") }} </nuxt-link>
            </div>
          </div>

          <div class="mt-md-4">
            {{ data.tag ?? "Inscription gratuite et obligatoire" }}
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
            @click="
              router.go(
                'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911'
              )
            "
            @keyup.enter="
              router.go(
                'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911'
              )
            "
          ></iframe
        ></v-responsive>
      </v-responsive>

      <v-card flat class="mt-md-4 mt-lg-8 mt-xl-12">
        <v-list>
          <v-list-subheader>{{ data.tag ?? "DOCUMENT(S)" }}</v-list-subheader>

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

    <v-col class="d-flex flex-row" cols="12" v-if="smAndDown">
      <v-row>
        <v-col cols="6">
          <div class="text-body-1">
            {{ $t("location") }}
          </div>
          <div>
            <div>
              {{ startDay }}
            </div>
            <div>IEA Paris</div>

            <div>
              <v-icon class="text-blue-accent-4"
                >mdi-chevron-double-right
              </v-icon>
              <nuxt-link to="/"> Plus de details </nuxt-link>
            </div>
          </div>
        </v-col>
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
      </v-row>
    </v-col>

    <v-col cols="12" xl="6" lg="6" md="8">
      <div v-if="mdAndUp">
        <v-slide-group show-arrows>
          <v-slide-group-item v-slot="{ isSelected, toggle }">
            <v-btn
              flat
              @click="handleSelection('EventsPresentationItem', toggle)"
              class="mr-md-8"
              :color="isSelected ? 'grey-lighten-3' : undefined"
            >
              Presentation
            </v-btn>
          </v-slide-group-item>

          <v-slide-group-item v-slot="{ isSelected, toggle }">
            <v-btn
              flat
              @click="handleSelection('EventsProgramItem', toggle)"
              :color="isSelected ? 'grey-lighten-3' : undefined"
            >
              Programme
            </v-btn>
          </v-slide-group-item>
        </v-slide-group>
        <div class="mt-md-4">
          <component :is="activeComponent" />
        </div>
      </div>
      <div v-if="smAndDown">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-title>Programme</v-expansion-panel-title>
            <v-expansion-panel-text>
              <EventsProgramItem></EventsProgramItem>
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>Presentation</v-expansion-panel-title>
            <v-expansion-panel-text>
              <EventsPresentationItem></EventsPresentationItem>
            </v-expansion-panel-text>
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

<script lang="ts" setup>
import { useDisplay } from "vuetify";
import { getDetailedFormatedDate } from "~/composables/useUtils";
const { name, lgAndUp, mdAndUp, smAndDown } = useDisplay();

const localePath = useLocalePath();
const { router } = useRouter();

const { $i18n } = useNuxtApp();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const detailedStart = getDetailedFormatedDate(
  props.data.start,
  $i18n.locale.value
);
const startDay = ref(
  `${detailedStart.day} ${detailedStart.month} ${detailedStart.year}`
);
const startTime = ref(detailedStart.hours);

const detailedStop = getDetailedFormatedDate(
  props.data.stop,
  $i18n.locale.value
);

const stopTime = ref(detailedStop.hours);

const activeComponent = ref("EventsPresentationItem");

const panel = ref([0, 1]);
function handleSelection(component: string, toggle: Function) {
  activeComponent.value = component;
  toggle();
}

console.log("detailedStart", detailedStart);
const items = [
  { text: "Le programme (PDF)", icon: "mdi-file-pdf-box" },
  { text: "Resumés des présentations", icon: "mdi-file-pdf-box" },
];

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
);
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
