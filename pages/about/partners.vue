<template>
  <div class="partners-page">
    <NavigationPageToc :sections="tocSections" :aria-label="$t('on-this-page')" />
    <!-- ─── Hero ─────────────────────────────────────────────────────── -->
    <section class="partners-hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="10">
            <p class="partners-hero__overline text-overline">
              {{ $t("paris-institute-for-advanced-study") }}
            </p>
            <h1 v-motion-slide-visible-once-bottom class="partners-hero__title">
              {{ $t("about_partners.hero.title") }}
            </h1>
            <div class="prose partners-hero__intro">
              <ContentDoc :path="intro" />
            </div>
            <div class="partners-hero__actions">
              <v-btn variant="outlined" size="large" href="#members" :rounded="0">
                <v-icon start>mdi-domain</v-icon>
                {{ $t("members") }}
              </v-btn>
              <v-btn variant="text" size="large" href="#network">
                {{ $t("networks") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn variant="text" size="large" href="#support">
                {{ $t("supports") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 1. Members -->
    <section id="members" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("partners") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("members") }}</h2>
        <div class="prose section-intro">
          <ContentDoc :path="members" />
        </div>
        <v-skeleton-loader v-if="pending" type="list-item-avatar-two-line@3" />
        <template v-else>
          <AffiliationsExpandableDenseItem
            v-for="(item, index) in membersRaw"
            :key="'member-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!membersRaw.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>

    <!-- 2. Networks -->
    <section id="network" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("partners") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("networks") }}</h2>
        <div class="prose section-intro">
          <ContentDoc :path="networks" />
        </div>
        <v-skeleton-loader v-if="pending" type="list-item-avatar-two-line@3" />
        <template v-else>
          <AffiliationsExpandableDenseItem
            v-for="(item, index) in networkRaw"
            :key="'network-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!networkRaw.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>

    <!-- 3. Supports -->
    <section id="support" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("partners") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("supports") }}</h2>
        <div class="prose section-intro">
          <ContentDoc :path="supports" />
        </div>
        <v-skeleton-loader v-if="pending" type="list-item-avatar-two-line@3" />
        <template v-else>
          <AffiliationsExpandableDenseItem
            v-for="(item, index) in supportRaw"
            :key="'support-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!supportRaw.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>
  </div>
</template>

<script setup>
const { locale, t } = useI18n()

const { pending, membersRaw, networkRaw, supportRaw } = await useAffiliations()

const intro = "/pages/" + locale.value + "/partners"
const members = "/pages/" + locale.value + "/partners_members"
const networks = "/pages/" + locale.value + "/partners_networks"
const supports = "/pages/" + locale.value + "/partners_supports"

const tocSections = computed(() => [
  { id: "members", label: t("members") },
  { id: "network", label: t("networks") },
  { id: "support", label: t("supports") },
])

definePageMeta({ layout: "default" })
</script>

<style scoped>
.partners-page {
  overflow-x: clip;
}

/* Offset anchor targets below the fixed topbar (64px) */
.anchor-offset {
  scroll-margin-top: 64px;
}

.section-heading {
  margin-bottom: 1rem;
}

.section-intro {
  margin-bottom: 2.5rem;
  max-width: 70ch;
}

.section-intro :deep(p) {
  font-size: 0.9375rem;
  line-height: 1.7;
  opacity: 0.8;
  margin-bottom: 0.75rem;
}

/* ── Hero ────────────────────────────────────────────────────────────── */
.partners-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.partners-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.partners-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.partners-hero__intro {
  max-width: 60ch;
  margin-bottom: 2rem;
}

.partners-hero__intro :deep(p) {
  font-size: 1.125rem;
  line-height: 1.7;
  opacity: 0.75;
  margin-bottom: 0.75rem;
}

.partners-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
