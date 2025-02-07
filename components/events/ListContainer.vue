<template>
  <v-sheet v-for="(event, i) in events" :key="i" flat class="ma-6">
    <v-row
      :value="event"
      @click="
        $router.push(localePath('/activities/events/' + slugify(event.title)))
      "
      style="cursor: pointer"
    >
      <v-col cols="3">
        <MiscAtomsDateStamp
          :loading="rootStore.events.loading"
          :date="[
            new Date(event.start),
            ...(event.stop ? [new Date(event.stop)] : []),
          ]"
        ></MiscAtomsDateStamp>
      </v-col>
      <v-col cols="9">
        <v-list-item-title class="text-h6 my-3">
          {{ event.title }}
        </v-list-item-title>
        <v-list-item-subtitle v-text="event.summary"></v-list-item-subtitle>
        <v-chip class="mr-2 mt-3" color="primary" v-if="event.online">
          {{ $t("online") }}
        </v-chip>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup>
import { useDisplay } from "vuetify"
const { smAndUp, xsOnly } = useDisplay()
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const { locale } = useI18n()
const props = defineProps({
  events: {
    type: Array,
    required: true,
  },
})
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
// const localePath = useLocalePath()
</script>
<style lang="scss"></style>
