<!-- Layout: three-column — Three equal panels each with its own header slot -->
<script setup lang="ts">
import VesperHeader from '../components/VesperHeader.vue'
import VesperFooter from '../components/VesperFooter.vue'

defineProps<{
  title?: string
  col1Header?: string
  col2Header?: string
  col3Header?: string
  sectionNumber?: string
}>()
</script>

<template>
  <div class="slidev-layout layout-three-column">
    <VesperHeader
      :title="title ?? ''"
      :section-number="sectionNumber ?? ''"

    />

    <div class="thc-body">
      <div v-if="title" class="thc-title-bar">
        <div class="thc-rule"></div>
        <h2 class="thc-title">{{ title }}</h2>
      </div>

      <div class="thc-columns">
        <!-- Column 1 -->
        <div class="thc-col">
          <div class="thc-col-header">
            <slot name="header1">{{ col1Header ?? 'SECTION A' }}</slot>
          </div>
          <div class="thc-col-content">
            <slot name="left">
              <slot name="col1">
                <slot />
              </slot>
            </slot>
          </div>
        </div>

        <div class="thc-divider"></div>

        <!-- Column 2 -->
        <div class="thc-col">
          <div class="thc-col-header">
            <slot name="header2">{{ col2Header ?? 'SECTION B' }}</slot>
          </div>
          <div class="thc-col-content">
            <slot name="center">
              <slot name="col2" />
            </slot>
          </div>
        </div>

        <div class="thc-divider"></div>

        <!-- Column 3 -->
        <div class="thc-col">
          <div class="thc-col-header">
            <slot name="header3">{{ col3Header ?? 'SECTION C' }}</slot>
          </div>
          <div class="thc-col-content">
            <slot name="right">
              <slot name="col3" />
            </slot>
          </div>
        </div>
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-three-column {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.thc-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-6) var(--space-2);
  overflow: hidden;
}

.thc-title-bar {
  flex-shrink: 0;
  margin-bottom: var(--space-3);
}

.thc-rule {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin-bottom: var(--space-2);
}

.thc-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 900;
  margin: 0;
  line-height: 1.1;
}

.thc-columns {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0;
  overflow: hidden;
  min-height: 0;
}

.thc-col {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.thc-col-header {
  font-family: var(--font-condensed-sans);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-fg-muted);
  background: var(--color-rule);
  padding: var(--space-2) var(--space-3);
  margin-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-rule-light);
  flex-shrink: 0;
}

.thc-col-content {
  flex: 1;
  overflow: hidden;
  padding: 0 var(--space-4);
}

.thc-divider {
  width: 1px;
  background: var(--color-fg-subtle);
  margin: 0 var(--space-2);
  flex-shrink: 0;
}
</style>
