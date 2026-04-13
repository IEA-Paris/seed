<template>
  <section id="media-kit" class="pressroom-mediakit">
    <v-container>
      <v-row>
        <v-col cols="12" md="5" class="pressroom-mediakit__intro">
          <h2
            v-motion-slide-visible-once-bottom
            class="pressroom-mediakit__title"
          >
            {{ $t("pressroom.mediaKit.title") }}
          </h2>
          <p class="pressroom-mediakit__desc">
            {{ $t("pressroom.mediaKit.description") }}
          </p>

          <div class="pressroom-mediakit__actions mt-6">
            <v-btn
              variant="outlined"
              :href="mediaKitUrl"
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              class="mb-3 d-flex"
            >
              <v-icon start>mdi-download-outline</v-icon>
              {{ $t("pressroom.mediaKit.download") }}
            </v-btn>
          </div>

          <div class="pressroom-mediakit__includes mt-6">
            <p class="pressroom-mediakit__includes-label text-overline mb-3">
              {{ $t("pressroom.mediaKit.includes") }}
            </p>
            <ul class="pressroom-mediakit__list">
              <li v-for="item in includeItems" :key="item">
                <v-icon size="14" class="mr-2">mdi-check</v-icon>{{ $t(item) }}
              </li>
            </ul>
          </div>
        </v-col>

        <v-col cols="12" md="7">
          <div class="pressroom-mediakit__content-wrapper">
            <ContentDoc :path="contentPath" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const contentPath = computed(() => "/pages/" + locale.value + "/pressroom")

const mediaKitUrl = "/press/media-kit.zip"

const includeItems = [
  "pressroom.mediaKit.item.logos",
  "pressroom.mediaKit.item.photos",
  "pressroom.mediaKit.item.boilerplate",
  "pressroom.mediaKit.item.guidelines",
]
</script>

<style scoped>
.pressroom-mediakit {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-mediakit__intro {
  padding-right: 3rem;
}

.pressroom-mediakit__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 300;
  margin-bottom: 1rem;
  max-width: 28ch;
}

.pressroom-mediakit__desc {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.75;
  max-width: 45ch;
  margin: 0;
}

.pressroom-mediakit__includes-label {
  opacity: 0.5;
  letter-spacing: 0.15em;
}

.pressroom-mediakit__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pressroom-mediakit__list li {
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 0;
  line-height: 1.4;
}

.pressroom-mediakit__content-wrapper {
  padding: 2rem;
  background: #f8f8f8;
}

@media (max-width: 959px) {
  .pressroom-mediakit__intro {
    padding-right: 0;
    margin-bottom: 2rem;
  }

  .pressroom-mediakit__content-wrapper {
    padding: 1.5rem;
  }
}
</style>
