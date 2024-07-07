<template>
  {{ name }}
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="my-md-6 ml-md-1">
    <v-col cols="12" md="3">
      <div class="overflow-hidden">
        <v-img
          src="https://www.paris-iea.fr/images/evenements/32419/_thumb3/emily-morter-8xaa0f9yqne-unsplash.jpg"
          :aspect-ratio="1 / 1"
          cover
          class="img-animation"
        >
        </v-img>
      </div>

      <div
        class="d-flex flex-row flex-wrap justify-md-center mt-md-4"
        v-if="mdAndUp"
      >
        <div class="ma-md-2">
          <PeopleOrcidIdBadge :orcid="123"></PeopleOrcidIdBadge>
        </div>
        <div class="ma-md-2">
          <PeopleGoogleScholarIdBadge
            :scholarId="123"
          ></PeopleGoogleScholarIdBadge>
        </div>
        <div class="ma-md-2">
          <PeopleLinkedinIdBadge :profilId="titi"></PeopleLinkedinIdBadge>
        </div>
        <div class="ma-md-2">
          <PeopleWikipediaIdBadge :pageId="toto"></PeopleWikipediaIdBadge>
        </div>
      </div>
    </v-col>

    <v-col cols="12" md="8">
      <div class="ml-md-8">
        <NuxtLink to="/" class="text-wrap text-h4 text-black">
          {{ item.title }}</NuxtLink
        >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          totam libero soluta natus officiis dolorum, quas obcaecati odio sunt
          blanditiis ab tempora nesciunt pariatur dolore fuga at, vitae itaque
          debitis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          veniam quas placeat odit maxime molestiae facere provident, ipsa
          eaque. Odit excepturi voluptates eligendi sapiente a amet tenetur
          facere aliquid quidem. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Et, maiores quibusdam. Labore laboriosam itaque
          magnam dolorum suscipit ipsam, quibusdam omnis, dolor rem quod debitis
          cum! Quaerat atque quod distinctio aliquid
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="1"></v-col>
  </v-row>
</template>
<script setup>
import { highlight } from "~/assets/utils/transforms"
import { useDisplay } from "vuetify"
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()

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

console.log("HELLO", props.item)
</script>

<style lang="scss">
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
