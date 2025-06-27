<template>
  <div>
    <v-card flat class="d-flex align-center justify-center">
      <div class="">
        <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-9 text-center">
          {{ $t("list.filters.people.groups." + route.query.groups, 2) }}
        </div>
        <div v-show="$stores.people.filters.category === 'fellows'">
          <ContentDoc :path="fellows" />
        </div>
        <div v-show="$stores.people.filters.category === 'sab'">
          <ContentDoc :path="sab" />
        </div>
        <div v-show="$stores.people.filters.category === 'team'">
          <ContentDoc :path="team" />
        </div>
        <div v-show="$stores.people.filters.category === 'board'">
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
import { ref, useI18n } from "#imports"

const { locale } = useI18n()
const fellows = ref("/pages/" + locale.value + "/people_fellows")
const board = ref("/pages/" + locale.value + "/people_board-of-directors")
const sab = ref("/pages/" + locale.value + "/people_scientific-advisory-board")
const team = ref("/pages/" + locale.value + "/people_team")
</script>

<style lang="scss" scoped></style>
