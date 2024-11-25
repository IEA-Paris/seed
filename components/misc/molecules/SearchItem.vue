<template>
  <v-card class="mx-auto" max-width="450" variant="flat">
    <v-row>
      <v-col cols="12" md="2">
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </v-col>
      <v-col cols="12" md="10">
        <div class="text-body-1">{{ item.title }}</div>
        <div>
          <span class="text-primary text-body-2"> {{ item.name }}</span> &mdash;
          <span class="text-body-2"> {{ item.subtitle }}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()

const item = ref({
  image: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
  title: "Brunch this weekend?",
  name: "Ali Connors",
  subtitle:
    "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
})
</script>
