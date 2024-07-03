<template>
  {{ name }}
  <v-row>
    <v-col
      cols="12"
      v-if="smAndDown"
      class="text-wrap text-h4 text-black mx-sm-6"
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
        <div class="d-flex text-wrap text-h4 text-black">
          {{ item.title }}
        </div>
        <div class="d-flex flex-column flex-md-row align-md-center mt-6">
          <MiscAtomsDateStamp :date="item.date" class="ml-0 mt-lg-2" />

          <div class="ml-md-8">
            <div
              class="text-body-2 text-lg-body-1 text-black mt-4 mt-sm-4 mt-md-0 mb-md-n4 ml-md-0"
            >
              <!--    TODO use a proper & conditional formatting of names (depending on number of authors) -->
              {{
                $t("by-author", [
                  item.authors[0].firstname + " " + item.authors[0].lastname,
                ])
              }}
            </div>
            <div class="mt-lg-n1">
              <MiscMoleculesChipContainer
                :items="item.tags"
              ></MiscMoleculesChipContainer>
            </div>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>

  <v-row class="mt-12">
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
      <ContentRenderer :value="item" class="mt-n10 mt-md-n2 mx-sm-6" />
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
