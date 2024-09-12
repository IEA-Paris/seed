<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-8 px-sm-12 px-md-4" no-gutters>
    <v-col cols="12" md="1">
      <MiscAtomsDateStamp
        :loading="rootStore.events.loading"
        :date="item.start"
        class="pr-6 mt-md-2"
      />
    </v-col>
    <v-col cols="12" md="8" class="px-md-6 mt-6 mt-md-0">
      <v-row no-gutters>
        <v-col cols="12" lg="9" class="pr-lg-6">
          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.events.loading"
            :type="
              [
                'heading, subtitle, text@6,subtitle, text,  ossein,  button, button',
                'heading, subtitle, text@6,subtitle, text,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
              ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
            "
          >
          </v-skeleton-loader>

          <div v-else>
            <nuxt-link
              :to="
                localePath({
                  name: 'activities-events-slug',
                  params: { slug: getSlugFromPath(item._path) },
                })
              "
              class="text-h4 text-black text-wrap mt-4"
            >
              {{ item.title }}
            </nuxt-link>
            <div class="mt-2 text-h6 text-overline font-weight-black">
              {{ $t("events.categories." + item.category) }}
            </div>
            <p class="text-body-1 text-wrap">
              {{ item.description }}
            </p>
            <div class="d-flex flex-row align-center flex-wrap" v-if="lgAndUp">
              <v-btn
                color="grey-lighten-3"
                flat
                rounded="0"
                prepend-icon="mdi-circle-medium"
              >
                <template v-slot:prepend>
                  <v-icon size="large" color="success"></v-icon>
                </template>
                {{ $t("registration-open") }}</v-btn
              >
              <v-btn
                color="grey-lighten-3"
                flat
                rounded="0"
                prepend-icon="mdi-television-play"
                class="ml-md-4"
              >
                {{ $t("live-stream-available") }}</v-btn
              >
            </div>
          </div>
        </v-col>

        <v-col cols="12" lg="3">
          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.events.loading"
            type="text,paragraph, text, paragraph"
          >
          </v-skeleton-loader>

          <div v-else>
            <div class="text-overline">
              {{ $t("date-and-time") }}
            </div>
            <div class="text-body-1">
              {{ item.date_text }} <br />
              {{ formatDate(item.start, locale) }}
            </div>
            <template v-if="item.location">
              <div class="text-overline mt-6">
                {{ $t("location") }}
              </div>
              <div class="text-body-1">
                {{ item.location }}
              </div>
            </template>
          </div>
        </v-col>
      </v-row>
      <v-row
        class="d-flex flex-row align-center flex-wrap"
        no-gutters
        v-if="mdAndDown"
      >
        <v-col cols="12">
          <v-skeleton-loader
            v-if="rootStore.loading || rootStore.events.loading"
            :type="
              ['article, heading, text, heading, text, button, button'][
                ['md'].indexOf(name || 'md')
              ]
            "
          >
          </v-skeleton-loader>

          <div v-else>
            <v-btn
              color="grey-lighten-3"
              flat
              rounded="0"
              prepend-icon="mdi-circle-medium"
              size="small"
              class="my-2"
              ><!--  TODO: bind -->
              <template v-slot:prepend>
                <v-icon size="large" color="success"></v-icon>
              </template>
              {{ $t("registration-open") }}</v-btn
            >
            <v-divider vertical class="mx-3" v-if="smAndUp"></v-divider>
            <v-btn
              color="grey-lighten-3"
              flat
              rounded="0"
              prepend-icon="mdi-television-play"
              size="small"
              class="my-xs-2"
              ><!--  TODO: bind -->
              {{ $t("live-stream-available") }}</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="3">
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.events.loading"
        height="100%"
        type="image"
        class="d-flex align-start px-4"
      >
      </v-skeleton-loader>
      <MiscAtomsImageContainer
        v-else
        :link="item.title"
        :slug="getSlugFromPath(item._path)"
        name="activities-events-slug"
        :loading="rootStore.events.loading"
        :src="item.image"
        :ratio="1 / 1"
      />
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const { locale } = useI18n()
const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()
const localePath = useLocalePath()
const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
</script>
