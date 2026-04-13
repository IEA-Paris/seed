<template>
  <section class="pressroom-keyfacts">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h2 class="pressroom-keyfacts__title" v-motion-slide-visible-once-bottom>
            {{ $t("pressroom.keyFacts.title") }}
          </h2>
        </v-col>
      </v-row>

      <v-row class="pressroom-keyfacts__grid">
        <v-col
          v-for="fact in facts"
          :key="fact.labelKey"
          cols="12"
          sm="6"
          md="3"
          class="pressroom-keyfacts__col"
          v-motion-slide-visible-once-bottom
        >
          <div class="pressroom-keyfacts__item">
            <div class="pressroom-keyfacts__value">
              {{ fact.value }}
            </div>
            <div class="pressroom-keyfacts__label">
              {{ $t(fact.labelKey) }}
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row class="mt-8">
        <v-col cols="12" md="10" lg="8">
          <div class="pressroom-keyfacts__cards">
            <div
              v-for="card in cards"
              :key="card.titleKey"
              class="pressroom-keyfacts__card"
              v-motion-slide-visible-once-bottom
            >
              <h3 class="pressroom-keyfacts__card-title">
                {{ $t(card.titleKey) }}
              </h3>
              <p class="pressroom-keyfacts__card-body">
                {{ $t(card.bodyKey) }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import config from "@/static.config"

const { foundedYear, researchers, nationalities, partnerInstitutions } = config.institute

const facts = [
  { value: String(foundedYear), labelKey: "pressroom.keyFacts.founded" },
  { value: researchers, labelKey: "pressroom.keyFacts.researchers" },
  { value: String(nationalities), labelKey: "pressroom.keyFacts.nationalities" },
  { value: partnerInstitutions, labelKey: "pressroom.keyFacts.partners" },
]

const cards = [
  {
    titleKey: "pressroom.keyFacts.whatWeAre.title",
    bodyKey: "pressroom.keyFacts.whatWeAre.body",
  },
  {
    titleKey: "pressroom.keyFacts.mission.title",
    bodyKey: "pressroom.keyFacts.mission.body",
  },
  {
    titleKey: "pressroom.keyFacts.location.title",
    bodyKey: "pressroom.keyFacts.location.body",
  },
]
</script>

<style scoped>
.pressroom-keyfacts {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-keyfacts__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 300;
  margin-bottom: 2.5rem;
  max-width: 40ch;
}

.pressroom-keyfacts__col {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-keyfacts__item {
  padding: 0 1rem 1.5rem;
}

.pressroom-keyfacts__value {
  font-family: "Bodoni Moda", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.pressroom-keyfacts__label {
  font-size: 0.875rem;
  opacity: 0.6;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.pressroom-keyfacts__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-keyfacts__card {
  padding: 2rem 2rem 2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-keyfacts__card:not(:first-child) {
  padding-left: 2rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.pressroom-keyfacts__card-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  font-family: "Open Sans", sans-serif;
}

.pressroom-keyfacts__card-body {
  font-size: 0.9375rem;
  line-height: 1.65;
  opacity: 0.75;
  max-width: none;
  margin: 0;
}

@media (max-width: 599px) {
  .pressroom-keyfacts__col:first-child {
    border-left: none;
  }

  .pressroom-keyfacts__card {
    padding: 1.5rem 0;
  }

  .pressroom-keyfacts__card:not(:first-child) {
    padding-left: 0;
    border-left: none;
  }
}
</style>
