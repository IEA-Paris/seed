<template>
  <!--  TODO 
  - add skeleton UI 
  - test lazy-src
  - validate requested quality 
  - Add conditional overlays slots (top left/right, bottom left/right/center for date, caption, copyright)-->
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
      <v-img
        :aspect-ratio="ratio"
        cover
        class="img-animation"
        :lazy-src="img(image, { width: 10, quality: 70 })"
        :src="img(image, { width, quality: 70 })"
        :srcset="_srcset.srcset"
        :sizes="_srcset.sizes"
        :title="caption"
      >
      </v-img></div
  ></nuxt-link>
</template>

<script setup>
import slugify from "~/assets/utils/slugify"
const img = useImage()

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  width: { type: Number || Boolean, default: false },
  ratio: { type: String, required: true },
  caption: { type: String, default: "" },
  slug: { type: String, default: "" },
  link: { type: String, default: "" },
})

const _srcset = computed(() => {
  return img.getSizes(props.image, {
    sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
    modifiers: {
      format: "webp",
      quality: 70,
      ...(props.width && { width: props.width }),
    },
  })
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
