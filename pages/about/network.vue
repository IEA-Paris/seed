<template>
  <div class="scroller">
    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12" sm="10" md="6" offset-md="1">
            <h2>
              <a class="text-white" href="#meet-our-network">
                {{ $t("meet-our-network") }}</a
              >
            </h2>
            <ContentDoc :path="network" />
          </v-col> </v-row
      ></v-container>
    </section>

    <section dark>
      <v-container>
        <v-row class="d-flex">
          <v-col cols="12" offset-md="1" md="10">
            <h2>
              <a href="#our-members"> {{ $t("our-members") }}</a>
            </h2>
          </v-col>

          <v-col cols="12" sm="6" offset-md="1" md="5">
            <MiscMoleculesLogoGallery
              :loading="pending"
              :items="membersData"
            ></MiscMoleculesLogoGallery>
          </v-col>
          <v-col cols="12" sm="6" md="5">
            <ContentDoc :path="members" />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12" sm="10" md="6" offset-md="1">
            <h2 class="pl-2">
              <a class="text-white" href="#our-sponsors">
                {{ $t("our-sponsors") }}</a
              >
            </h2>

            <v-col
              v-if="sponsorsData && sponsorsData.length"
              cols="12"
              sm="8"
              offset-md="1"
              md="6"
            >
              <MiscMoleculesLogoGallery
                :loading="pending"
                :items="sponsorsData"
              ></MiscMoleculesLogoGallery>
            </v-col>
            <v-col
              v-else
              cols="12"
              :sm="sponsorsData && sponsorsData.length ? 3 : 12"
            >
              <ContentDoc :path="sponsors" />
              <v-btn variant="outlined" tile>{{ $t("become-a-patron") }}</v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container>
        <v-row class="d-flex">
          <v-col cols="12" offset-md="1" md="10">
            <h2>
              <a href="#our-partners"> {{ $t("our-partners") }}</a>
            </h2>
          </v-col>

          <v-col cols="12" sm="6" offset-md="1" md="5">
            <ContentDoc :path="partners" />
          </v-col>

          <v-col cols="12" sm="6" md="5">
            <MiscMoleculesLogoGallery
              :loading="pending"
              :items="partnersData"
            ></MiscMoleculesLogoGallery>
          </v-col> </v-row
      ></v-container>
    </section>

    <NavigationFooter :is-snap-scroll="true" />
  </div>
</template>

<script setup>
definePageMeta({ layout: "about" })

const { locale } = useI18n()

const { pending, membersData, partnersData, sponsorsData } =
  await useAffiliations()

const sponsors = "/pages/" + locale.value + "/network_sponsors"
const members = "/pages/" + locale.value + "/network_members"
const partners = "/pages/" + locale.value + "/network_partners"
const network = "/pages/" + locale.value + "/network"
</script>

<style lang="scss" scoped></style>
