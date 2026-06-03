<template>
  <MiscMoleculesSection
    :title="capitalize($t('items.news', 2))"
    markdown-file="resources/news/news"
    type="publications"
    path-prefix="resources-news-slug"
  />
</template>
