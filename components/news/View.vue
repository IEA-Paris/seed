<template>
  {{ name }}
  <v-row>
    <v-col
      cols="12"
      v-if="mdAndDown"
      class="text-wrap text-h4 text-md-h5 text-black mx-sm-6"
    >
      {{ item.title }}
    </v-col>
    <v-col cols="12" md="4">
      <div class="overflow-hidden mx-sm-6">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <div class="ml-md-4 mx-sm-6">
        <div v-if="lgAndUp" class="text-wrap text-lg-h4 text-black">
          {{ item.title }}
        </div>
        <div class="d-flex flex-column flex-md-row align-md-center">
          <MiscAtomsDateStamp :date="item.date" class="ml-n3 ml-md-5 ml-lg-0" />
          <div class="text-body-1 text-black ml-md-5">
            <!--    TODO use a proper & conditional formatting of names (depending on number of authors) -->
            {{
              $t("by-author", [
                item.authors[0].firstname + " " + item.authors[0].firstname,
              ])
            }}
          </div>
        </div>
        <MiscMoleculesChipContainer
          :items="item.tags"
        ></MiscMoleculesChipContainer>
      </div>
    </v-col>
  </v-row>

  <v-row class="mt-6">
    <v-col cols="12" md="4" :order="mdAndUp ? 'first' : 'last'">
      <div class="mt-2 mx-n6 mx-sm-0" v-if="mdAndUp">
        <ActionsSmallContainer
          :action="action"
          :ratio="null"
        ></ActionsSmallContainer>
      </div>
      <MiscMoleculesRelatedItems
        type="events"
        :items="item.relatedEvents"
      ></MiscMoleculesRelatedItems>
      <MiscMoleculesRelatedItems
        type="project"
        :items="item.relatedProjects"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="8">
      <ContentRenderer :value="item" class="mx-sm-6 mt-6" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, mdAndDown, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()
const router = useRouter()
const { $i18n } = useNuxtApp()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + $i18n.locale.value)
    .limit(1)
    .find()
)
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
