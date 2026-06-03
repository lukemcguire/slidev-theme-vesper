<script setup lang="ts">
defineProps<{
  columns?: string | number
}>()

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function frontmatter(route: any) {
  return route?.meta?.slide?.frontmatter ?? {}
}

function isTocRoute(route: any) {
  const slide = route?.meta?.slide
  return !!slide?.title && !slide?.frontmatter?.hideInToc
}

function isChapter(route: any) {
  return route?.meta?.layout === 'section' || frontmatter(route).layout === 'section'
}

function sectionLabel(route: any) {
  const sectionNumber = frontmatter(route).sectionNumber
  if (sectionNumber === undefined || sectionNumber === null || sectionNumber === '')
    return String(route?.no ?? '')
  return isChapter(route) ? `CH. ${sectionNumber}` : String(sectionNumber)
}

function displayTitle(route: any) {
  const title = String(route?.meta?.slide?.title ?? '')
  const sectionNumber = frontmatter(route).sectionNumber
  if (!sectionNumber) return title

  return title
    .replace(new RegExp(`^${escapeRegExp(String(sectionNumber))}[.)]?[\\s:—–-]*`, 'i'), '')
    .trim()
}
</script>

<template>
  <div class="vp-toc" :style="{ '--toc-columns': String(columns ?? 2) }">
    <div
      v-for="route in ($nav?.slides ?? []).filter(isTocRoute)"
      :key="route.no"
      :class="['vp-toc-entry', { 'vp-toc-entry--chapter': isChapter(route) }]"
    >
      <span class="vp-toc-entry__section">{{ sectionLabel(route) }}</span>
      <Link class="vp-toc-entry__title" :to="`/${route.no}`">
        {{ displayTitle(route) }}
      </Link>
      <span class="vp-toc-entry__leaders"></span>
      <span class="vp-toc-entry__page">{{ route.no }}</span>
    </div>
  </div>
</template>

<style scoped>
.vp-toc {
  column-count: var(--toc-columns);
  column-gap: var(--space-7);
  flex: 1;
  min-height: 0;
}

.vp-toc-entry {
  break-inside: avoid;
  display: grid;
  grid-template-columns: 58px auto 1fr 32px;
  gap: var(--space-2);
  align-items: baseline;
  padding: 0.17rem 0;
  border-bottom: 1px dotted var(--vp-surface1);
}

.vp-toc-entry__section {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: var(--tracking-wide);
  white-space: nowrap;
}

.vp-toc-entry__title {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-fg);
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.vp-toc-entry__leaders {
  align-self: center;
  border-bottom: 2px dotted var(--color-bg-panel);
  min-width: 12px;
}

.vp-toc-entry__page {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-muted);
  text-align: right;
}

.vp-toc-entry--chapter {
  background: var(--vp-surface0-alpha);
  border-bottom: 1px solid var(--color-rule-light);
  padding: 0.25rem var(--space-2);
  margin-top: var(--space-1);
}

.vp-toc-entry--chapter:first-child {
  margin-top: 0;
}

.vp-toc-entry--chapter .vp-toc-entry__title {
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-fg-muted);
}
</style>
