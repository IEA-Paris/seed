<template>
  <div class="contact-sliding-item">
    <div class="contact-sliding-item__image-wrap">
      <img
        v-if="item.photo"
        :src="item.photo"
        :alt="item.name"
        class="contact-sliding-item__image"
      />
      <div v-else class="contact-sliding-item__placeholder">
        <v-icon size="48" color="rgba(0,0,0,0.12)">mdi-account</v-icon>
      </div>
    </div>
    <div class="contact-sliding-item__body">
      <p class="contact-sliding-item__role text-overline">{{ item.role }}</p>
      <p class="contact-sliding-item__name">{{ item.name }}</p>
      <a
        :href="'mailto:' + item.email"
        class="contact-sliding-item__email"
        @click.stop
      >
        {{ item.email }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
  width: { type: Number, default: 350 },
})
</script>

<style scoped>
.contact-sliding-item__image-wrap {
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #ebebeb;
}

.contact-sliding-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(100%);
  transition: filter 0.8s ease;
}

.contact-sliding-item:hover .contact-sliding-item__image {
  filter: grayscale(0%);
}

.contact-sliding-item__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e4e4e4;
}

.contact-sliding-item__body {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
}

.contact-sliding-item__role {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  color: rgba(0, 0, 0, 0.4);
  margin: 0 0 0.2rem;
}

.contact-sliding-item__name {
  font-family: "Bodoni Moda", serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 0.5rem;
}

.contact-sliding-item__email {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
  word-break: break-all;
  transition: color 0.2s ease;
}

.contact-sliding-item__email:hover {
  color: #000;
  text-decoration: underline;
}
</style>
