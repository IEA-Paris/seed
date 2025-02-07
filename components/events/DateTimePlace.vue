<template>
  <div class="text-overline font-weight-bold">
    {{ $t("date-et-heure") }}
  </div>
  <div>
    <div>{{ startDay }}</div>
    <div>{{ startTime }} - {{ stopTime }}</div>
  </div>

  <div class="text-overline font-weight-bold mt-md-4">
    {{ $t("location") }}
  </div>
  <div>
    {{ startDay }}
  </div>
  <div>{{ item.location }}</div>

  <v-btn
    variant="text"
    class="ml-n4"
    @click="open = !open"
    size="small"
    :prepend-icon="
      open ? 'mdi-chevron-double-down' : 'mdi-chevron-double-right'
    "
  >
    {{ $t("show-on-map") }}
  </v-btn>
  <v-expand-transition>
    <v-responsive :aspect-ratio="1 / 1" v-show="open">
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
  </v-expand-transition>
  <br />
  <v-btn
    variant="text"
    class="ml-n4"
    size="small"
    prepend-icon="mdi-open-in-new"
  >
    {{ $t("details") }}
  </v-btn>
</template>

<script setup>
import { getDetailedFormatedDate } from "~/composables/useUtils"
const { locale } = useI18n()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const open = ref(false)
const detailedStart = getDetailedFormatedDate(props.item.start, locale.value)
const startDay = ref(
  `${detailedStart.day} ${detailedStart.month} ${detailedStart.year}`,
)
const startTime = ref(detailedStart.hours)
const detailedStop = getDetailedFormatedDate(props.item.stop, locale.value)
const stopTime = ref(detailedStop.hours)
</script>

<style lang="scss" scoped></style>
