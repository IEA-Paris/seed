<template>
  <v-row class="my-6">
    <!--     <v-col cols="12" sm="1" :order="smAndUp ? 'first' : 'first'">
      <MiscAtomsDateStamp :date="new Date(item.date)"></MiscAtomsDateStamp>
    </v-col> -->
    <v-col cols="12" sm="8" :order="smAndUp ? 'first' : 'last'">
      <v-row no-gutters>
        <v-col cols="12" sm="10" lg="9">
          <v-row no-gutters>
            <v-col cols="12" :order="smAndUp ? 'first' : 'last'"
              ><a class="text-h6 text-black" :href="localePath(item._path)">
                {{ item.title }}
              </a></v-col
            >

            <v-col cols="12">
              <div class="text-body-1" v-if="smAndUp">
                {{ item.shortDescription }}
              </div></v-col
            >
            <v-col cols="12" class="d-flex flex-row mr-3 my-3" v-if="smAndUp">
              <v-chip v-if="item.type === 1">
                <template v-slot:prepend>
                  <v-icon color="green" class="mr-3">mdi-circle</v-icon>
                </template>
                {{ $t("registration-open") }}
              </v-chip>
              <v-btn nuxt :to="localePath(item.link)" class="justify-right">{{
                $t("more-info")
              }}</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="2" offset-lg="1" v-if="smAndUp">
          <div class="text-overline text-medium-emphasis">
            {{ $t("date-and-time") }}
          </div>
          <div class="text-body-1">
            {{
              new Date(item.publicationDate).toLocaleString($i18n.locale, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </div>
          <template v-if="item.location">
            <div class="text-overline text-medium-emphasis mt-3">
              {{ $t("location") }}
            </div>
            <div class="text-body-1">{{ item.location }}</div>
          </template>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" sm="3" :order="smAndUp ? 'last' : 'first'">
      <v-img
        :src="item.picture"
        :alt="item.title"
        :aspect-ratio="1 / 1"
        :max-width="mdAndUp ? '250px' : '100%'"
        cover
        class="ml-auto"
        nuxt
        :to="localePath(item.link)"
      ></v-img> </v-col
  ></v-row>
  <v-divider></v-divider>
</template>
<script setup lang="ts">
const { $i18n } = useNuxtApp();

import { useDisplay } from "vuetify";
const { smAndUp, mdAndUp, name } = useDisplay();
const localePath = useLocalePath();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss"></style>
