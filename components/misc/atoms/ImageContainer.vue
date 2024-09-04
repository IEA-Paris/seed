<template>
  <!--  TODO 
  - add skeleton UI 
  - test lazy-src
  - validate requested quality 
  - Add conditional overlays slots (top left/right, bottom left/right/center for date, caption, copyright)-->

  <v-skeleton-loader
    v-if="rootStore.loading"
    height="100%"
    type="image"
  ></v-skeleton-loader>

  <template v-else>
    <nuxt-link
      :to="
        link
          ? localePath({
              name: link,
              params: { slug: slugify(slug) },
            })
          : null
      "
    >
      <div class="overflow-hidden">
        <!--  TODO debug why the picture is not displaying/sizing properly -->
        <v-img
          :aspect-ratio="ratio"
          cover
          class="img-animation"
          :lazy-src="img(src, { width: 10, quality: 70 })"
          :src="img(src, { width, quality: 70 })"
          :srcset="_srcset.srcset"
          :sizes="_srcset.sizes"
          :title="caption"
          v-bind="$attrs"
        >
        </v-img></div
    ></nuxt-link>
  </template>
</template>

<script setup>
import { useRootStore } from "~/store/root";

const img = useImage();

const rootStore = useRootStore();

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  width: { type: Number , default: 0 },
  ratio: { type:  Number, required: true, default: 1 },
  caption: { type: String, default: "" },
  slug: { type: String, default: "" },
  link: { type: String, default: "" },
});

const _srcset = computed(() => {
  return img.getSizes(props.src, {
    sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
    modifiers: {
      format: "webp",
      quality: 70,
      ...(props.width && { width: props.width }),
    },
  });
});
</script>

<style scoped>
.img-animation {
  transition: all 2s ease-in-out;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
