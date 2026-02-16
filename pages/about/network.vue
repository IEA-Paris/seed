<template>
  <div class="scroller">
    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12" sm="10" md="6">
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
          <v-col cols="12" sm="6" offset-md="1" md="5">
            <ContentDoc :path="members" />
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12" sm="10" md="8">
            <h2 class="pl-2">
              <a class="text-white" href="#our-sponsors">
                {{ $t("our-sponsors") }}</a
              >
            </h2>

            <v-col
              cols="12"
              sm="8"
              offset-md="1"
              md="6"
              v-if="sponsorsData && sponsorsData.length"
            >
              <MiscMoleculesLogoGallery
                :loading="pending"
                :items="sponsorsData"
              ></MiscMoleculesLogoGallery>
            </v-col>
            <v-col
              cols="12"
              v-else
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

          <v-col cols="12" sm="6" offset-md="1" md="5">
            <MiscMoleculesLogoGallery
              :loading="pending"
              :items="partnersData"
            ></MiscMoleculesLogoGallery>
          </v-col> </v-row
      ></v-container>
    </section>

    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import LIST_AFFILIATIONS from "@paris-ias/trees/dist/graphql/client/affiliations/query.list.affiliations.gql"

definePageMeta({ layout: "about" })

const { locale } = useI18n()

const {
  data: affiliationsData,
  pending,
  error,
} = await useAsyncQuery(
  LIST_AFFILIATIONS,
  {
    options: {
      skip: 0,
      limit: 100,
      filters: JSON.stringify({}),
      sort: "nameasc",
    },
    appId: "iea",
    lang: locale.value,
  },
  { key: "affiliations", server: true },
)

const normalizeColor = (color) => {
  const named = { white: "#fff", black: "#000" }
  return named[color?.toLowerCase?.()] || color
}

const mapItem = (item) => ({
  name: item.name,
  url: item.url,
  picture: item.image?.url,
  color: normalizeColor(item.image?.backgroundColor) || "#fff",
  location: item.locations?.[0]
    ? [item.locations[0].city, item.locations[0].country]
        .filter(Boolean)
        .join(", ")
    : null,
  category: item.category?.[0] || null,
  ror: item.ror || null,
  summary: item.summary || null,
  description: item.description || null,
})

const filterByCategory = (category) =>
  computed(() =>
    (affiliationsData.value?.listAffiliations?.items || [])
      .filter((item) => item.category?.includes(category))
      .map(mapItem),
  )

const membersData = filterByCategory("MEMBER")
const partnersData = filterByCategory("PARTNER")
const sponsorsData = filterByCategory("SPONSOR")

const sponsors = "/pages/" + locale.value + "/network_sponsors"
const members = "/pages/" + locale.value + "/network_members"
const partners = "/pages/" + locale.value + "/network_partners"
const network = "/pages/" + locale.value + "/network"
</script>

<style lang="scss" scoped></style>
