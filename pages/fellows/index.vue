<template>
  <MiscMoleculesSection
    :title="capitalize($t('items.fellow', 2))"
    markdown-file="fellows/fellows"
    type="people"
    path-prefix="fellows-slug"
  />
</template>
