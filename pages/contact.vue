<template>
  <div class="contact-page">
    <!-- Hero -->
    <section class="contact-hero">
      <v-container>
        <v-row>
          <v-col cols="12" md="8" lg="6">
            <p class="contact-hero__overline text-overline">
              {{ $t("contact-us") }}
            </p>
            <h1 v-motion-slide-visible-once-bottom class="contact-hero__title">
              {{ $t("contact.hero.title") }}
            </h1>
            <p class="contact-hero__subtitle">
              {{ $t("contact.hero.subtitle") }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Team contacts — SlidingCarousel -->
    <section class="contact-team">
      <v-container>
        <MiscAtomsSlidingCarousel type="contact" :items="team" :more="false">
          <p class="contact-team__section-label text-overline">
            {{ $t("contact.team.label") }}
          </p>
        </MiscAtomsSlidingCarousel>
      </v-container>
    </section>

    <!-- General info: address + phone + general email -->
    <section class="contact-info">
      <v-container>
        <v-row>
          <v-col v-motion-slide-visible-once-bottom cols="12" md="4">
            <div class="contact-info__block">
              <span class="contact-info__label text-overline">
                {{ $t("contact.info.address") }}
              </span>
              <NuxtLink
                :to="$localePath('/visit')"
                class="contact-info__value contact-info__link contact-info__address"
              >
                Paris Institute for Advanced Study<br />
                17 Quai d'Anjou<br />
                75004 Paris, France
              </NuxtLink>
            </div>
          </v-col>
          <v-col v-motion-slide-visible-once-bottom cols="12" md="4">
            <div class="contact-info__block">
              <span class="contact-info__label text-overline">
                {{ $t("contact.info.phone") }}
              </span>
              <a
                href="tel:+33156810052"
                class="contact-info__value contact-info__link"
              >
                +33 (0)1 56 81 00 52
              </a>
            </div>
          </v-col>
          <v-col v-motion-slide-visible-once-bottom cols="12" md="4">
            <div class="contact-info__block">
              <span class="contact-info__label text-overline">
                {{ $t("contact.info.general") }}
              </span>
              <a
                href="mailto:contact@Paris-IEA.fr"
                class="contact-info__value contact-info__link"
              >
                contact@Paris-IEA.fr
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useHead({
  title: t("contact-us"),
  meta: [{ name: "description", content: t("contact.hero.subtitle") }],
})

const team = computed(() => [
  {
    name: "Sandrine",
    role: t("contact.team.roles.events"),
    email: "Sandrine@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/sandrine-morvan.jpg",
  },
  {
    name: "Éloise",
    role: t("contact.team.roles.media"),
    email: "Eloise@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/eloise-lehujeur.jpg",
  },
  {
    name: "Lisette",
    role: t("contact.team.roles.video"),
    email: "Lisette@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/LISETTE-WINKLER.jpg",
  },

  {
    name: "Paulius",
    role: t("contact.team.roles.science"),
    email: "Paulius@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/paulius-yamin.jpg",
  },
  {
    name: "Saadi",
    role: t("contact.team.roles.world"),
    email: "Saadi@Paris-IEA.fr",
    photo:
      "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/tmp/team/saadi-lahlou.jpg",
  },
])
</script>

<style scoped>
/* ─── Hero ─────────────────────────────────────────────── */
.contact-hero {
  padding: 4rem 0 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.contact-hero__overline {
  margin-bottom: 0.5rem;
  letter-spacing: 0.15em;
  opacity: 0.5;
}

.contact-hero__title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  line-height: 1.05;
  font-weight: 900;
  margin-bottom: 1.5rem;
  max-width: 20ch;
}

.contact-hero__subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  max-width: 55ch;
  opacity: 0.65;
  margin: 0;
}

/* ─── Team ──────────────────────────────────────────────── */
.contact-team {
  padding: 4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.contact-team__section-label {
  letter-spacing: 0.18em;
  opacity: 0.45;
  margin: 0;
}

/* ─── General info ──────────────────────────────────────── */
.contact-info {
  padding: 4rem 0;
}

.contact-info__block {
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
}

.contact-info__label {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  color: rgba(0, 0, 0, 0.4);
  margin-bottom: 0.75rem;
}

.contact-info__value {
  font-size: 1rem;
  line-height: 1.6;
  color: #000;
  margin: 0;
}

.contact-info__link {
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.contact-info__link:hover {
  opacity: 0.6;
  text-decoration: underline;
}

.contact-info__address {
  display: inline-block;
}

@media (max-width: 599px) {
  .contact-info__block {
    padding-right: 0;
    margin-bottom: 2.5rem;
  }
}
</style>
