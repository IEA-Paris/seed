<template>
  <!-- Header -->
  <v-row>
    <v-col cols="3">
      <MiscAtomsDateStamp
        v-if="item.start"
        :date="[
          new Date(item.start),
          ...(item.stop ? [new Date(item.stop)] : []),
        ]"
      ></MiscAtomsDateStamp>
    </v-col>
    <v-col cols="9">
      <v-row>
        <v-col cols="12" class="text-h2">
          {{ item.title }}
        </v-col>
        <v-col cols="12">
          <v-btn color="">{{ $t("watch-the-replay") }}</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <!-- image -->
    <v-col cols="12" class="">
      <v-row>
        <v-col cols="3">
          <MiscAtomsOptimizedImage
            :src="item.picture"
            :alt="item.title"
            :width="150"
            :aspect-ratio="1 / 1"
            cover
          ></MiscAtomsOptimizedImage>
        </v-col>
        <!-- date time details -->
        <v-col cols="3" class="text-h6">
          <v-sheet border class="pa-6 h-100">
            <div class="text-overline">{{ $t("date-and-time") }}</div>
            <div>
              {{
                item.date_text +
                " " +
                new Date(item.start).toLocaleString($i18n.locale, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }}
            </div></v-sheet
          >
        </v-col>
        <v-col cols="3" class="text-h6">
          <v-sheet border class="pa-6 h-100">
            <div class="text-overline">{{ $t("location") }}</div>
            <div>{{ item.location }}</div></v-sheet
          >
        </v-col>
        <v-col cols="3" class="text-h6">
          <v-sheet border class="pa-6 h-100">
            Inscription details
            <v-btn color="success">Register</v-btn></v-sheet
          >
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <!-- Organizers & documents -->
    <v-col cols="3">
      <div>
        <div class="text-overline">
          {{ $t("organizers") }}
        </div>
        <div>
          {{ item.organizers }}
        </div>
      </div>
      <div v-if="item.files && item.files.length">
        <div class="text-overline">
          {{ $t("documents") }}
        </div>
        <div v-for="(doc, index) in item.files" :key="index">
          <v-icon>mdi-pdf</v-icon>
          <a :href="doc.link" target="_blank">{{ doc.name }}</a>
        </div>
      </div>
    </v-col>
    <!-- Description -->
    <v-col cols="9">
      <ContentRenderer :value="item" />
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp, name } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style lang="scss"></style>
