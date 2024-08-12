<template>
  {{ name }}
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row no-gutters>
        <v-col cols="12" class="text-center">
          <!--   PEOPLE IMAGE -->
          <div class="d-flex justify-center">
            <v-sheet
              class="overflow-hidden"
              v-if="mdAndUp"
              :width="
                ['200', '250', '250', '300'][
                  ['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
            >
              <v-img
                :src="item.image"
                :aspect-ratio="1 / 1"
                :width="
                  ['200', '250', '250', '300'][
                    ['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                  ]
                "
                cover
                class="img-animation d-flex align-center justify-center"
              >
              </v-img>
            </v-sheet>
          </div>
          <!-- FIRSTNAME LASTNAME -->
          <div class="my-8 text-h3 align-self-center text-wrap">
            {{ item.firstname + " " + item.lastname
            }}<!--  TODO : call a composable to format people names (multiple, initials, capped & al. )-->
          </div>

          <!-- SOCIALS -->
          <PeopleIconBadge :socials="item.socials" />

          <!-- GROUPS -->
          <div class="mt-6 align-self-center">
            <v-chip
              class="mr-2 mt-3"
              variant="text"
              v-for="group in item.groups"
              :key="group"
            >
              {{ $t("groups." + group) }}</v-chip
            >
          </div>
        </v-col>
      </v-row>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <!-- BIOGRAPHY -->
      <div class="text-overline mt-6">
        {{ $t("biography") }}
      </div>
      <ContentRenderer :value="item" class="my-6 flex-wrap" />
      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>
      <!-- POSITIONS AND AFFILIATIONS -->
      <div class="text-overline mt-6">
        {{ $t("positions-and-affiliations") }}
      </div>
      <v-card
        flat
        v-for="record in item.affiliations"
        :key="record.affiliation"
      >
        <v-card-item class="px-0">
          <v-card-title class="text-wrap">
            {{ record.affiliation }}
          </v-card-title>
          <div class="text-body-2" v-for="position in record.positions">
            <div class="text-overline" v-if="position.start && position.stop">
              {{
                $t("from {0} to {1}", [
                  formatDate(position.start),
                  formatDate(position.stop),
                ])
              }}
            </div>
            {{ position.role + " " + position.department || "" }}
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
  <!-- DIVIDERS -->
  <v-responsive class="mx-auto my-9" width="120">
    <v-divider class="mb-1" />
    <v-divider /> </v-responsive
  ><v-row>
    <!-- RELATED ITEMS -->
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="events"
        :items="item.relatedEvents"
        class="mr-md-3"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="project"
        :items="item.relatedProjects"
        class="mx-md-3"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="news"
        :items="item.relatedNews"
        class="ml-md-3"
      ></MiscMoleculesRelatedItems>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()
const props = defineProps({ item: { type: Object, required: true } })
</script>
