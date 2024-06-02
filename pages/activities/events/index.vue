<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListOrganismsList type="events"></ListOrganismsList> </v-col
    ></v-row>
  </v-container>

  <EventsRowsItem2 :item="data"></EventsRowsItem2>

  <div v-for="item in data" :key="item.start">
    <EventsView :data="item" />
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const { smAndUp } = useDisplay();
const localePath = useLocalePath();

const data = [
  {
    title:
      "International panel on social progress: collective intelligence in action",
    description:
      "Meeting organized by the RFIEA Foundation and the Paris IAS, with the support of the European Climate Foundation, CNRS, Paris School of Economics, Cornell University, FMSH and the RFIEA+ Laboratory of Excellence.",
    date_text: "27-29 September 2023",
    start: "2023-09-27T00:00:00.000Z",
    stop: "2023-12-27T00:00:00.000Z",
    online: false,
    summary:
      "Meeting organized by the RFIEA Foundation and the Paris IAS, with the support of the European Climate Foundation, CNRS, Paris School of Economics, Cornell University, FMSH and the RFIEA+ Laboratory of Excellence.",
    picture:
      "https://www.paris-iea.fr/images/videos/30410/_thumb3/siteverdun-image-alan-james.jpg",
    location:
      "Institut d'études avancées de Paris, 17 quai d'Anjou, 75004, Paris",
    type: 1,
    items: ["Presentation", "Programme"],
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  // {
  //   title: "Quelle sociolinguistique critique, il y a 20 ans et aujourd'hui",
  //   description: "",
  //   date_text: "04 October 2023",
  //   start: "2023-10-04T00:00:00.000Z",
  //   stop: "2023-12-04T00:00:00.000Z",
  //   online: false,
  //   summary:
  //     "Conference by Monica Heller, organised by James Costa, professor, Sorbonne Nouvelle, Lola Aubertin and Salomé Molina, doctoral students, Sorbonne Nouvelle, with the support of the IEA de Paris.",
  //   location:
  //     "Institut d'études avancées de Paris, 17 quai d'Anjou, 75004, Paris",
  //   picture: null,
  //   type: 2,
  // },

  // {
  //   title: "Paris IAS Ideas",
  //   description:
  //     "Le cycle 'Paris IAS Ideas' propose des présentations courtes de chercheurs de l'Institut d'études avancées de Paris suivies d'échanges avec le public. Ces séances marquent le début de résidences d'écriture d'un mois au cours desquelles ces chercheurs invités rédigeront un article présentant la version 'définitive' d'une idée ou d'un concept sur lequel ils travaillent depuis des années.",
  //   date_text: "08 September 2023 - 07 July 2024",
  //   start: "2023-09-08T00:00:00.000Z",
  //   stop: "2024-03-08T00:00:00.000Z",
  //   online: true,
  //   summary:
  //     "Online talk series, with the participation of the Paris IAS researchers in writing residencies",
  //   location: null,
  //   picture:
  //     "https://www.paris-iea.fr/images/evenements/30395/_thumb3/vignette-generique-site-web-verticale.png",
  //   type: 1,
  // },
  // {
  //   title: "Comparative Health Humanities ",
  //   description:
  //     "Symposium organized by Céline Lefève, director of the Institute 'La personne en médecine', sponsored by the Université Paris Cité, the Institute 'La Personne en Médecine', the CNRS, the Laboratoire de Recherche sur les Cultures Anglophones, Northeastern University's Health, Humanities, and Society and Humanities Center, and the Critical Health Humanities seminar at Harvard University's Mahindra Humanities Center, with the support of the Paris Institute for Advanced Study.",
  //   date_text: "05 - 06 October 2023",
  //   start: "2023-10-05T00:00:00.000Z",
  //   online: false,
  //   summary:
  //     'Symposium organized by Céline Lefève, director of the Institute "La personne en médecine", with the support of the Paris Institute for Advanced study',
  //   location:
  //     "Institut d'études avancées de Paris, 17 quai d'Anjou, 75004, Paris",
  //   picture:
  //     "https://www.paris-iea.fr/images/evenements/30331/_thumb3/postercomparative-health-humanities-symposium-in-paris1.png",
  //   type: 3,
  // },
];
</script>
