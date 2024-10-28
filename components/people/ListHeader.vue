<template>
  <div>
    <v-card flat class="d-flex align-center justify-center">
      <div class="">
        <div
          :class="mdAndUp ? 'text-h2' : 'text-h4'"
          class="mb-9 text-center"
          v-if="route.query.categories"
        >
          {{ $t("list.filters.people.categories." + route.query.categories) }}
        </div>
        <div v-if="route.query.categories === 'fellows'">
          <ContentDoc :path="fellows" />
        </div>
        <div v-if="route.query.categories === 'scientific-advisory-board'">
          <ContentDoc :path="sab" />
        </div>
        <div v-if="route.query.categories === 'team'">
          <ContentDoc :path="team" />
        </div>
        <div v-if="route.query.categories === 'board-of-directors'">
          <ContentDoc :path="board" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
const route = useRoute()
const i18n = useI18n()
const localePath = useLocalePath()
import { useDisplay } from "vuetify"
const { name, mdAndUp } = useDisplay()

const { locale, locales, messages } = useI18n()
const fellows = ref("/pages/" + locale.value + "/people_fellows")
const board = ref("/pages/" + locale.value + "/people_board-of-directors")
const sab = ref("/pages/" + locale.value + "/people_scientific-advisory-board")
const team = ref("/pages/" + locale.value + "/people_team")
</script>

<style lang="scss" scoped></style>
