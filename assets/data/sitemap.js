export default {
  main: [
    {
      text: "about",
      dropdown: true,
      children: [
        { text: "institute", path: "/about/institute" },
        { text: "scientific_policy", path: "/about/scientific_policy" },
        { text: "network", path: "/about/network" },
      ],
    },
    {
      text: "activities",
      dropdown: true,
      children: [
        { text: "fellowships", path: "/activities/fellowships" },
        { text: "projects", path: "/activities/projects" },
        {
          text: "events.key",
          path: "/activities/events",
        },
      ],
    },
    {
      text: "people",
      dropdown: true,
      children: [
        { text: "fellows", path: '/people?categories=["fellows"]' },
        { text: "team", path: '/people?categories=["team"]' },
        {
          text: "sab",
          path: '/people?categories=["scientific-advisory-board"]',
        },
        { text: "board", path: '/people?categories=["board-of-directors"]' },
        { text: "browse", path: "/people" },
      ],
    },
    {
      text: "news",
      path: "/news",
    },
  ],
  footer: [
    { text: "tos", path: "/tos" },
    { text: "contact", path: "/contact" },
    { text: "pressroom", path: "/pressroom" },
    { text: "newsletter", path: "/tos" },
    { text: "about", path: "/tos" },
    { text: "privacy_policy", path: "/tos" },
    { text: "support", path: "/support" },
  ],
}
