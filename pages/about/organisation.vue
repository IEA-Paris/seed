<template>
  <div class="organisation-page">
    <NavigationPageToc :sections="tocSections" :aria-label="$t('on-this-page')" />
    <!-- ─── Hero ─────────────────────────────────────────────────────── -->
    <section class="organisation-hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="10">
            <p class="organisation-hero__overline text-overline">
              {{ $t("paris-institute-for-advanced-study") }}
            </p>
            <h1
              v-motion-slide-visible-once-bottom
              class="organisation-hero__title"
            >
              {{ $t("about_organisation.hero.title") }}
            </h1>
            <p class="organisation-hero__subtitle">
              {{ $t("about_organisation.hero.subtitle") }}
            </p>
            <div class="organisation-hero__actions">
              <v-btn variant="outlined" size="large" href="#team" :rounded="0">
                <v-icon start>mdi-account-group-outline</v-icon>
                {{ $t("team") }}
              </v-btn>
              <v-btn variant="text" size="large" href="#board">
                {{ $t("board") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn variant="text" size="large" href="#sab">
                {{ $t("sab") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
              <v-btn variant="text" size="large" href="#ethics">
                {{ $t("ethics") }}
                <v-icon end>mdi-arrow-down</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 1. Team -->
    <section id="team" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("organisation") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("team") }}</h2>
        <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@3" />
        <template v-else>
          <PeopleExpandableDenseItem
            v-for="(item, index) in team"
            :key="'team-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!team.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>

    <!-- 2. Board of directors -->
    <section id="board" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("organisation") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("board") }}</h2>
        <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@3" />
        <template v-else>
          <PeopleExpandableDenseItem
            v-for="(item, index) in board"
            :key="'board-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!board.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>

    <!-- 3. Scientific Advisory Board -->
    <section id="sab" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("organisation") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("sab") }}</h2>
        <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@3" />
        <template v-else>
          <PeopleExpandableDenseItem
            v-for="(item, index) in sab"
            :key="'sab-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!sab.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>

    <!-- 4. Ethics committee -->
    <section id="ethics" class="section-light anchor-offset">
      <v-container>
        <p class="overline-label">{{ $t("organisation") }}</p>
        <div class="typographic-rule" />
        <h2 class="section-heading">{{ $t("ethics") }}</h2>
        <v-skeleton-loader v-if="loading" type="list-item-avatar-two-line@3" />
        <template v-else>
          <PeopleExpandableDenseItem
            v-for="(item, index) in ethics"
            :key="'ethics-' + (item.slug || index)"
            :item="item"
            :index="index"
          />
          <p v-if="!ethics.length" class="text-body-2 text-medium-emphasis">
            {{ $t("no-results") }}
          </p>
        </template>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import LIST_PEOPLE from "@paris-ias/trees/dist/graphql/client/people/query.list.people.gql"

const { locale, t } = useI18n()

const tocSections = computed(() => [
  { id: "team", label: t("team") },
  { id: "board", label: t("board") },
  { id: "sab", label: t("sab") },
  { id: "ethics", label: t("ethics") },
])

const buildVariables = (group) => ({
  options: {
    skip: 0,
    limit: 50,
    sort: "nameasc",
    filters: JSON.stringify({ groups: [group] }),
  },
  appId: "iea",
  lang: locale.value,
})

const [teamRes, boardRes, sabRes, ethicsRes] = await Promise.all([
  useAsyncQuery(LIST_PEOPLE, buildVariables("team")),
  useAsyncQuery(LIST_PEOPLE, buildVariables("board")),
  useAsyncQuery(LIST_PEOPLE, buildVariables("sab")),
  useAsyncQuery(LIST_PEOPLE, buildVariables("ethics")),
])

for (const res of [teamRes, boardRes, sabRes, ethicsRes]) {
  if (res.error.value) {
    console.error("GraphQL error:", res.error.value)
    throw res.error.value
  }
}

const collator = computed(
  () =>
    new Intl.Collator(locale.value, { sensitivity: "base", usage: "sort" }),
)

const sortPeople = (items) =>
  [...items].sort((a, b) => {
    const cmp = collator.value.compare(a.lastname || "", b.lastname || "")
    return cmp !== 0
      ? cmp
      : collator.value.compare(a.firstname || "", b.firstname || "")
  })

const team = computed(() => sortPeople(teamRes.data.value?.listPeople?.items ?? []))
const board = computed(() => sortPeople(boardRes.data.value?.listPeople?.items ?? []))
const sab = computed(() => sortPeople(sabRes.data.value?.listPeople?.items ?? []))
const ethics = computed(() => sortPeople(ethicsRes.data.value?.listPeople?.items ?? []))

const loading = computed(
  () =>
    teamRes.pending?.value ||
    boardRes.pending?.value ||
    sabRes.pending?.value ||
    ethicsRes.pending?.value,
)

definePageMeta({ layout: "default" })
</script>

<style scoped>
.organisation-page {
  overflow-x: clip;
}

/* Offset anchor targets below the fixed topbar (64px) */
.anchor-offset {
  scroll-margin-top: 64px;
}

.section-heading {
  margin-bottom: 2.5rem;
}

/* ── Hero ────────────────────────────────────────────────────────────── */
.organisation-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.organisation-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.organisation-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.organisation-hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 60ch;
  opacity: 0.75;
  margin-bottom: 2rem;
}

.organisation-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
