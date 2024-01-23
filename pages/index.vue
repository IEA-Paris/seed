<template>
  <HomeCarousel :featured="featured"></HomeCarousel>
  <v-container>
    <v-divider inset class="mt-3 mb-12"></v-divider>
    <v-row>
      <v-col cols="12" md="4">
        <div class="text-h3 mt-9" :class="mdAndUp ? 'text-right' : 'text-left'">
          {{ presentation[0].title }}
        </div></v-col
      >
      <v-col cols="12" md="8">
        <v-card flat class="d-flex align-center justify-center pa-6">
          <ContentDoc
            :path="'/pages/' + $i18n.locale.value + '/institute_presentation'"
        /></v-card>
      </v-col>
      <v-divider class="mt-3 mb-12"></v-divider>

      <v-col cols="12" sm="8">
        <v-card flat>
          <h1>{{ $t("upcoming-events") }}</h1>
          <EventListContainer :events="events"></EventListContainer> </v-card
      ></v-col>
      <v-col cols="4" v-if="smAndUp">
        <ActionsSmallContainer :action="action"></ActionsSmallContainer>
      </v-col>
      <v-divider class="mt-3 mb-12"></v-divider>
      <v-col cols="12" class="mb-12">
        <HomeCountUpStats></HomeCountUpStats>
      </v-col>
      <v-divider class="mt-3 mb-12"></v-divider>
      <PeopleSlidingGroup :items="fellows"></PeopleSlidingGroup>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp } = useDisplay()
const localePath = useLocalePath()

const config = useAppConfig()
const { locale } = useI18n()

const { $i18n } = useNuxtApp()
const { data: featured } = await useAsyncData("featured-list", () =>
  queryContent("/carousel/" + $i18n.locale.value).find()
)
const { data: events } = await useAsyncData("event-list", () =>
  queryContent("/event/" + $i18n.locale.value)
    .sort({ date: 1 })
    .find()
)
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
)
const { data: fellows } = await useAsyncData("fellows", () =>
  queryContent("/fellows/" + $i18n.locale.value).find()
)
const { data: presentation } = await useAsyncData("presentation", () =>
  queryContent("/pages/" + $i18n.locale.value + "/institute_presentation")
    .limit(1)
    .find()
)
</script>
