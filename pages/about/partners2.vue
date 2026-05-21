<template>
  <div class="scroller">
    <!-- 1. Intro — dark -->
    <section class="section-dark">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="10" md="7" lg="5" xl="4">
            <p class="overline-label overline-label--light">
              {{ $t("network") }}
            </p>
            <div class="typographic-rule typographic-rule--light" />
            <div class="prose prose--light">
              <ContentDoc :path="network" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 2. Members -->
    <section class="section-light">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="5" lg="4">
            <p class="overline-label">{{ $t("network") }}</p>
            <div class="typographic-rule" />
            <ContentDoc :path="members" />
          </v-col>
          <v-col cols="12" md="5" lg="4">
            <MiscMoleculesLogoGallery :loading="pending" :items="membersData" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 3. Sponsors — dark -->
    <section class="section-dark">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="7" lg="5" xl="4">
            <p class="overline-label overline-label--light">
              {{ $t("network") }}
            </p>
            <div class="typographic-rule typographic-rule--light" />
            <template v-if="supportData && supportData.length">
              <MiscMoleculesLogoGallery
                :loading="pending"
                :items="supportData"
              />
            </template>
            <template v-else>
              <div class="prose prose--light">
                <ContentDoc :path="sponsors" />
              </div>
              <v-btn
                variant="outlined"
                class="mt-6 btn-light"
                rounded="0"
                :to="$localePath('/support')"
              >
                {{ $t("become-a-patron") }}
              </v-btn>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- 4. Partners -->
    <section class="section-light">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" md="5" lg="4">
            <MiscMoleculesLogoGallery
              :loading="pending"
              :items="networkData"
            />
          </v-col>
          <v-col cols="12" md="5" lg="4">
            <p class="overline-label">{{ $t("network") }}</p>
            <div class="typographic-rule" />
            <ContentDoc :path="partners" />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <NavigationFooter :is-snap-scroll="true" />
  </div>
</template>

<script setup>
definePageMeta({ layout: "about" })

const { locale } = useI18n()

const { pending, membersData, networkData, supportData } =
  await useAffiliations()

const sponsors = "/pages/" + locale.value + "/network_sponsors"
const members = "/pages/" + locale.value + "/network_members"
const partners = "/pages/" + locale.value + "/network_partners"
const network = "/pages/" + locale.value + "/network"
</script>
