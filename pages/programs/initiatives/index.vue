<template>
  <MiscMoleculesSection
    :title="capitalize($t('items.initiatives', 2))"
    markdown-file="programs/initiatives/initiatives"
    type="projects"
    path-prefix="programs-initiatives-slug"
    modifier="initiatives"
  />
</template>
