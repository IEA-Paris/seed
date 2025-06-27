<template>
  <div>
    <v-card flat class="d-flex align-center justify-center">
      <div class="">
        <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-9 text-center">
          {{ $t("list.filters.people.groups." + route.query.groups, 2) }}
        </div>
        <div v-show="$stores.people.filters.category === 'fellows'">
          <MDC :path="fellows" />
        </div>
        <div v-show="$stores.people.filters.category === 'sab'">
          <MDC :path="sab" />
        </div>
        <div v-show="$stores.people.filters.category === 'team'">
          <MDC :path="team" />
        </div>
        <div v-show="$stores.people.filters.category === 'board'">
          <MDC :path="board" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
const route = useRoute()
const { $stores } = useNuxtApp()
const i18n = useI18n()
const localePath = useLocalePath()
import { useDisplay } from "vuetify"
const { name, mdAndUp } = useDisplay()
</script>

<style lang="scss" scoped></style>
