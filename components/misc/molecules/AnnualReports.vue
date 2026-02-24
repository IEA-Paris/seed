<template>
  <section class="section-light">
    <v-container>
      <p class="overline-label">{{ $t("vision") }}</p>
      <div class="typographic-rule" />
      <h2 class="section-heading section-heading--no-mb">
        <a href="#annual-reports">{{ $t("annual-reports") }}</a>
      </h2>
      <p class="text-body-2 mb-6 annual-reports__desc">
        {{ $t("annual-reports-description") }}
      </p>

      <!-- Current locale reports -->
      <MiscAtomsSlidingCarousel
        type="annualreport"
        :items="carouselReports"
        :more="false"
      >
        <span
          class="text-body-2 font-weight-medium text-uppercase text-grey-darken-1"
        >
          {{ locale === "fr" ? $t("french") : $t("english") }}
        </span>
      </MiscAtomsSlidingCarousel>

      <!-- Other language reports -->
      <div v-if="otherLangReports.length" class="mt-8">
        <div
          class="text-caption text-uppercase text-grey-darken-1 mb-4 font-weight-medium"
        >
          {{ $t("also-available-in") }}
          {{
            locale === "fr"
              ? $t("english").toLowerCase()
              : $t("french").toLowerCase()
          }}
        </div>
        <div class="reports-row-compact">
          <a
            v-for="report in otherLangReports"
            :key="'other-' + report.year"
            :href="report.href"
            target="_blank"
            rel="noopener noreferrer"
            class="report-link-compact"
          >
            <v-card variant="outlined" hover class="report-chip">
              <v-card-text class="d-flex align-center pa-2 px-3 ga-2">
                <v-icon size="18" color="grey-darken-1"
                  >mdi-file-pdf-box</v-icon
                >
                <span class="text-body-2 font-weight-medium">{{
                  report.year
                }}</span>
                <span class="text-caption text-grey text-uppercase">
                  {{ report.lang === "fr" ? "FR" : "EN" }}
                </span>
                <v-icon size="14" color="grey" class="ml-1"
                  >mdi-open-in-new</v-icon
                >
              </v-card-text>
            </v-card>
          </a>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup>
const { locale } = useI18n()

const allReports = [
  {
    year: 2024,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/en/MAQ_IEA_RA_2024__12_25_ANG_BAT_NUM_compressed_compressed.pdf",
    lang: "en",
    thumbnail: "/images/reports/2024-en.jpg",
  },
  {
    year: 2023,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/en/MAQ_IEA_RA_2023_ANG_NUM_BAT_bd.pdf",
    lang: "en",
    thumbnail: "/images/reports/2023-en.jpg",
  },
  {
    year: 2024,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/MAQ_IEA_RA_2024__10_25_FR_BAT-avec_compression.pdf",
    lang: "fr",
    thumbnail: "/images/reports/2024-fr.jpg",
  },
  {
    year: 2023,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/rapport_annuel_2023_FINAL_fin_08.pdf",
    lang: "fr",
    thumbnail: "/images/reports/2023-fr.jpg",
  },
  {
    year: 2022,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_annuel_2022_BAT2807.pdf",
    lang: "fr",
    thumbnail: "/images/reports/2022-fr.jpg",
  },
  {
    year: 2021,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_Annuel_2021_IEA_de_Paris.pdf",
    lang: "fr",
    thumbnail: "/images/reports/2021-fr.jpg",
  },
  {
    year: 2020,
    href: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_annuel_IEA2020.pdf",
    lang: "fr",
    thumbnail: "/images/reports/2020-fr.jpg",
  },
]

const carouselReports = computed(() =>
  allReports.filter((r) => r.lang === locale.value),
)

const otherLangReports = computed(() =>
  allReports.filter((r) => r.lang !== locale.value),
)
</script>

<style scoped>
.annual-reports__desc {
  max-width: 60ch;
}

.reports-row-compact {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.report-link-compact {
  text-decoration: none;
  color: inherit;
}

.report-chip {
  border-radius: 0 !important;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.report-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}
</style>
