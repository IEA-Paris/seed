<template>
  <section class="pressroom-hero">
    <v-container>
      <v-row>
        <v-col cols="12" md="8" lg="6">
          <p class="pressroom-hero__overline text-overline">
            {{ $t("pressroom") }}
          </p>
          <h1 class="pressroom-hero__title" v-motion-slide-visible-once-bottom>
            {{ $t("pressroom.hero.title") }}
          </h1>
          <p class="pressroom-hero__subtitle">
            {{ $t("pressroom.hero.subtitle") }}
          </p>
          <div class="pressroom-hero__actions">
            <v-btn
              variant="outlined"
              :href="'mailto:' + email"
              class="mr-3"
              size="large"
            >
              <v-icon start>mdi-email-outline</v-icon>
              {{ $t("pressroom.contact.cta") }}
            </v-btn>
            <v-btn
              variant="text"
              href="#media-kit"
              size="large"
            >
              {{ $t("pressroom.mediaKit.title") }}
              <v-icon end>mdi-arrow-down</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import config from "@/static.config"

const email = config.institute.pressEmail
</script>

<style scoped>
.pressroom-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.pressroom-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.pressroom-hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 60ch;
  opacity: 0.75;
  margin-bottom: 2rem;
}

.pressroom-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
