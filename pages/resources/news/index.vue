<template>
  <MiscMoleculesSection
    :title="capitalize($t('items.news', 2))"
    markdown-file="resources__news__news"
    type="publications"
    path-prefix="resources-news-slug"
    modifier="news"
  />
</template>
