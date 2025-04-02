import { useRoute } from "vue-router"
export const useFetchItem = () => {
  const route = useRoute()

  const fetchItem = async <T>(payload: {
    query: string
    key: string
  }): Promise<T> => {
    try {
      const { locale } = useI18n()
      const route = useRoute()

      const variables = {
        itemId: route.params.slug?.toString().trim(),
        appId: "iea",
        lang: locale.value,
      }
      const { data, error } = await useAsyncQuery(payload.query, variables)
      console.log("variables: ", variables)

      if (error.value) {
        console.error("GraphQL error:", error.value)
        throw error.value
      }

      const item = data?.value[payload.key]
      console.log("item: ", item)

      if (!item) {
        throw createError({
          statusCode: 404,
          message: "Item not found in response",
        })
      }
      // Update the slug in the i18n params
      // for people, the slug is the same in both languages
      // for other items, the slug is different in each language
      const setI18nParams = useSetI18nParams()
      if (!route.name.includes("people")) {
        console.log("update params")
        setI18nParams({
          en: { slug: item.slug.en },
          fr: { slug: item.slug.fr },
        })
      } else {
        // for people, the slug is the same in both languages
        setI18nParams({
          en: { slug: item.slug },
          fr: { slug: item.slug },
        })
      }
      return item as T
    } catch (error) {
      console.error("Error fetching item:", error)
      throw createError({
        statusCode: 404,
        message: "Item not found",
        cause: error,
      })
    }
  }

  return {
    fetchItem,
  }
}
const stygerf =
  /**
   * Paste one or more documents here
   */
  {
    appId: ["iea"],
    image: {
      url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/people/Laville.jpg",
    },
    consent: {
      data: false,
      record: false,
      diffusion: false,
      publication: false,
      email: false,
      newsletter: false,
      fellowshipnewsletter: false,
    },
    firstname: "Bettina",
    lastname: "Laville",
    affiliations: [
      {
        affiliation: {
          name: {
            en: "Paris Institute for Advanced Study",
            fr: "Institut d'études avancées de Paris",
          },
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/logos/logo.png",
          },
          location: {
            name: {
              en: "17 Quai d'Anjou, 75004 Paris, France",
              fr: "17 Quai d'Anjou, 75004 Paris, France",
            },
          },
        },
        positions: [
          {
            role: {
              en: "President",
              fr: "Présidente",
            },
            start: null,
            stop: null,
          },
        ],
      },
    ],
    socials: {
      wikipedia:
        "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal",
      orcid: "https://orcid.org/",
      linkedin: "https://www.linkedin.com/feed/",
      twitter: "https://x.com/?lang=fr",
      scholar: "https://orcid.org/",
      researchgate: "https://www.researchgate.net/",
    },
    groups: {
      board: true,
    },
    biography: {
      en: "State Councillor, Doctor of Letters, Sciences Po laureate and ENA alumna, Bettina Laville is President and founder of Comité 21, created in 1995. She was chief of staff to Brice Lalonde, then advisor on environmental issues to two prime ministers, Pierre Bérégovoy and Lionel Jospin, and to French President François Mitterrand. In this capacity, she was responsible for preparing the Rio, Kyoto and Johannesburg conferences. A lecturer at Science Po for ten years, she was responsible for several reports on the environment, in particular during the Grenelle de l'Environnement and the Conférence environnementale, and is the author of numerous articles. She is co-author of Villette Amazone (1996), published La machine ronde in 2002 and co-authored Développement durable - Aspects stratégiques et opérationnels (2011, EFL), and with CNRS, Quelles solutions contre le réchauffement climatique? (2015). Also with CNRS, she will publish L'adaptation au changement climatique, une question de sociétés (Adapting to climate change: a question of society) in October.",
      fr: "Conseillère d'État, docteur en lettres, lauréate de Sciences Po et ancienne élève de l'ENA, Bettina Laville est présidente et fondatrice du Comité 21, créé en 1995. Elle a été chef de cabinet de Brice Lalonde, puis conseillère sur les questions environnementales auprès de deux premiers ministres, Pierre Bérégovoy et Lionel Jospin, ainsi que du président français François Mitterrand. À ce titre, elle a été chargée de la préparation des conférences de Rio, Kyoto et Johannesburg. Chargée de cours à Sciences Po pendant dix ans, elle a été responsable de plusieurs rapports sur l'environnement, notamment lors du Grenelle de l'Environnement et de la Conférence environnementale, et est l'auteure de nombreux articles. Elle est co-auteure de Villette Amazone (1996), a publié La machine ronde en 2002 et coécrit Développement durable - Aspects stratégiques et opérationnels (2011, EFL), et avec le CNRS, Quelles solutions contre le réchauffement climatique ? (2015). Également avec le CNRS, elle publiera L'adaptation au changement climatique, une question de sociétés en octobre.",
    },
    related: {
      events: [
        {
          name: {
            en: "Advancements in Renewable Energy and AI Integration",
            fr: "Avancées dans les énergies renouvelables et l'intégration de l'IA",
          },
          description: {
            en: "In collaboration with Stanford University and the International Energy Agency.",
            fr: "En collaboration avec l'Université de Stanford et l'Agence Internationale de l'Énergie.",
          },
          summary: {
            en: "As the global push for sustainable energy continues, artificial intelligence is playing a pivotal role in optimizing renewable energy systems.",
            fr: "Alors que la transition mondiale vers une énergie durable se poursuit, l'intelligence artificielle joue un rôle crucial dans l'optimisation des systèmes d'énergie renouvelable.",
          },
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/events/renewable_1.jpg",
          },
          start: "2023-06-15T08:00:00.000+00:00",
          eventType: {
            en: "Field Trip",
            fr: "Sortie de terrain",
          },
          state: "Upcoming",
          slug: {
            en: "advancements-in-renewable-energy-and-ai-integration",
            fr: "avancements-dans-les-energies-renouvelables-et-lintegration-de-lia",
          },
        },
        {
          name: {
            en: "AI and Climate Change",
            fr: "IA et changement climatique",
          },
          description: {
            en: "Artificial Intelligence is emerging as a powerful tool in the fight against climate change",
            fr: "L'intelligence artificielle émerge comme un outil puissant dans la lutte contre le changement climatique.",
          },
          summary: {
            en: "Artificial Intelligence is emerging as a powerful tool in the fight against climate change",
            fr: "L'intelligence artificielle émerge comme un outil puissant dans la lutte contre le changement climatique.",
          },
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/events/climat.jpg",
          },
          start: "2023-06-15T08:00:00.000+00:00",
          eventType: {
            en: "Workshop",
            fr: "Atelier",
          },
          state: "Upcoming",
          slug: {
            en: "ai-and-climate-change",
            fr: "ia-et-changement-climatique",
          },
        },
      ],
      projects: [
        {
          shortDescription: {
            en: "The Positive Future initiative, supported by the Institut d'études avancées de Paris and the Fondation 2100.",
            fr: "L'initiative Futur Positif, soutenue par l'Institut d'études avancées de Paris et la Fondation 2100.",
          },
          description: {
            en: "The Positive Future initiative, supported by the Institut d'études avancées de Paris and the Fondation 2100, aims to make foresight work widely known.",
            fr: "L'initiative Futur Positif, soutenue par l'Institut d'études avancées de Paris et la Fondation 2100, vise à faire connaître les travaux de prospective.",
          },
          url: "https://www.positive-future.org",
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/project/logoPF.png",
          },
          date: "2023-11-01T10:00:00.000+00:00",
          name: {
            en: "Positive Future",
            fr: "Futur Positif",
          },
          slug: {
            en: "positive-future",
            fr: "futur-positif",
          },
        },
        {
          shortDescription: {
            en: "The Socioscope is all about understanding how we make our world more sustainable, especially when it comes to food.",
            fr: "Le Socioscope vise à comprendre comment rendre notre monde plus durable, en particulier en matière d'alimentation.",
          },
          description: {
            en: "The Socioscope is all about understanding how we make our world more sustainable, especially when it comes to food.",
            fr: "Le Socioscope vise à comprendre comment rendre notre monde plus durable, en particulier en matière d'alimentation.",
          },
          url: "https://thesocioscope.org/",
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/project/the_socioscope.svg",
          },
          date: "2023-11-01T10:00:00.000+00:00",
          name: {
            en: "The Socioscope",
            fr: "Le Socioscope",
          },
          slug: {
            en: "the-socioscope",
            fr: "le-socioscope",
          },
        },
        {
          shortDescription: {
            en: "The World Pandemic Research Network (WPRN) is dedicated to facilitating international collaboration in pandemic research",
            fr: "Le Réseau Mondial de Recherche sur les Pandémies (WPRN) se consacre à faciliter la collaboration internationale en matière de recherche sur les pandémies",
          },
          description: {
            en: "It focuses on generating knowledge, data, and tools that can be shared across nations to better understand and combat pandemics. Through partnerships with institutions like the Institut d'Études Avancées de Paris (Paris IAS), WPRN brings together leading experts to address the complex challenges posed by global health crises",
            fr: "Il se concentre sur la génération de connaissances, de données et d'outils qui peuvent être partagés entre les nations pour mieux comprendre et combattre les pandémies. Grâce à des partenariats avec des institutions telles que l'Institut d'Études Avancées de Paris (Paris IAS), le WPRN réunit des experts de premier plan pour relever les défis complexes posés par les crises sanitaires mondiales.",
          },
          url: "https://wprn.org",
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/project/wprn_logo.png",
          },
          date: "2023-11-01T10:00:00.000+00:00",
          name: {
            en: "World Pandemic Research Network",
            fr: "Réseau Mondial de Recherche sur les Pandémies",
          },
          slug: {
            en: "world-pandemic-research-network",
            fr: "reseau-mondial-de-recherche-sur-les-pandemies",
          },
        },
      ],
      news: [
        {
          name: {
            en: "Exploring the Earth's Layers",
            fr: "Explorer les couches de la Terre",
          },
          description: {
            en: "The branch of geology concerned with the description and classification of rocks.",
            fr: "La branche de la géologie qui se consacre à la description et à la classification des roches.",
          },
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/events/renewable_1.jpg",
          },
          date: "2023-06-15T08:00:00.000+00:00",
          slug: {
            en: "exploring-the-earths-layers",
            fr: "explorer-les-couches-de-la-terre",
          },
        },
        {
          name: {
            en: "Mitigating Climate Change",
            fr: "Atténuer le changement climatique",
          },
          description: {
            en: "The total amount of greenhouse gases produced by human activities, measured in carbon dioxide equivalents",
            fr: "Le total des gaz à effet de serre produits par les activités humaines, mesuré en équivalents dioxyde de carbone",
          },
          image: {
            url: "https://cdn-yggdrasil-dev.s3.eu-west-2.amazonaws.com/iea/events/climat.jpg",
          },
          date: "2023-06-15T08:00:00.000+00:00",
          slug: {
            en: "mitigating-climate-change",
            fr: "attenuer-le-changement-climatique",
          },
        },
      ],
    },
    slug: "bettina-laville",
  }
