<template>
  <div>
    <v-card flat class="d-flex align-center justify-center">
      <div class="">
        <h2 class="mb-9 text-center">
          {{ $t("list.filters.people.groups." + route.query.groups, 2) }}
        </h2>
        <!-- <div
          v-if="$stores.people.filters.groups.value === 'fellows'"
          class="content-doc-wrapper mb-2"
          :class="{ expanded: isExpanded }"
          @click="isExpanded = !isExpanded"
        >
          <ContentDoc :path="fellows" />
        </div>
        <div
          v-if="$stores.people.filters.groups.value === 'sab'"
          class="content-doc-wrapper mb-2"
          :class="{ expanded: isExpanded }"
          @click="isExpanded = !isExpanded"
        >
          <ContentDoc :path="sab" />
        </div>
        <div
          v-if="$stores.people.filters.groups.value === 'team'"
          class="content-doc-wrapper mb-2"
          :class="{ expanded: isExpanded }"
          @click="isExpanded = !isExpanded"
        >
          <ContentDoc :path="team" />
        </div>
        <div
          v-if="$stores.people.filters.groups.value === 'board'"
          class="content-doc-wrapper mb-2"
          :class="{ expanded: isExpanded }"
          @click="isExpanded = !isExpanded"
        >
          <ContentDoc :path="board" />
        </div> -->
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

/* console.log("fellows", fellows)
console.log("board", board)
console.log("sab", sab)
console.log("team", team)
console.log("team", team) */
const isExpanded = ref(false)
</script>
<style scoped lang="scss">
.content-doc-wrapper {
  max-height: 6em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  transition: max-height 1.9s ease;
  cursor: pointer;
}

.content-doc-wrapper.expanded {
  max-height: 1000px;
  -webkit-line-clamp: unset;
}
</style>
