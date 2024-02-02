<template>
  <div>
    <v-row no-gutters min-width="125px">
      <v-col cols="12" class="text-left">
        <div class="text-h4 pt-0">
          {{ date[0].getDay() }}
        </div>

        <div
          class="text-overline font-weight-bold text-left"
          style="line-height: 1rem"
        >
          {{ date[0].toLocaleString($i18n.locale, { month: "long" }) }}<br />
          {{ date[0].getFullYear() }}
        </div>
      </v-col>
      <template v-if="isDouble">
        <v-col cols="12" class="text-center">
          <v-icon>mdi-chevron-down</v-icon>
        </v-col>
        <v-col cols="12" class="text-h4 pt-0 text-right">
          <div class="text-h4 pt-0">
            {{ date[1].getDay() }}
          </div>
          <div
            class="text-overline font-weight-bold text-right"
            style="line-height: 1rem"
          >
            {{ date[1].toLocaleString($i18n.locale, { month: "long" }) }}<br />
            {{ date[1].getFullYear() }}
          </div>
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { smAndUp, mdAndUp, name } = useDisplay()
const props = defineProps({
  date: {
    type: Array,
    required: true,
  },
})
const isDouble = computed(() => {
  return (
    props.date.length > 1 && props.date[1].getDay() !== props.date[0].getDay()
  )
})
</script>
