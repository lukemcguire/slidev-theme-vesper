<!-- Layout: table-of-contents — ToC with dot leaders and section numbers -->
<script setup lang="ts">
import VesperHeader from '../components/VesperHeader.vue'
import VesperFooter from '../components/VesperFooter.vue'
import VesperToc from '../components/VesperToc.vue'

defineProps<{
  title?: string
  sectionNumber?: string
  columns?: string | number
  showTitle?: boolean
}>()
</script>

<template>
  <div class="slidev-layout layout-toc">
    <VesperHeader
      :title="title ?? 'TABLE OF CONTENTS'"
      :section-number="sectionNumber ?? ''"

    />

    <div class="toc-body">
      <div class="toc-title-bar">
        <div class="toc-rule"></div>
        <h2 v-if="showTitle" class="toc-title">{{ title ?? 'TABLE OF CONTENTS' }}</h2>
        <div class="toc-col-headers">
          <span class="toc-col-section">SECTION</span>
          <span class="toc-col-title"></span>
          <span class="toc-col-page">PAGE</span>
        </div>
        <div class="toc-header-rule"></div>
      </div>

      <div class="toc-entries">
        <slot>
          <VesperToc :columns="columns ?? 2" />
        </slot>
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-toc {
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--color-bg) !important;
}

.toc-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-3) var(--space-6) var(--space-2);
  overflow: hidden;
}

.toc-title-bar {
  flex-shrink: 0;
  margin-bottom: var(--space-3);
}

.toc-rule {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin-bottom: var(--space-3);
}

.toc-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 900;
  margin: 0 0 var(--space-4);
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.toc-col-headers {
  display: grid;
  grid-template-columns: 60px 1fr 50px;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--color-rule-light);
  margin-bottom: var(--space-2);
}

.toc-col-page {
  text-align: right;
}

.toc-header-rule {
  height: 1px;
  background: var(--color-rule-light);
}

.toc-entries {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* ── ToC entry ────────────────────────────────────────────────────────────── */
:deep(.toc-entry) {
  display: grid;
  grid-template-columns: 60px auto 1fr 50px;
  gap: var(--space-3);
  align-items: baseline;
  padding: var(--space-1) 0;
  border-bottom: 1px dotted var(--vp-surface1);
}

:deep(.toc-entry-num) {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: var(--tracking-wide);
}

:deep(.toc-entry-title) {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-fg);
}

/* CSS dot leaders */
:deep(.toc-leaders) {
  align-self: center;
  border-bottom: 2px dotted var(--color-bg-panel);
  min-width: 20px;
}

:deep(.toc-entry-page) {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
  text-align: right;
  padding-right: var(--space-3);
}

/* Subsection entries — indented under chapter headings */
:deep(.toc-entry:not(.toc-entry--chapter)) {
  padding-left: var(--space-6);
}

/* Chapter-level entry (bold, elevated background) */
:deep(.toc-entry--chapter) {
  background: var(--vp-surface0-alpha);
  padding: var(--space-1) 0;
  padding-left: var(--space-3);
  border-bottom: 1px solid var(--color-rule-light);
}

:deep(.toc-entry--chapter .toc-entry-title) {
  font-weight: 700;
  color: var(--color-fg-muted);
  font-family: var(--font-heading);
  font-size: var(--text-md);
}
</style>
