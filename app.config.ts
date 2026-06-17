import staticConfiguration from "./static.config"

export default defineAppConfig({
  ...staticConfiguration,
  author: "Antoine Cordelois",
  url: "https://paris-iea.fr",
  lang: {
    locales: ["en", "fr"],
    default: "en",
  },
  list: {
    // Consuming app id, used to scope which filters render on this consumer
    // (filters may declare an `appId` allow-list; "all" is a wildcard).
    appId: "iea",
    modules: [
      "events",
      "people",
      "projects",
      "fellowships",
      "publications",
      // "affiliations",
      // "actions",
      // "disciplines",
      // "files",
      // "mailing",
      // "tags",
    ],
  },
})
