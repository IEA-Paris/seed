<template>
  <v-sheet
    :to="
      localePath({
        name: 'activities-events-slug',
        params: { slug: slugify(item.firstname + item.lastname) }, //TODO à modifier
      })
    "
  >
    <v-row>
      <v-col cols="3" v-if="lgAndUp">
        <MiscAtomsImageContainer
          :loading="rootStore.people.loading"
          :src="item.image"
          :ratio="1 / 1"
          :link="item.firstname + item.lastname"
          :name="activities - events - slug"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.people.loading"
          type="heading"
        ></v-skeleton-loader>
        <template v-else>
          <div class="text-h6">
            {{ item.firstname + " " + item.lastname }}
          </div>
        </template>
      </v-col></v-row
    ></v-sheet
  >
</template>

<script setup>
import { useDisplay } from "vuetify";
const localePath = useLocalePath();
import { useRootStore } from "~/store/root";
const rootStore = useRootStore();
const { name, mdAndDown, lgAndUp, mdAndUp, smAndDown, sm, xs } = useDisplay();

const props = defineProps({ item: { type: Object, required: true } });
</script>
