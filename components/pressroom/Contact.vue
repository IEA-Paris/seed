<template>
  <section class="pressroom-contact dark">
    <v-container>
      <v-row class="align-center" no-gutters>
        <v-col v-motion-slide-visible-once-bottom cols="12" md="6">
          <h2 class="pressroom-contact__title text-white">
            {{ $t("pressroom.contact.title") }}
          </h2>
          <p class="pressroom-contact__desc">
            {{ $t("pressroom.contact.description") }}
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <div class="pressroom-contact__card">
            <div class="pressroom-contact__field">
              <span class="pressroom-contact__field-label text-overline">
                {{ $t("email") }}
              </span>
              <a
                :href="'mailto:' + email"
                class="pressroom-contact__field-value"
              >
                {{ email }}
              </a>
            </div>

            <div class="pressroom-contact__field">
              <span class="pressroom-contact__field-label text-overline">
                {{ $t("pressroom.contact.phone") }}
              </span>
              <a
                :href="'tel:' + phone.replace(/\s/g, '')"
                class="pressroom-contact__field-value"
              >
                {{ phone }}
              </a>
            </div>

            <div class="pressroom-contact__field">
              <span class="pressroom-contact__field-label text-overline">
                {{ $t("pressroom.contact.address") }}
              </span>
              <span class="pressroom-contact__field-value">
                17 Quai d'Anjou, 75004 Paris
              </span>
            </div>

            <div class="pressroom-contact__actions mt-6">
              <v-btn
                variant="outlined"
                color="white"
                :to="$localePath('/contact')"
                size="large"
                class="d-flex w-100"
              >
                {{ $t("pressroom.contact.cta") }}
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import config from "@/static.config"

const email = config.institute.pressContactEmail
const phone = config.phone
</script>

<style scoped>
.pressroom-contact {
  padding: 4rem 0;
  background: linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%);
}

.pressroom-contact__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 1rem;
  max-width: 28ch;
}

.pressroom-contact__desc {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  max-width: 50ch;
  margin: 0;
}

.pressroom-contact__card {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 2rem;
}

.pressroom-contact__field {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.pressroom-contact__field-label {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.25rem;
}

.pressroom-contact__field-value {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s ease;
}

.pressroom-contact__field-value:hover {
  color: white;
  text-decoration: underline;
}

@media (max-width: 959px) {
  .pressroom-contact__card {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 2rem;
    margin-top: 2rem;
  }
}
</style>
