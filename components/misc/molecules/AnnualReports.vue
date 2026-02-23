<template>
  <h2 class="annual-reports__title">
    <a href="#annual-reports">{{ $t("annual-reports") }}</a>
  </h2>
  <p class="text-body-2 mb-4 annual-reports__desc">
    {{ $t("annual-reports-description") }}
  </p>

  <!-- Current locale reports -->
  <div class="reports-row pt-3">
    <a
      v-for="report in displayedReports"
      :key="report.year"
      :href="report.url"
      target="_blank"
      rel="noopener noreferrer"
      class="report-link"
    >
      <v-card class="report-card" variant="outlined" hover>
        <div class="report-card__cover">
          <v-icon size="36" color="grey-darken-1" class="report-card__icon">
            mdi-file-pdf-box
          </v-icon>
          <div class="report-card__year-badge">{{ report.year }}</div>
        </div>
        <v-card-text class="pa-3 pb-2">
          <div class="text-caption text-uppercase text-grey-darken-1">
            {{ $t("annual-report") }} &middot;
            {{ report.lang === "fr" ? "FR" : "EN" }}
          </div>
          <div class="text-subtitle-2 font-weight-bold mt-1">
            {{ report.year }}
          </div>
        </v-card-text>
      </v-card>
    </a>
  </div>

  <!-- Other language reports -->
  <div v-if="otherLangReports.length" class="mt-4">
    <div
      class="text-caption text-uppercase text-grey-darken-1 mb-2 font-weight-medium"
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
        :href="report.url"
        target="_blank"
        rel="noopener noreferrer"
        class="report-link-compact"
      >
        <v-card variant="outlined" hover class="report-chip">
          <v-card-text class="d-flex align-center pa-2 px-3 ga-2">
            <v-icon size="18" color="grey-darken-1">mdi-file-pdf-box</v-icon>
            <span class="text-body-2 font-weight-medium">{{
              report.year
            }}</span>
            <span class="text-caption text-grey text-uppercase">
              {{ report.lang === "fr" ? "FR" : "EN" }}
            </span>
            <v-icon size="14" color="grey" class="ml-1">mdi-open-in-new</v-icon>
          </v-card-text>
        </v-card>
      </a>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n()

const allReports = [
  {
    year: 2024,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/en/MAQ_IEA_RA_2024__12_25_ANG_BAT_NUM_compressed_compressed.pdf",
    lang: "en",
  },
  {
    year: 2023,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/en/MAQ_IEA_RA_2023_ANG_NUM_BAT_bd.pdf",
    lang: "en",
  },
  {
    year: 2024,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/MAQ_IEA_RA_2024__10_25_FR_BAT-avec_compression.pdf",
    lang: "fr",
  },
  {
    year: 2023,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/rapport_annuel_2023_FINAL_fin_08.pdf",
    lang: "fr",
  },
  {
    year: 2022,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_annuel_2022_BAT2807.pdf",
    lang: "fr",
  },
  {
    year: 2021,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_Annuel_2021_IEA_de_Paris.pdf",
    lang: "fr",
  },
  {
    year: 2020,
    url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/publications/tmp/pdf/fr/Rapport_annuel_IEA2020.pdf",
    lang: "fr",
  },
]

const displayedReports = computed(() =>
  allReports.filter((r) => r.lang === locale.value),
)

const otherLangReports = computed(() =>
  allReports.filter((r) => r.lang !== locale.value),
)
</script>

<style scoped>
.annual-reports-container {
  max-height: calc(100vh - 64px);
  overflow: hidden;
}

.annual-reports__title {
  font-size: 36px !important;
  line-height: 1.2 !important;
  margin-bottom: 0.3em !important;
  margin-top: 0 !important;
}

.annual-reports__desc {
  max-width: 60ch;
  margin-bottom: 16px !important;
}

/* Primary report cards – horizontal scroll row */
.reports-row {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 4px;
  scrollbar-width: thin;
}

.reports-row::-webkit-scrollbar {
  height: 4px;
}

.reports-row::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
}

.report-link {
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  width: 160px;
}

.report-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border-radius: 0 !important;
}

.report-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1) !important;
}

.report-card__cover {
  position: relative;
  height: 120px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.report-card__icon {
  opacity: 0.35;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.report-card:hover .report-card__icon {
  opacity: 0.65;
  transform: scale(1.1);
}

.report-card__year-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-family: "Bodoni Moda", serif;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  letter-spacing: 0.05em;
}

/* Compact row for other-language reports */
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

@media (max-width: 600px) {
  .report-link {
    width: 140px;
  }

  .report-card__cover {
    height: 90px;
  }

  .annual-reports__title {
    font-size: 28px !important;
  }
}
</style>
