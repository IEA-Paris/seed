# Seed - Paris Institute for Advanced Study Website

Seed is the main public-facing website for the Paris Institute for Advanced Study (IEA Paris), built as a modern Nuxt 3 application that showcases the power of the Isomorphic Forest architecture. It serves as a comprehensive academic platform displaying people, events, publications, projects, and institutional information.

## 🏗️ Architecture Overview

Seed demonstrates the **convention over configuration** principle of Isomorphic Forest by consuming the three core modules with minimal setup, creating a full-featured academic website.

```mermaid
graph TD
    A[Seed Application] --> B[Isomorphic Forest Integration]

    B --> C[@paris-ias/trees]
    B --> D[@paris-ias/list]
    B --> E[@paris-ias/form]

    C --> F[Academic Data Models]
    D --> G[Content Listings]
    E --> H[Content Forms]

    F --> I[People]
    F --> J[Events]
    F --> K[Publications]
    F --> L[Projects]
    F --> M[Fellowships]

    G --> N[Dynamic Lists]
    G --> O[Filtering & Search]
    G --> P[Multiple Views]

    H --> Q[Content Creation]
    H --> R[Content Editing]
    H --> S[Form Validation]

    A --> T[Nuxt 3 Framework]
    T --> U[SSR/SSG Support]
    T --> V[Performance Optimization]
    T --> W[SEO Integration]

    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style T fill:#e8f5e8
```

## 🌟 Key Features

### Academic Content Management

- **People Directory**: Comprehensive academic profiles with affiliations, disciplines, and research areas
- **Event Calendar**: Academic events, conferences, and seminars with detailed information
- **Publications Database**: Research papers, books, and academic articles
- **Project Showcase**: Research projects and institutional initiatives
- **Fellowship Programs**: Detailed fellowship opportunities and program information
- **News & Updates**: Latest institutional news and announcements

### Isomorphic Forest Integration Benefits

- **Zero Configuration Lists**: Automatic list generation for all content types
- **Dynamic Filtering**: Real-time content filtering based on data model attributes
- **Internationalization**: Seamless French/English content switching
- **Responsive Design**: Mobile-first approach with Vuetify components
- **Performance Optimized**: SSG/SSR with optimized asset loading

## 📂 Project Structure

```
seed/
├── app.vue                    # Root application component
├── nuxt.config.ts            # Nuxt configuration with Isomorphic Forest modules
├── static.config.ts          # Application configuration
│
├── pages/                    # Nuxt pages (auto-routing)
│   ├── people/
│   │   ├── index.vue        # People listing using ListOrganismsList
│   │   └── [slug].vue       # Individual person page
│   ├── activities/
│   │   └── events/
│   │       └── index.vue    # Events listing
│   ├── about/               # Institutional pages
│   └── [...all].vue        # Catch-all dynamic routing
│
├── components/              # Custom components extending Isomorphic Forest
│   ├── people/             # People-specific components
│   ├── home/               # Homepage components
│   ├── navigation/         # Site navigation
│   └── misc/               # Utility components
│
├── layouts/                # Nuxt layouts
├── plugins/                # Nuxt plugins
├── composables/            # Custom composables
└── translations/           # I18n translation files
```

## 🔧 Isomorphic Forest Module Integration

### List Module Integration

Seed showcases the power of the list module with minimal configuration:

```vue
<!-- pages/people/index.vue -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <PeopleListHeader v-if="route.query.groups" />
        <ListOrganismsList type="people" />
      </v-col>
    </v-row>
  </v-container>
</template>
```

#### Nuxt Configuration for Lists

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    "@paris-ias/list",
    // ... other modules
  ],
  list: {
    modules: [
      "events",
      "news",
      "people",
      "projects",
      "fellowships",
      "publications",
    ],
  },
})
```

### Individual Item Pages

Seed demonstrates fetching individual items using the list module's composables:

```vue
<!-- pages/people/[slug].vue -->
<template>
  <v-container>
    <PeopleView :item="people" :loading />
  </v-container>
</template>

<script setup>
const { fetchItem } = useFetchItem()

const { data: people } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.people.get,
    key: "getPeople",
  })
})
</script>
```

## 🌐 Internationalization

Seed implements comprehensive i18n support:

```typescript
// nuxt.config.ts
i18n: {
  langDir: "../translations/",
  locales: [
    { code: "en", iso: "en-US", file: "en.json" },
    { code: "fr", iso: "fr-FR", file: "fr.json" }
  ],
  defaultLocale: "en",
  strategy: "prefix_except_default"
}
```

## 🚀 Performance Optimization

### Server-Side Rendering (SSR)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
})
```

### Performance Features

- **Lazy Loading**: Components and images loaded on demand
- **Code Splitting**: Automatic route-based code splitting
- **Asset Optimization**: Automatic asset compression and optimization
- **Caching**: GraphQL query caching for improved performance
- **Prefetching**: Smart prefetching of likely navigation targets

## 🛠️ Development Workflow

### Local Development

```bash
# Install dependencies
yarn install

# Generate configuration from templates
yarn template

# Start development server
yarn dev

# Build for production
yarn build

# Generate static site
yarn generate
```

### Infrastructure as Code

```bash
# Deploy infrastructure (development)
yarn deploy:infra

# Deploy to staging
yarn deploy:infra:stage

# Deploy to production
yarn deploy:infra:prod
```

## 🤝 Isomorphic Forest Ecosystem Integration

Seed demonstrates the full power of the Isomorphic Forest ecosystem:

- **[@paris-ias/trees](../trees)**: Provides all academic data models and schemas
- **[@paris-ias/list](../list)**: Powers all content listing pages with zero configuration
- **[@paris-ias/form](../Apex/frontend/modules/form)**: Enables content creation and editing forms

## 🎯 Key Success Factors

### Convention Over Configuration

Seed demonstrates how Isomorphic Forest's conventions eliminate configuration:

- **Automatic Routing**: File-based routing with dynamic segments
- **Component Auto-loading**: Global component registration
- **Store Generation**: Automatic Pinia store creation
- **GraphQL Integration**: Zero-config GraphQL client setup

### Data-Driven UI

All UI elements are generated from data model definitions:

- **Lists**: Automatically generated from list trees
- **Forms**: Dynamic forms from form trees
- **Validation**: Client/server validation from rules
- **I18n**: Multi-language support from field definitions

Seed serves as both a production application and a reference implementation for building academic websites with the Isomorphic Forest architecture, demonstrating how minimal configuration can yield maximum functionality.
