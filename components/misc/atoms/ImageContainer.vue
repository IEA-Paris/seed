<template>
  <div>
    <!--  TODO 
  - add skeleton UI 
  - test lazy-src
  - validate requested quality 
  - Add conditional overlays slots (top left/right, bottom left/right/center for date, caption, copyright)-->

    <v-skeleton-loader
      v-if="loading"
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
        <div class="overflow-hidden mw-100">
          <!--  TODO debug why the picture is not displaying/sizing properly -->
          <v-img
            :aspect-ratio="ratio"
            :class="{ 'img-animation': animate }"
            :lazy-src="
              img(
                typeof src === 'string'
                  ? src
                  : src.url || 'placeholder /!\TODO',
                { width: 10, quality: 70 },
              )
            "
            :src="
              img(
                typeof src === 'string'
                  ? src
                  : src.url || 'placeholder /!\TODO',
                { width, quality: 70 },
              )
            "
            :srcset="_srcset.srcset"
            :sizes="_srcset.sizes"
            :title="caption"
            v-bind="$attrs"
          >
            <slot></slot>
          </v-img></div
      ></nuxt-link>
    </template>
  </div>
</template>

<script setup>
import { useRootStore } from "~/store/root"

const img = useImage()

const rootStore = useRootStore()

const props = defineProps({
  src: {
    type: [Object, String],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
  width: { type: Number, default: 0 },
  ratio: { type: Number, required: true, default: 1 },
  caption: { type: String, default: "" },
  slug: { type: String, default: "" },
  link: { type: String, default: "" },
  animate: { type: Boolean, default: true },
})
const _srcset = computed(() => {
  console.log("typeof props.src === 'String': ", typeof props.src === "string")
  return img.getSizes(
    typeof props.src === "string" ? props.src : props.src.url,
    {
      sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
      modifiers: {
        format: "webp",
        quality: 70,
        ...(props.width && { width: props.width }),
      },
    },
  )
})
</script>

<style scoped>
.img-animation {
  transition: all 0.5s ease-in-out;
  width: 100%;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
