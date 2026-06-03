<!-- Layout: section — Chapter/section divider with ghosted large section number behind title -->
<script setup lang="ts">
import VesperFooter from '../components/VesperFooter.vue'

defineProps<{
  sectionNumber?: string
  descriptor?: string
}>()
</script>

<template>
  <div class="slidev-layout layout-section">
    <div class="section-body">
      <div class="section-top-rule"></div>

      <div v-if="sectionNumber" class="section-id vp-label">SECTION {{ sectionNumber }}</div>

      <div class="section-content">
        <slot />
      </div>

      <div v-if="$slots.descriptor || descriptor" class="section-descriptor">
        <slot name="descriptor">{{ descriptor }}</slot>
      </div>

      <div class="section-bottom-rule"></div>
    </div>

    <VesperFooter
      :section-number="sectionNumber ?? '1'"

    />
  </div>
</template>

<style scoped>
.layout-section {
  display: flex;
  flex-direction: column;
  background: var(--color-bg) !important;
  position: relative;
  overflow: hidden;
  padding: 0;
}

.section-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-4) var(--space-8);
  position: relative;
  z-index: 1;
}

.section-top-rule {
  height: var(--rule-thick);
  background: var(--color-accent);
  width: 80px;
  margin-bottom: var(--space-4);
}

.section-id {
  color: var(--color-rule-light);
  margin-bottom: var(--space-3);
  letter-spacing: var(--tracking-widest);
}

.section-content {
  max-width: 70%;
}

.section-descriptor {
  font-family: var(--font-body);
  font-size: var(--text-md);
  color: var(--color-fg-muted);
  max-width: 60%;
  line-height: 1.5;
}

.section-bottom-rule {
  height: 1px;
  background: var(--color-rule-light);
  margin-top: var(--space-5);
  max-width: 70%;
}

/* ── Dark Mode ────────────────────────────────────────────────────────────── */
:global(.dark) .section-id {
  color: var(--color-rule-light);
}

:global(.dark) .section-bottom-rule {
  background: var(--color-rule);
}
</style>
