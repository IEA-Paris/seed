<template>
  <div class="scroller">
    <section class="d-flex flex-column">
      <NavigationBreadcrumbs class="d-flex align-start"></NavigationBreadcrumbs>
      <v-container>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12">
            <v-row no-gutters>             
              <v-col cols="12">
        <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
          {{ $t('meet-our-network') }}</div>
                  <ContentDoc :path="network" />
              </v-col>
            </v-row>
          </v-col> </v-row
      ></v-container>
    </section>

    <section >
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
          <v-col cols="12">
            <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
              {{ $t('our-members') }}</div>
            <v-row no-gutters>
              
             
              <v-col cols="12" sm="8">
                  <MiscMoleculesLogoGallery
                  :items="membersData"
                ></MiscMoleculesLogoGallery>
              </v-col> <v-col cols="12" sm="4">
              
              <ContentDoc :path="members" /> </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container >
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12">
            <div :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
              {{ $t('our-partners') }}</div>
            <v-row no-gutters>
      
              <v-col cols="12" sm="4" v-show="smAndUp">
                <v-sheet
                  class="d-flex align-center justify-center"
                  :to="localePath('/support')"
                  link
                >
                  <ActionsSmallContainer
                    :action="action"
                    :ratio="1"
                  ></ActionsSmallContainer></v-sheet
              ></v-col> 
              <v-col cols="12" sm="8">
                <MiscMoleculesLogoGallery
                  :items="partnersData"
                ></MiscMoleculesLogoGallery>
              </v-col></v-row
          ></v-col> </v-row
      ></v-container>
    </section>

    <section class="dark">
      <v-container>
        <v-row class="d-flex align-center justify-center flex-column">
            <v-col cols="12" :class="mdAndUp ? 'text-h2' : 'text-h4'" class="mb-6">
              {{ $t('our-sponsors') }}</v-col>
              
             
              <v-col cols="12" 
              
              v-if="sponsorsData&&sponsorsData.length"
              sm="8" >
                  <MiscMoleculesLogoGallery
                  
                  :items="sponsorsData"
                ></MiscMoleculesLogoGallery>
              </v-col>
              <v-col cols="12" 
              v-else
              sm="8" >
            </v-col>
              <v-col cols="12" :sm="sponsorsData&&sponsorsData.length?4:12">
              
              <ContentDoc :path="sponsors" /> 
              <v-btn  variant="outlined" tile>{{ $t('become-a-patron') }}</v-btn>
            
            </v-col>
            </v-row>
      </v-container>
    </section>
    <section>
      <v-container fluid>
        <v-row class="d-flex align-center justify-center">
          <v-col cols="12">
            Extra Slot
          </v-col> </v-row
      ></v-container>
    </section>
    <NavigationFooter isSnapScroll />
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify"
definePageMeta({
  layout: "about",
  /*   documentDriven: {
    page: false, // Keep page fetching enabled
    surround: false, // Disable surround fetching
  }, */
})
const { smAndUp, name, mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
//TODO .limit(1).find() > .findOne()
const { data: action } = await useAsyncData("actions", () =>
  queryContent("/actions/" + locale.value)
    .limit(1)
    .find(),
)

const { data: membersData } = await useAsyncData("members", () =>
  queryContent("/members/" + locale.value)
    .find(),
)
const { data: partnersData } = await useAsyncData("partners", () =>
  queryContent("/partners/" + locale.value)
    .find(),
)
const { data: sponsorsData } = await useAsyncData("sponsors", () =>
  queryContent("/sponsors/" + locale.value)
    .find(),
)
const sponsors = "/pages/" + locale.value + "/network_sponsors"
const members = "/pages/" + locale.value + "/network_members"
const partners = "/pages/" + locale.value + "/network_partners"
const network = "/pages/" + locale.value + "/network"
</script>

<style lang="scss" scoped></style>
