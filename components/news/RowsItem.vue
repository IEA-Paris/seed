<template>
  {{ name }}
  <v-divider v-if="index > 0"></v-divider>
  <v-row class="mt-4">
    <v-col cols="12" md="4" lg="3" xl="3" v-if="mdAndUp">
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

    <v-col cols="12" md="8" lg="9" xl="9" v-if="mdAndUp">
      <v-row v-if="xl">
        <v-col cols="5">
          <div>
            <NuxtLink to="/" class="text-wrap text-h5 text-black">
              {{ item.title }}</NuxtLink
            >
          </div>

          <div class="d-flex flex-row flex-wrap">
            <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
              <v-chip size="large" variant="outlined" label>{{
                tag.name
              }}</v-chip>
            </div>
          </div>
        </v-col>
        <v-col cols="7">
          <ContentRenderer :value="item" class="clamp-xl text-body-1" />
          <v-btn class="mt-4" variant="outlined">
            {{ $t("learn-more") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="lg">
        <v-col cols="5">
          <div>
            <NuxtLink to="/" class="text-wrap text-h5 text-black">
              {{ item.title }}</NuxtLink
            >
          </div>

          <div class="d-flex flex-row flex-wrap">
            <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
              <v-chip variant="outlined" label>{{ tag.name }}</v-chip>
            </div>
          </div>
        </v-col>
        <v-col cols="7">
          <ContentRenderer :value="item" class="clamp-lg text-body-1" />
          <v-btn class="mt-8" variant="outlined">
            {{ $t("learn-more") }}
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-if="md">
        <v-col cols="12">
          <div>
            <NuxtLink to="/" class="text-h5 text-black text-wrap">
              {{ item.title }}</NuxtLink
            >
          </div>

          <div class="d-flex flex-row flex-wrap">
            <div v-for="tag in item.tags" :key="tag" class="mr-2 mt-2">
              <v-chip variant="outlined" label>{{ tag.name }}</v-chip>
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

    <v-col cols="12" v-if="smAndDown">
      <div class="ma-2 ma-sm-4">
        <div>
          <NuxtLink to="/" class="text-wrap text-h5 text-black">
            {{ item.title }}</NuxtLink
          >
        </div>

        <div class="d-flex flex-row flex-wrap">
          <div
            v-for="tag in item.tags"
            :key="tag"
            class="mr-2 mt-2 mr-sm-3 mt-sm-4"
          >
            <v-chip size="small" variant="outlined" label>{{
              tag.name
            }}</v-chip>
          </div>
        </div>

        <ContentRenderer
          :value="item"
          class="clamp-sm-and-down text-body-1 mt-2 mt-sm-3"
        />

        <div class="d-flex flex-column mt-2 mt-sm-4">
          <v-btn variant="outlined">
            {{ $t("learn-more") }}
          </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, md, xl, lg, smAndDown, mdAndUp } = useDisplay()
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
  @include clamp(4);
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
