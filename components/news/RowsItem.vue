<template>
  {{ name }}
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

    <v-col cols="12" md="9" lg="9" xl="9" v-if="mdAndUp">
      <v-row v-if="xl">
        <v-col cols="5">
          <v-sheet>
            <div>
              <NuxtLink to="/" class="text-wrap text-h5 text-black">
                {{ item.title }}</NuxtLink
              >
            </div>

            <div class="d-flex flex-row flex-wrap">
              <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
                <v-tooltip location="bottom" :text="tag.name">
                  <template v-slot:activator="{ props }">
                    <v-chip variant="outlined" label v-bind="props">{{
                      tag.name
                    }}</v-chip>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="7">
          <ContentRenderer :value="item" class="clamp-xl text-body-1" />
          <v-btn variant="outlined">
            {{ $t("learn-more") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="lg">
        <v-col cols="5">
          <v-sheet>
            <div>
              <NuxtLink to="/" class="text-wrap text-h5 text-black">
                {{ item.title }}</NuxtLink
              >
            </div>

            <div class="d-flex flex-row flex-wrap">
              <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
                <v-tooltip location="bottom" :text="tag.name">
                  <template v-slot:activator="{ props }">
                    <v-chip variant="outlined" label v-bind="props">{{
                      tag.name
                    }}</v-chip>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </v-sheet>
        </v-col>
        <v-col cols="7">
          <ContentRenderer :value="item" class="clamp-lg text-body-1" />
          <v-btn variant="outlined">
            {{ $t("learn-more") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="md">
        <v-col cols="12">
          <div>
            <NuxtLink to="/" class="text-wrap text-h5 text-black">
              {{ item.title }}</NuxtLink
            >
          </div>

          <div class="d-flex flex-row flex-wrap">
            <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
              <v-tooltip location="bottom" :text="tag.name">
                <template v-slot:activator="{ props }">
                  <v-chip variant="outlined" label v-bind="props">{{
                    tag.name
                  }}</v-chip>
                </template>
              </v-tooltip>
            </div>
          </div>

          <div>
            <ContentRenderer :value="item" class="clamp-md text-body-1" />
            <v-btn variant="outlined">
              {{ $t("learn-more") }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="ml-4" cols="12" v-if="smAndDown">
      <v-row>
        <v-col cols="6">
          <div class="overflow-hidden">
            <v-img
              :src="item.image"
              :aspect-ratio="1 / 1"
              cover
              class="img-animation"
            >
            </v-img></div
        ></v-col>
        <v-col cols="6">
          <MiscAtomsDateStamp :date="item.date" class="pr-6" />
        </v-col>
      </v-row>
      <v-sheet class="mt-2">
        <div>
          <NuxtLink to="/" class="text-wrap text-h5 text-black">
            {{ item.title }}</NuxtLink
          >
        </div>

        <div class="d-flex flex-row flex-wrap">
          <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
            <v-tooltip location="bottom" :text="tag.name">
              <template v-slot:activator="{ props }">
                <v-chip variant="outlined" label v-bind="props">{{
                  tag.name
                }}</v-chip>
              </template>
            </v-tooltip>
          </div>
        </div>
      </v-sheet>

      <ContentRenderer :value="item" class="clamp-sm-and-down text-body-1" />
      <v-btn variant="outlined" class="mt-2">
        {{ $t("learn-more") }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, sm, md, xl, lg, smAndUp, smAndDown, mdAndUp, lgAndUp } =
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

console.log("titi", props.item)
</script>

<style lang="scss" scoped>
@mixin clamp($lines) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.clamp-xl {
  @include clamp(10);
}

.clamp-lg {
  @include clamp(6);
}

.clamp-md {
  @include clamp(2);
}

.clamp-sm-and-down {
  @include clamp(5);
}
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
