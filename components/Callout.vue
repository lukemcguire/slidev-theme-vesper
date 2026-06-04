<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type?: 'warning' | 'note' | 'caution' | 'important'
  title?: string
}>()

const typeConfig = computed(() => {
  switch (props.type) {
    case 'warning':
      return { label: 'WARNING',   icon: '⚠', colorClass: 'callout--warning'   }
    case 'caution':
      return { label: 'CAUTION',   icon: '△', colorClass: 'callout--caution'   }
    case 'important':
      return { label: 'IMPORTANT', icon: '★', colorClass: 'callout--important' }
    default:
      return { label: 'NOTE',      icon: 'i', colorClass: 'callout--note'      }
  }
})
</script>

<template>
  <div :class="['vp-callout-box', typeConfig.colorClass]">
    <div class="callout-header">
      <span class="callout-icon">{{ typeConfig.icon }}</span>
      <span class="callout-label vp-label">{{ title || typeConfig.label }}</span>
    </div>
    <div class="callout-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.vp-callout-box {
  --callout-accent: var(--color-rule);
  border: 2px dashed var(--callout-accent);
  background: color-mix(in srgb, var(--callout-accent) 10%, transparent);
  padding: 0;
  position: relative;
  overflow: hidden;
  margin-bottom: var(--space-3);
  display: flex;
  flex-direction: column;
}

.vp-callout-box:last-child {
  margin-bottom: 0;
}

/* Type variants */
.callout--warning   { --callout-accent: var(--vp-red); }
.callout--note      { --callout-accent: var(--vp-blue); }
.callout--caution   { --callout-accent: var(--vp-peach); }
.callout--important { --callout-accent: var(--vp-mauve); }

/* Header bar */
.callout-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4) var(--space-1);
  border-bottom: 1px dashed var(--callout-accent);
  background: color-mix(in srgb, var(--callout-accent) 15%, transparent);
}

.callout-icon {
  font-size: var(--text-md);
  flex-shrink: 0;
  line-height: 1;
  color: var(--callout-accent);
}

.callout-label {
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--callout-accent);
}

/* Content */
.callout-body {
  padding: var(--space-1) var(--space-4) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
  line-height: 1.6;
}
</style>
