<template>
  {{ name }}

  <v-container>
    <v-row>
      <v-col cols="12" sm="3" md="3" lg="3" xl="3" v-if="smAndUp">
        <v-img
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          :aspect-ratio="1 / 1"
          cover
        >
        </v-img
      ></v-col>

      <v-col cols="12" sm="9" md="9" lg="9" xl="9">
        <v-row v-if="mdAndUp">
          <v-col cols="5">
            <v-sheet>
              <div>
                <NuxtLink to="/" class="text-wrap text-h5 text-black">
                  The power of moral conviction: How it catalyzes dogmatism,
                  intolerance, and violence</NuxtLink
                >
              </div>

              <div class="mt-2">
                <v-btn variant="outlined">Pias</v-btn>
              </div>

              <div class="mt-2">author</div>
            </v-sheet>
          </v-col>
          <v-col cols="7">
            <v-card flat>
              <v-card-text>
                Our moral sense is a biological adaptation specific to our
                species. It has evolved to facilitate group living, regulate
                social interactions, and promote cooperation beyond kinship.
                Beliefs intensely associated with moral values can motivate
                positive societal progress. However, moral convictions can also
                lead to dogmatism, antagonistic attitudes, a polarized political
                climate, and violent collective actions. This article draws on
                theories and empirical evidence from anthropology, neuroscience,
                cognitive science, social psychology, economics, and political
                science to explain why and how moralization increases the
                strength of beliefs and
              </v-card-text>

              <v-card-actions>
                <v-btn
                  color="black"
                  text="Learn More"
                  variant="outlined"
                ></v-btn>
              </v-card-actions> </v-card
          ></v-col>
        </v-row>

        <v-sheet v-if="sm">
          <div>
            <NuxtLink to="/" class="text-wrap text-h5 text-black">
              <span>
                <v-btn variant="outlined">Pias</v-btn>
              </span>
              The power of moral conviction: How it catalyzes dogmatism,
              intolerance, and violence</NuxtLink
            >
          </div>

          <div class="mt-2">author</div>
        </v-sheet>
      </v-col>

      <v-cols cols="12"> </v-cols> </v-row
  ></v-container>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, sm, smAndUp, mdAndUp } = useDisplay()

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

console.log("ITEM_VALUES", props.item)
</script>
