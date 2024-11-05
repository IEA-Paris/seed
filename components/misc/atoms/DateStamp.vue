<template>
  <v-skeleton-loader
    v-if="loading"
    max-width="120px"
    class="d-flex flex-row flex-md-column align-center align-md-end"
    :type="
      ['avatar', 'avatar', 'avatar', 'avatar', 'avatar', 'avatar'][
        ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
      ]
    "
  >
  </v-skeleton-loader>
  <div
    v-else
    class="date-stamp d-flex flex-md-column text-md-right align-center align-md-end"
  >
    <span class="day"> {{ detailedDateStart.day }}</span>
    <span class="month-year">
      {{ detailedDateStart.month }}<br />
      {{ detailedDateStart.year }}
    </span>
    <template v-if="showDateStop" class="month-year">
      &ndash;
      <template v-if="mdAndUp">
        <span class="font-weight-bold"> {{ detailedDateStop.day }}</span>
        <span>
          {{ detailedDateStop.month }}<br />
          {{ detailedDateStop.year }}
        </span>
      </template>

      <template v-else>
        <span> {{ detailedDateStop.day }}</span>
        <span>
          {{ detailedDateStop.month }}<br />
          {{ detailedDateStop.year }}
        </span>
      </template>
    </template>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndDown, smAndUp, mdAndUp, name } = useDisplay()
import {
  getDetailedFormatedDate,
  formatDateValue,
} from "~/composables/useUtils"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const { locale } = useI18n()
const props = defineProps({
  dateStart: {
    type: String,
  },
  dateStop: {
    type: String,
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
})

const detailedDateStart = computed(() =>
  getDetailedFormatedDate(props.dateStart, locale.value),
)

const detailedDateStop = computed(() =>
  getDetailedFormatedDate(props.dateStop, locale.value),
)

const showDateStop = computed(() => {
  const dateStartFormatted = formatDateValue(props.dateStart, locale.value)
  const dateStopFormatted = formatDateValue(props.dateStop, locale.value)
  return dateStopFormatted > dateStartFormatted
})
</script>
<style lang="scss" scoped>
.date-stamp {
  font-family: "Open sans";
  .day {
    font-size: 2.6rem;
    line-height: 2.6rem;
    font-family: "Bodoni Moda", sans-serif;
  }
  .month-year {
    padding-left: 0.5rem;
    font-size: 1rem;
    line-height: 1.2rem;
  }
}
</style>
