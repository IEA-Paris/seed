<template>
  <div class="overflow-hidden">
    <v-img :src="image" :aspect-ratio="ratio" cover class="img-animation">
    </v-img>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  ratio: { type: String, required: true },
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
