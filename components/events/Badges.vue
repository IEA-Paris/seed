<template>
  <div>
    <EventsRegisterModal
      :item="item"
      v-if="item.bookingState === 1"
    ></EventsRegisterModal>
    <v-btn
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-circle-medium"
      size="small"
      class="my-2"
      v-if="item.bookingState === 2"
    >
      <template v-slot:prepend>
        <v-icon size="large" color="danger"></v-icon>
      </template>
      {{ $t("event-full") }}</v-btn
    >

    <v-divider vertical class="mx-3" v-if="smAndUp"></v-divider>
    <v-btn
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-television-play"
      size="small"
      class="my-xs-2"
      v-if="item.stream && item.stream.length"
      :to="
        localePath({
          name: 'activities-events-slug',
          params: { slug: getSlugFromPath(item._path) },
        })
      "
    >
      {{ $t("live-stream-available") }}</v-btn
    >

    <v-btn
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-location-exit"
      size="small"
      class="my-xs-2"
      v-if="item.outside"
    >
      {{ $t("outside-event") }}</v-btn
    >

    <v-btn
      color="grey-lighten-3"
      flat
      rounded="0"
      prepend-icon="mdi-cast-education"
      size="small"
      class="my-xs-2"
      v-if="item.eventType === 2"
    >
      {{ $t("hybrid-event") }}</v-btn
    >
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { getSlugFromPath } from "~/composables/useUtils"
const { name, smAndUp, mdAndDown, lgAndUp } = useDisplay()

const props = defineProps({
  item: { type: Object, required: true },
})
const streamAvailable = ref()
const registrationOpen = () => {
  return item.start < new Date().now() && availableSlots > 0
}
</script>

<style lang="scss" scoped></style>
