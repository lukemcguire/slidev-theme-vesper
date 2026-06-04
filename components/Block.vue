<script setup lang="ts">
defineProps<{
  type?: 'default' | 'info' | 'success' | 'warning' | 'danger' | 'example'
  title?: string
  compact?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'vp-block',
      `vp-block--${type ?? 'default'}`,
      { 'vp-block--compact': compact, 'vp-block--titled': !!title }
    ]"
  >
    <!-- Bottom corner brackets (top pair via ::before/::after) -->
    <span class="vp-block-bl"></span>
    <span class="vp-block-br"></span>

    <!-- Header bar (only when title is provided) -->
    <div v-if="title" class="vp-block__header">
      <span class="vp-block__title">{{ title }}</span>
      <span class="vp-block__badge">[ {{ (type ?? 'default').toUpperCase() }} ]</span>
    </div>

    <!-- Content -->
    <div class="vp-block__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* ── Block type accent colors ─────────────────────────────────────────────── */
.vp-block--default  { --block-accent: var(--vp-mauve); }
.vp-block--info     { --block-accent: var(--vp-blue); }
.vp-block--success  { --block-accent: var(--vp-green); }
.vp-block--warning  { --block-accent: var(--vp-yellow); }
.vp-block--danger   { --block-accent: var(--vp-red); }
.vp-block--example  { --block-accent: var(--vp-teal); }

/* ── Container ────────────────────────────────────────────────────────────── */
.vp-block {
  position: relative;
  border: 1px solid var(--block-accent);
  background: var(--color-bg-panel);
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-2);
  /* Corner brackets reuse the vp-bracketed system via --bracket-color */
  --bracket-color: var(--block-accent);
  --bracket-size: 12px;
  --bracket-weight: 2px;
}

.vp-block:last-child {
  margin-bottom: 0;
}

/* Top corner brackets via pseudo-elements */
.vp-block::before,
.vp-block::after {
  content: '';
  position: absolute;
  width: var(--bracket-size);
  height: var(--bracket-size);
  pointer-events: none;
  z-index: 10;
}

.vp-block::before {
  top: -1px;
  left: -1px;
  border-top: var(--bracket-weight) solid var(--bracket-color);
  border-left: var(--bracket-weight) solid var(--bracket-color);
}

.vp-block::after {
  top: -1px;
  right: -1px;
  border-top: var(--bracket-weight) solid var(--bracket-color);
  border-right: var(--bracket-weight) solid var(--bracket-color);
}

/* Bottom corner brackets */
.vp-block-bl,
.vp-block-br {
  position: absolute;
  width: var(--bracket-size);
  height: var(--bracket-size);
  pointer-events: none;
  z-index: 10;
}

.vp-block-bl {
  bottom: -1px;
  left: -1px;
  border-bottom: var(--bracket-weight) solid var(--bracket-color);
  border-left: var(--bracket-weight) solid var(--bracket-color);
}

.vp-block-br {
  bottom: -1px;
  right: -1px;
  border-bottom: var(--bracket-weight) solid var(--bracket-color);
  border-right: var(--bracket-weight) solid var(--bracket-color);
}

/* ── Header bar ───────────────────────────────────────────────────────────── */
.vp-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-2) var(--space-4);
  background: var(--block-accent);
  flex-shrink: 0;
}

.vp-block__title {
  font-family: var(--font-label);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.10em;
  text-transform: uppercase;
  color: var(--vp-base);
}

.vp-block__badge {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--vp-base);
  opacity: 0.75;
  padding: 1px 4px;
  border: 1px solid color-mix(in srgb, var(--vp-base) 30%, transparent);
}

/* ── Body ─────────────────────────────────────────────────────────────────── */
.vp-block__body {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-fg);
  line-height: 1.6;
}

.vp-block--compact .vp-block__body {
  padding: var(--space-1) var(--space-3);
}

/* Titleless variant: left accent border instead of header bar */
.vp-block:not(.vp-block--titled) .vp-block__body {
  border-left: 3px solid var(--block-accent);
  padding-left: calc(var(--space-4) - 3px);
}

/* ── Prose inside body ────────────────────────────────────────────────────── */
.vp-block__body :deep(p) {
  margin: 0 0 var(--space-2);
  font-size: var(--text-sm);
}

.vp-block__body :deep(p:last-child) {
  margin-bottom: 0;
}

.vp-block__body :deep(ul),
.vp-block__body :deep(ol) {
  margin: 0 0 var(--space-2);
}
</style>
