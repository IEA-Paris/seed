<template>
  {{ name }}
  <v-row>
    <v-col
      cols="12"
      v-if="mdAndDown"
      class="text-wrap text-h4 text-md-h5 text-black"
    >
      {{ item.title }}
    </v-col>
    <v-col cols="12" md="3" lg="3" xl="3">
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
      <div class="ml-md-4">
        <div v-if="lgAndUp" class="text-wrap text-lg-h4 text-black">
          {{ item.title }}
        </div>
        <div class="d-flex flex-column flex-md-row align-md-center">
          <MiscAtomsDateStamp :date="item.date" class="ml-n3 ml-md-5 ml-lg-0" />
          <div class="text-body-1 text-black ml-md-5">
            {{ item.authors[0].firstname }} {{ item.authors[0].firstname }}
          </div>
        </div>
        <MiscMoleculesChipContainer
          :items="item.tags"
        ></MiscMoleculesChipContainer>
      </div>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" lg="7" xl="7">
      <ContentRenderer :value="item" />
    </v-col>

    <v-col cols="12" lg="5" xl="5">
      <div>
        Related Project: Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Voluptate nihil, dignissimos praesentium cum commodi rem beatae,
        sunt impedit amet debitis laboriosam harum. Aliquid soluta illum
        voluptatibus ut fuga asperiores. Expedita.
      </div>
      <div class="mt-2">
        Related Events: Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Omnis, odio! Officiis veritatis ex exercitationem. Iusto amet
        minus ullam dolorem, officia adipisci. At nam odio asperiores dolores
        voluptatum et, consectetur maxime.
      </div>

      <div class="mt-2">
        Ads: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quis
        illum! Fugiat, delectus est explicabo excepturi exercitationem sapiente
        odio necessitatibus laboriosam voluptatibus? Tenetur, mollitia! Esse
        animi qui inventore tempore ab!
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, mdAndDown, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay()
const props = defineProps({
  item: {
    type: Object,
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
