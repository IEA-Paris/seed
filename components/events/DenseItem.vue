<template>
  <v-row
    v-ripple
    class="cursor-pointer"
    @click="
      $router.push(
        localePath('/activities/events/' + getSlugFromPath(item._path)),
      )
    "
  >
    <v-col align-self="center" cols="2">
      {{
        new Date(item.start).toLocaleDateString(locale, {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })
      }}
    </v-col>
    <v-col align-self="center" cols="6" class="text-h6 dense">
      <div class="mt-2 text-h6 text-overline font-weight-black">
        {{ $t("events.categories." + item.category) }}
      </div>
      {{ item.name }}
    </v-col>
    <v-col align-self="center" cols="4">
      <EventsBadges :item></EventsBadges>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
import { getSlugFromPath } from "~/composables/useUtils"

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
