<template>
  <!-- {{ name }} -->
  <v-divider v-if="index > 0"></v-divider>
  <v-row>
    <v-col cols="12" md="3" lg="3" xl="3" v-if="mdAndUp">
      <div class="overflow-hidden">
        <v-img
          :src="item.image"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>
    </v-col>

    <v-col cols="12" md="9" lg="9" xl="9">
      <v-row v-if="mdAndUp">
        <v-col cols="5">
          <v-sheet>
            <div>
              <NuxtLink to="/" class="text-wrap text-h5 text-black">
                {{ item.title }}</NuxtLink
              >
            </div>

            <div class="mt-2">
              <v-chip class="ma-2" label variant="outlined"> Pias </v-chip>
            </div>

            <div class="mt-2" v-for="element in item.authors" :key="element">
              {{ element.firstname }} {{ element.lastname }}
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="7">
          <v-sheet>
            <ContentRenderer :value="item" />

            <v-chip label variant="outlined">
              {{ $t("learn-more") }}
            </v-chip>
          </v-sheet>
        </v-col>
      </v-row>

      <v-sheet v-if="smAndDown">
        <MiscAtomsDateStamp :date="item.date" class="pr-6" />
        <div class="ml-4">
          <NuxtLink to="/" class="text-wrap text-h5 text-black">
            {{ item.title }}</NuxtLink
          >
        </div>

        <div class="mt-2 ml-4">
          <v-btn variant="outlined">Pias</v-btn>
        </div>

        <div class="mt-2 ml-4" v-for="element in item.authors" :key="element">
          {{ element.firstname }} {{ element.lastname }}
        </div>

        <div class="overflow-hidden ma-4">
          <v-img
            :src="item.image"
            :aspect-ratio="1 / 1"
            cover
            class="img-animation"
          >
          </v-img>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, sm, smAndUp, smAndDown, mdAndUp } = useDisplay()
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

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
