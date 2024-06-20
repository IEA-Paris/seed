<template>
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-8 px-sm-12 px-4" no-gutters>
    <MiscAtomsDateStamp :date="item.start" class="pr-6" />
    <v-col cols="12" md="8" lg="9" class="px-md-6 mt-6 mt-md-0">
      <v-row no-gutters>
        <v-col cols="12" md="8">
          <nuxt-link
            :to="
              localePath({
                name: 'activities-events-slug',
                params: { slug: item._path.split('/').pop() },
              })
            "
            class="text-h4 text-black text-wrap"
          >
            {{ item.title }}
            {{ item.slug }}
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
        </v-col>

        <v-col cols="12" lg="1" v-if="lgAndUp"> </v-col>

        <v-col cols="12" md="4" lg="3" class="px-md-6">
          <v-row no-gutters>
            <v-col cols="12">
              <div class="text-overline">
                {{ $t("date-and-time") }}
              </div>
              <div class="text-body-1">
                {{ item.date_text }} <br />
                {{ formatDate(item.start, $i18n.locale) }}
              </div>
            </v-col>
            <v-col cols="12" class="my-6" v-if="item.location">
              <div class="text-overline">
                {{ $t("location") }}
              </div>
              <div class="text-body-1">
                {{ item.location }}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="d-flex flex-row align-center flex-wrap" v-if="mdAndDown">
        <v-btn
          color="grey-lighten-3"
          flat
          rounded="0"
          prepend-icon="mdi-circle-medium"
          size="small"
          class="my-2"
        >
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
        >
          {{ $t("live-stream-available") }}</v-btn
        >
      </div>
    </v-col>
    <v-col cols="12" md="3" lg="2" xl="2">
      <div class="overflow-hidden">
        <nuxt-link
          :to="
            localePath({
              name: 'activities-events-slug',
              params: { slug: item._path.split('/').pop() },
            })
          "
        >
          <v-img
            :src="item.image"
            :aspect-ratio="1 / 1"
            cover
            class="img-animation"
          >
          </v-img>
        </nuxt-link>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"

const { name, smAndUp, mdAndDown, mdAndUp, lgAndUp } = useDisplay()
const localePath = useLocalePath()
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

<style lang="scss" scoped>
// TODO: Add the following styles to the global styles
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
