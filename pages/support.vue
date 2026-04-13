<template>
  <div>
    <!-- HERO -->
    <section class="support-hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="8" lg="6">
            <p class="support-hero__overline text-overline">
              {{ $t("support.hero.overline") }}
            </p>
            <h1 v-motion-slide-visible-once-bottom class="support-hero__title">
              {{ $t("support.hero.title") }}
            </h1>
            <p class="support-hero__subtitle">
              {{ $t("support.hero.subtitle") }}
            </p>
            <div class="support-hero__actions">
              <v-btn
                variant="outlined"
                :href="donateUrl"
                target="_blank"
                rel="noopener"
                size="large"
                class="mr-3"
              >
                <v-icon start>mdi-heart-outline</v-icon>
                {{ $t("support.hero.cta.donate") }}
              </v-btn>
              <v-btn
                variant="text"
                :href="'mailto:' + contactEmail"
                size="large"
              >
                {{ $t("support.hero.cta.contact") }}
                <v-icon end>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- WHY SUPPORT — stats grid -->
    <section class="support-why">
      <v-container>
        <v-row>
          <v-col cols="12" md="5">
            <h2 v-motion-slide-visible-once-bottom class="support-why__title">
              {{ $t("support.why.title") }}
            </h2>
            <p class="support-why__body">
              {{ $t("support.why.body") }}
            </p>
          </v-col>
          <v-col cols="12" md="7">
            <div class="support-why__stats">
              <div
                v-for="stat in stats"
                :key="stat.labelKey"
                v-motion-slide-visible-once-bottom
                class="support-why__stat"
              >
                <div class="support-why__stat-value">
                  {{ stat.value }}
                </div>
                <div class="support-why__stat-label">
                  {{ $t(stat.labelKey) }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- INDIVIDUALS -->
    <section class="support-section">
      <v-container>
        <v-row>
          <v-col cols="12">
            <p class="support-section__overline text-overline">01</p>
            <h2
              v-motion-slide-visible-once-bottom
              class="support-section__title"
            >
              {{ $t("support.individuals.title") }}
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <p class="support-section__body">
              {{ $t("support.individuals.body") }}
            </p>

            <!-- Tax table -->
            <div class="support-tax">
              <div class="support-tax__header text-overline">
                {{ $t("support.individuals.tax.title") }}
              </div>
              <table class="support-tax__table">
                <thead>
                  <tr>
                    <th>{{ $t("support.individuals.tax.col.type") }}</th>
                    <th>{{ $t("support.individuals.tax.col.rate") }}</th>
                    <th>{{ $t("support.individuals.tax.col.cap") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ $t("support.individuals.tax.row1.type") }}</td>
                    <td class="support-tax__rate">
                      {{ $t("support.individuals.tax.row1.rate") }}
                    </td>
                    <td>{{ $t("support.individuals.tax.row1.cap") }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("support.individuals.tax.row2.type") }}</td>
                    <td class="support-tax__rate">
                      {{ $t("support.individuals.tax.row2.rate") }}
                    </td>
                    <td>{{ $t("support.individuals.tax.row2.cap") }}</td>
                  </tr>
                </tbody>
              </table>
              <p class="support-tax__note">
                {{ $t("support.individuals.tax.note") }}
              </p>
            </div>
          </v-col>

          <v-col cols="12" md="5" offset-md="1">
            <div class="support-how">
              <div class="support-how__header text-overline">
                {{ $t("support.individuals.how.title") }}
              </div>

              <!-- Online -->
              <div class="support-how__method">
                <span class="support-how__method-label">
                  {{ $t("support.individuals.how.online.label") }}
                </span>
                <a
                  :href="donateUrl"
                  target="_blank"
                  rel="noopener"
                  class="support-how__method-cta"
                >
                  {{ $t("support.individuals.how.online.cta") }}
                  <v-icon size="14" class="ml-1">mdi-open-in-new</v-icon>
                </a>
              </div>

              <!-- Cheque -->
              <div class="support-how__method">
                <span class="support-how__method-label">
                  {{ $t("support.individuals.how.cheque.label") }}
                </span>
                <span class="support-how__method-note">
                  {{ $t("support.individuals.how.cheque.payable") }}<br />
                  IEA de Paris — Nadège Bourgeois<br />
                  {{ address }}, {{ postcode_country }}
                </span>
              </div>

              <!-- Wire -->
              <div class="support-how__method">
                <span class="support-how__method-label">
                  {{ $t("support.individuals.how.wire.label") }}
                </span>
                <span class="support-how__method-note support-how__method-mono">
                  IBAN&nbsp;: {{ iban }}<br />
                  BIC&nbsp;: {{ bic }}
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CORPORATE -->
    <section class="support-section support-section--alt px-6">
      <v-container>
        <v-row>
          <v-col cols="12">
            <p class="support-section__overline text-overline">02</p>
            <h2
              v-motion-slide-visible-once-bottom
              class="support-section__title"
            >
              {{ $t("support.corporate.title") }}
            </h2>
          </v-col>
        </v-row>
        <v-row class="align-start">
          <v-col cols="12" md="5">
            <p class="support-section__body">
              {{ $t("support.corporate.body") }}
            </p>
            <!-- Corporate tax callout box -->
            <div class="support-callout">
              <div class="support-callout__value">
                {{ $t("support.corporate.tax.value") }}
              </div>
              <div class="support-callout__label text-overline">
                {{ $t("support.corporate.tax.label") }}
              </div>
              <p class="support-callout__note">
                {{ $t("support.corporate.tax.note") }}
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="6" offset-md="1">
            <div class="support-benefits">
              <div
                v-for="benefit in benefits"
                :key="benefit.titleKey"
                v-motion-slide-visible-once-bottom
                class="support-benefits__item"
              >
                <h3 class="support-benefits__item-title">
                  {{ $t(benefit.titleKey) }}
                </h3>
                <p class="support-benefits__item-body">
                  {{ $t(benefit.bodyKey) }}
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- FOUNDATIONS -->
    <section class="support-section">
      <v-container>
        <v-row>
          <v-col cols="12" md="7">
            <p class="support-section__overline text-overline">03</p>
            <h2
              v-motion-slide-visible-once-bottom
              class="support-section__title"
            >
              {{ $t("support.foundations.title") }}
            </h2>
            <p class="support-section__body">
              {{ $t("support.foundations.body") }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CONTACT — dark -->
    <section class="support-contact px-6">
      <v-container>
        <v-row class="align-center">
          <v-col v-motion-slide-visible-once-bottom cols="12" md="6">
            <h2 class="support-contact__title text-white">
              {{ $t("support.contact.title") }}
            </h2>
            <p class="support-contact__desc">
              {{ $t("support.contact.description") }}
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <div class="support-contact__card">
              <div class="support-contact__field">
                <span class="support-contact__field-label text-overline">
                  {{ $t("email") }}
                </span>
                <a
                  :href="'mailto:' + contactEmail"
                  class="support-contact__field-value"
                >
                  {{ contactEmail }}
                </a>
              </div>
              <div class="support-contact__field">
                <span class="support-contact__field-label text-overline">
                  {{ $t("support.contact.phone") }}
                </span>
                <a
                  :href="'tel:' + contactPhone.replace(/\s/g, '')"
                  class="support-contact__field-value"
                >
                  {{ contactPhone }}
                </a>
              </div>
              <div class="support-contact__field">
                <span class="support-contact__field-label text-overline">
                  {{ $t("support.contact.address") }}
                </span>
                <span class="support-contact__field-value"
                  >{{ address }}, {{ postcode_country }}</span
                >
              </div>
              <div class="mt-6">
                <v-btn
                  variant="outlined"
                  color="white"
                  :href="'mailto:' + contactEmail"
                  size="large"
                >
                  {{ $t("support.contact.cta") }}
                  <v-icon end>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- LEGAL FOOTER -->
    <section class="support-legal">
      <v-container>
        <v-row>
          <v-col cols="12">
            <p class="support-legal__text">{{ $t("support.legal") }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts" setup>
import config from "@/static.config"

const { t } = useI18n()

const {
  donateUrl,
  philanthropyEmail,
  philanthropyPhone,
  iban,
  bic,
  researchers,
  nationalities,
  partnerInstitutions,
  eventsPerYear,
} = config.institute
const { address, postcode_country } = config
const contactEmail = philanthropyEmail
const contactPhone = philanthropyPhone

const stats = [
  { value: researchers, labelKey: "support.why.stat1.label" },
  { value: String(nationalities), labelKey: "support.why.stat2.label" },
  { value: partnerInstitutions, labelKey: "support.why.stat3.label" },
  { value: eventsPerYear, labelKey: "support.why.stat4.label" },
]

const benefits = [
  {
    titleKey: "support.corporate.benefit1.title",
    bodyKey: "support.corporate.benefit1.body",
  },
  {
    titleKey: "support.corporate.benefit2.title",
    bodyKey: "support.corporate.benefit2.body",
  },
  {
    titleKey: "support.corporate.benefit3.title",
    bodyKey: "support.corporate.benefit3.body",
  },
]

useHead({
  title: t("support.meta.title"),
  meta: [{ name: "description", content: t("support.meta.description") }],
})
</script>

<style scoped>
/* ── HERO ────────────────────────────────────────────── */
.support-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.support-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.support-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.support-hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 58ch;
  opacity: 0.75;
  margin-bottom: 2rem;
}

.support-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── WHY SUPPORT ─────────────────────────────────────── */
.support-why {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.support-why__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 300;
  margin-bottom: 1.25rem;
  max-width: 32ch;
}

.support-why__body {
  font-size: 0.9375rem;
  line-height: 1.7;
  opacity: 0.75;
  max-width: 52ch;
  margin: 0;
}

.support-why__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.support-why__stat {
  padding: 1.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.support-why__stat:nth-child(3),
.support-why__stat:nth-child(4) {
  border-bottom: none;
}

.support-why__stat-value {
  font-family: "Bodoni Moda", serif;
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
}

.support-why__stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.55;
  line-height: 1.4;
}

/* ── SHARED SECTION ──────────────────────────────────── */
.support-section {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.support-section--alt {
  background: #f9f9f9;
}

.support-section__overline {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  opacity: 0.35;
  margin-bottom: 0.5rem;
}

.support-section__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  max-width: 32ch;
}

.support-section__body {
  font-size: 0.9375rem;
  line-height: 1.75;
  opacity: 0.75;
  max-width: 54ch;
  margin-bottom: 2rem;
}

/* ── TAX TABLE ───────────────────────────────────────── */
.support-tax__header {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
  margin-bottom: 0.75rem;
}

.support-tax__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.support-tax__table th {
  text-align: left;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.5;
  font-weight: 600;
  padding: 0.5rem 1rem 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.support-tax__table td {
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  vertical-align: middle;
  line-height: 1.4;
}

.support-tax__table tr:last-child td {
  border-bottom: none;
}

.support-tax__rate {
  font-family: "Bodoni Moda", serif;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.support-tax__note {
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  opacity: 0.5;
  font-style: italic;
  line-height: 1.5;
  max-width: none;
}

/* ── HOW TO GIVE ─────────────────────────────────────── */
.support-how {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 2rem;
}

.support-how__header {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
  margin-bottom: 0.5rem;
}

.support-how__method {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
}

.support-how__method:last-child {
  border-bottom: none;
}

.support-how__method-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.45;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.support-how__method-cta {
  font-size: 0.9375rem;
  color: black;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
  width: fit-content;
  transition: opacity 0.2s;
}

.support-how__method-cta:hover {
  opacity: 0.55;
}

.support-how__method-note {
  font-size: 0.875rem;
  line-height: 1.65;
  opacity: 0.65;
  max-width: none;
}

.support-how__method-mono {
  font-family: "Consolas", "Courier New", monospace;
  font-size: 0.8125rem;
  letter-spacing: 0.03em;
}

/* ── CALLOUT BOX ─────────────────────────────────────── */
.support-callout {
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 1.75rem 2rem;
}

.support-callout__value {
  font-family: "Bodoni Moda", serif;
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 0.4rem;
}

.support-callout__label {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
  margin-bottom: 0.75rem;
}

.support-callout__note {
  font-size: 0.8125rem;
  line-height: 1.6;
  opacity: 0.6;
  margin: 0;
  max-width: none;
}

/* ── BENEFITS LIST ───────────────────────────────────── */
.support-benefits {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.support-benefits__item {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.support-benefits__item-title {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0.5rem;
}

.support-benefits__item-body {
  font-size: 0.9375rem;
  line-height: 1.65;
  opacity: 0.7;
  margin: 0;
  max-width: none;
}

/* ── CONTACT (dark) ──────────────────────────────────── */
.support-contact {
  padding: 4rem 0;
  background: #0b0b0b;
}

.support-contact__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 1rem;
  max-width: 28ch;
}

.support-contact__desc {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  max-width: 50ch;
  margin: 0;
}

.support-contact__card {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 2rem;
}

.support-contact__field {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.support-contact__field-label {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.25rem;
}

.support-contact__field-value {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s ease;
}

.support-contact__field-value:hover {
  color: white;
  text-decoration: underline;
}

/* ── LEGAL ───────────────────────────────────────────── */
.support-legal {
  padding: 2rem 0;
}

.support-legal__text {
  font-size: 0.75rem;
  opacity: 0.4;
  font-style: italic;
  margin: 0;
  line-height: 1.6;
  max-width: none;
}

/* ── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 959px) {
  .support-contact__card {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .support-how {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .support-why__stats {
    margin-top: 2.5rem;
  }
}

@media (max-width: 599px) {
  .support-why__stats {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .support-why__stat {
    border-left: none;
    padding-left: 0;
    padding-right: 0;
  }

  .support-why__stat:first-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
