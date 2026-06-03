<!-- Layout: timeline — CSS-only horizontal or vertical timeline with military stencil aesthetic -->
<script setup lang="ts">
import VesperHeader from '../components/VesperHeader.vue'
import VesperFooter from '../components/VesperFooter.vue'
import TimelineEntry from '../components/TimelineEntry.vue'

type TimelineItem = {
  date?: string
  title?: string
  description?: string
}

defineProps<{
  title?: string
  sectionNumber?: string
  direction?: 'horizontal' | 'vertical'
  items?: TimelineItem[]
}>()
</script>

<template>
  <div class="slidev-layout layout-timeline">
    <VesperHeader
      :title="title ?? ''"
      :section-number="sectionNumber ?? ''"

    />

    <div class="tl-body">
      <div v-if="title" class="tl-title-bar">
        <div class="tl-rule"></div>
        <h2 class="tl-title">{{ title }}</h2>
      </div>

      <div :class="['tl-track', direction === 'vertical' ? 'tl-track--vertical' : 'tl-track--horizontal']">
        <slot>
          <TimelineEntry
            v-for="item in items ?? [{ date: 'T+0', title: 'Entry One', description: 'Description goes here' }]"
            :key="`${item.date ?? ''}-${item.title ?? ''}`"
            :date="item.date"
            :title="item.title"
            :description="item.description"
          />
        </slot>
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-timeline {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.tl-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6) var(--space-2);
  overflow: hidden;
}

.tl-title-bar {
  flex-shrink: 0;
  margin-bottom: var(--space-3);
}

.tl-rule {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin-bottom: var(--space-3);
}

.tl-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 900;
  margin: 0;
  line-height: 1.1;
}

/* ── Horizontal track ─────────────────────────────────────────────────────── */
.tl-track--horizontal {
  margin: auto 0;
  display: flex;
  align-items: flex-start;
  gap: 0;
  overflow-x: auto;
  position: relative;
  padding-top: var(--space-6);
}

/* The horizontal spine rule */
.tl-track--horizontal::before {
  content: '';
  position: absolute;
  top: calc(var(--space-6) + 6px); /* center of dot */
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-rule);
}

.tl-track--horizontal :deep(.tl-entry) {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 130px;
  position: relative;
}

.tl-track--horizontal :deep(.tl-entry-marker) {
  flex-shrink: 0;
  margin-bottom: var(--space-3);
  z-index: 1;
}

.tl-track--horizontal :deep(.tl-entry-body) {
  text-align: center;
  padding: 0 var(--space-2);
}

/* ── Vertical track ───────────────────────────────────────────────────────── */
.tl-track--vertical {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  position: relative;
  padding-left: 60px;
}

.tl-track--vertical::before {
  content: '';
  position: absolute;
  left: 26px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-rule);
}

.tl-track--vertical :deep(.tl-entry) {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
  position: relative;
}

.tl-track--vertical :deep(.tl-entry-marker) {
  position: absolute;
  left: -38px;
  top: 2px;
}

.tl-track--vertical :deep(.tl-entry-body) {
  flex: 1;
}

/* ── Shared entry parts ───────────────────────────────────────────────────── */
:deep(.tl-entry-dot) {
  width: 14px;
  height: 14px;
  border: 2px solid var(--vp-red);
  background: var(--color-bg);
  position: relative;
}

/* Inner dot */
:deep(.tl-entry-dot)::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5px;
  height: 5px;
  background: var(--vp-red);
}

:deep(.tl-entry-date) {
  color: var(--vp-red);
  letter-spacing: var(--tracking-widest);
  margin-bottom: var(--space-1);
}

:deep(.tl-entry-title) {
  font-family: var(--font-heading);
  font-size: var(--text-md);
  font-weight: 700;
  color: var(--color-fg);
  margin-bottom: var(--space-1);
  line-height: 1.2;
}

:deep(.tl-entry-desc) {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
  line-height: 1.5;
}
</style>
