<template>
  <v-row justify="center">
    <v-col cols="12" sm="11" md="8" lg="8" xl="6">
      <v-row no-gutters class="justify-center">
        <v-col cols="12" sm="10" md="6" class="text-center">
          <!--   PEOPLE IMAGE -->
          <MiscAtomsImageContainer
            cover
            v-if="mdAndUp"
            :loading="rootStore.people.loading"
            :src="item.image"
            :ratio="1 / 1"
            :width="
              [200, 250, 250, 300][
                ['md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          >
          </MiscAtomsImageContainer>
        </v-col>
        <v-col cols="12" class="text-center">
          <!-- FIRSTNAME LASTNAME -->
          <v-skeleton-loader
            class="mx-auto"
            v-if="rootStore.loading || rootStore.people.loading"
            :max-width="
              ['300', '400', '340', '400', '600', '600'][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
            :type="
              [
                'heading@2, ossein, avatar@4, ossein, chip@3',
                'heading, ossein, avatar@6, ossein, chip@4',
                'heading, ossein, avatar@5, ossein, chip@3',
                'heading, ossein, avatar@6, ossein, chip@4',
                'heading, ossein, avatar@9, ossein, chip@6',
                'heading, ossein, avatar@9, ossein, chip@6',
              ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
            "
          >
          </v-skeleton-loader>

          <template v-else>
            <div class="my-8 text-h3 align-self-center text-wrap">
              {{ item.firstname + " " + item.lastname
              }}<!--  TODO : call a composable to format people names (multiple, initials, capped & al. )-->
            </div>
            <!-- SOCIALS -->
            <div class="text-center">
              <MiscAtomsSocials :socials="item.socials" />
            </div>
            <!-- GROUPS -->
            <div class="mt-6 align-self-center">
              <PeopleGroupBadges :item="item" />
            </div>
          </template>
        </v-col>
      </v-row>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-6" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <div class="text-overline mt-6">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.people.loading"
          width="200"
          type="heading"
        >
        </v-skeleton-loader>
        <div v-else>
          {{ $t("biography") }}
        </div>
      </div>

      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        :type="
          ['text@16', 'text@16', 'text@16', 'text@12', 'text@12', 'text@12'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      >
      </v-skeleton-loader>
      <template v-else>
        <ContentRenderer :value="item" class="my-6 flex-wrap" />
      </template>

      <!-- DIVIDERS -->
      <v-responsive class="mx-auto my-9" width="120">
        <v-divider class="mb-1" />
        <v-divider />
      </v-responsive>

      <!-- POSITIONS AND AFFILIATIONS -->
      <div class="text-overline mt-6">
        <v-skeleton-loader
          v-if="rootStore.loading || rootStore.people.loading"
          width="200"
          type="heading"
        >
        </v-skeleton-loader>
        <div v-else>
          {{ $t("positions-and-affiliations") }}
        </div>
      </div>

      <!-- BIOGRAPHY -->
      <v-skeleton-loader
        v-if="rootStore.loading || rootStore.people.loading"
        type="subtitle, text@2"
        width="300"
      >
      </v-skeleton-loader>

      <v-card
        v-else
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
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="project"
        :items="item.relatedProjects"
      ></MiscMoleculesRelatedItems>
    </v-col>
    <v-col cols="12" md="4">
      <MiscMoleculesRelatedItems
        type="news"
        :items="item.relatedNews"
      ></MiscMoleculesRelatedItems>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "~/store/root"
const rootStore = useRootStore()
const { name, mdAndUp } = useDisplay()
const props = defineProps({ item: { type: Object, required: true } })
</script>
