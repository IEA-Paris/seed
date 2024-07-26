<template>
  {{ name }}
  <v-row>
    <v-col cols="12" md="1"></v-col>
    <v-col cols="12" md="12" lg="10" xl="10">
      <v-card width="100%">
        <v-card-item class="d-flex justify-center">
          <v-card-title class="d-flex flex-column">
            <div class="overflow-hidden align-self-center">
              <v-img
                :src="item.image"
                :aspect-ratio="1 / 1"
                :width="
                  ['100', '100', '200', '189', '252', '300'][
                    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                  ]
                "
                cover
                class="img-animation"
              >
              </v-img>
            </div>
            <div class="mt-md-6 text-h4 align-self-center">
              {{ item.firstname + " " + item.lastname }}
            </div>
            <div class="ml-n3 mt-md-2 align-self-center">
              <PeopleIconBadge :socials="item.socials" />
            </div>
          </v-card-title>

          <div class="mt-md-2 align-self-center">
            <v-chip
              class="mr-2"
              variant="text"
              v-for="group in item.groups"
              :key="group"
            >
              {{ $t("groups." + group) }}</v-chip
            >
          </div>
        </v-card-item>

        <v-card-text>
          <ContentRenderer :value="item" class="mx-md-4" />

          <div>
            <div class="ml-4 text-h5">
              {{ $t("positions-and-affiliations") }}
            </div>

            <v-card
              flat
              v-for="record in item.affiliations"
              :key="record.affiliation"
            >
              <v-card-item>
                <v-card-title class="text-md-subtitle-1">
                  {{ record.affiliation }}
                </v-card-title>
                <div
                  class="text-md-body-2"
                  v-for="position in record.positions"
                >
                  {{ position.role + " " + position.department || "" }}
                </div>

                <div class="mt-4 mx-n6">
                  <MiscMoleculesRelatedItems
                    type="events"
                    :items="item.relatedEvents"
                  ></MiscMoleculesRelatedItems>
                  <MiscMoleculesRelatedItems
                    type="project"
                    :items="item.relatedProjects"
                  ></MiscMoleculesRelatedItems>

                  <MiscMoleculesRelatedItems
                    type="news"
                    :items="item.relatedNews"
                  ></MiscMoleculesRelatedItems>
                </div>
              </v-card-item>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="1"></v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
const { name, mdAndDown, md, xl, lg, smAndDown, mdAndUp, lgAndUp } =
  useDisplay()
const props = defineProps({ item: { type: Object, required: true } })

console.log("SOCIALS", props.item)
</script>
