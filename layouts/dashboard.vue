<!-- Layout: dashboard — 2×2 grid of labeled panels, each with metric/chart area and bottom caption -->
<script setup lang="ts">
import VesperHeader from '../components/VesperHeader.vue'
import VesperFooter from '../components/VesperFooter.vue'

defineProps<{
  title?: string
  sectionNumber?: string
  panel1Label?: string
  panel2Label?: string
  panel3Label?: string
  panel4Label?: string
  caption1?: string
  caption2?: string
  caption3?: string
  caption4?: string
}>()
</script>

<template>
  <div class="slidev-layout layout-dashboard">
    <VesperHeader
      :title="title ?? ''"
      :section-number="sectionNumber ?? ''"

    />

    <div class="db-body">
      <div v-if="title" class="db-title-bar">
        <div class="db-rule"></div>
        <h2 class="db-title">{{ title }}</h2>
      </div>

      <div class="db-grid">
        <!-- Panel 1 (top-left) -->
        <div class="db-panel">
          <div class="db-panel-header">
            <span class="db-panel-label vp-label">{{ panel1Label ?? 'METRIC 01' }}</span>
          </div>
          <div class="db-panel-content">
            <slot name="panel1">
              <div class="db-panel-placeholder"></div>
            </slot>
          </div>
          <div class="db-panel-footer">
            <slot name="caption1">{{ caption1 ?? '' }}</slot>
          </div>
        </div>

        <!-- Panel 2 (top-right) -->
        <div class="db-panel">
          <div class="db-panel-header">
            <span class="db-panel-label vp-label">{{ panel2Label ?? 'METRIC 02' }}</span>
          </div>
          <div class="db-panel-content">
            <slot name="panel2">
              <div class="db-panel-placeholder"></div>
            </slot>
          </div>
          <div class="db-panel-footer">
            <slot name="caption2">{{ caption2 ?? '' }}</slot>
          </div>
        </div>

        <!-- Panel 3 (bottom-left) -->
        <div class="db-panel">
          <div class="db-panel-header">
            <span class="db-panel-label vp-label">{{ panel3Label ?? 'METRIC 03' }}</span>
          </div>
          <div class="db-panel-content">
            <slot name="panel3">
              <div class="db-panel-placeholder"></div>
            </slot>
          </div>
          <div class="db-panel-footer">
            <slot name="caption3">{{ caption3 ?? '' }}</slot>
          </div>
        </div>

        <!-- Panel 4 (bottom-right) -->
        <div class="db-panel">
          <div class="db-panel-header">
            <span class="db-panel-label vp-label">{{ panel4Label ?? 'METRIC 04' }}</span>
          </div>
          <div class="db-panel-content">
            <slot name="panel4">
              <div class="db-panel-placeholder"></div>
            </slot>
          </div>
          <div class="db-panel-footer">
            <slot name="caption4">{{ caption4 ?? '' }}</slot>
          </div>
        </div>
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-dashboard {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.db-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6) var(--space-2);
  overflow: hidden;
  min-height: 0;
}

.db-title-bar {
  flex-shrink: 0;
  margin-bottom: var(--space-3);
}

.db-rule {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin-bottom: var(--space-2);
}

.db-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 900;
  margin: 0;
  line-height: 1.1;
}

.db-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--space-3);
  overflow: hidden;
  min-height: 0;
}

.db-panel {
  display: flex;
  flex-direction: column;
  border: var(--rule-mid) solid var(--color-rule);
  overflow: hidden;
  background: var(--color-bg-alt);
}

.db-panel-header {
  padding: var(--space-1) var(--space-3);
  background: var(--color-rule);
  border-bottom: 1px solid var(--color-rule-light);
  flex-shrink: 0;
}

.db-panel-label {
  color: var(--color-fg-muted);
  letter-spacing: var(--tracking-wider);
}

.db-panel-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  position: relative;
  background-image:
    linear-gradient(to right, var(--vp-surface0-alpha) 1px, transparent 1px),
    linear-gradient(to bottom, var(--vp-surface0-alpha) 1px, transparent 1px);
  background-size: 20px 20px;
}

.db-panel-placeholder {
  position: absolute;
  inset: 0;
}

.db-panel-placeholder::before {
  content: '';
  position: absolute;
  inset: 10% 10% 15% 10%;
  background: var(--vp-surface0-alpha);
  clip-path: polygon(
    0% 100%,
    0% 60%, 20% 60%,
    20% 35%, 40% 35%,
    40% 18%, 60% 18%,
    60% 42%, 80% 42%,
    80% 68%, 100% 68%,
    100% 100%
  );
}

.db-panel-placeholder::after {
  content: '';
  position: absolute;
  inset: 10% 10% 15% 10%;
  border-bottom: 1px solid var(--color-rule-light);
  border-left: 1px solid var(--color-rule-light);
}

.db-panel-footer {
  padding: var(--space-1) var(--space-3);
  border-top: 1px solid var(--vp-overlay1-alpha);
  font-family: var(--font-condensed-sans);
  font-size: var(--text-xs);
  text-transform: uppercase;
  color: var(--color-fg-subtle);
  letter-spacing: var(--tracking-wide);
  flex-shrink: 0;
  min-height: 1.4rem;
}
</style>
