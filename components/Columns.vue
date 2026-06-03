<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()
const hasThirdColumn = computed(() => !!(slots.col3 || slots.center))
</script>

<template>
  <div :class="['vp-columns', { 'vp-columns--three': hasThirdColumn }]">
    <div class="vp-columns__col">
      <slot name="col1">
        <slot name="left">
          <slot />
        </slot>
      </slot>
    </div>

    <div class="vp-columns__divider"></div>

    <div class="vp-columns__col">
      <slot name="col2">
        <slot :name="hasThirdColumn ? 'center' : 'right'" />
      </slot>
    </div>

    <template v-if="hasThirdColumn">
      <div class="vp-columns__divider"></div>
      <div class="vp-columns__col">
        <slot name="col3">
          <slot name="right" />
        </slot>
      </div>
    </template>
  </div>
</template>

<style scoped>
.vp-columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 0;
  min-height: 0;
  margin: var(--space-3) 0;
}

.vp-columns--three {
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
}

.vp-columns__col {
  min-width: 0;
  overflow: hidden;
  padding: 0 var(--space-4);
}

.vp-columns__col:first-child {
  padding-left: 0;
}

.vp-columns__col:last-child {
  padding-right: 0;
}

.vp-columns__divider {
  width: 1px;
  background: var(--color-fg-subtle);
  position: relative;
}

.vp-columns__divider::after {
  content: '◆';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-rule-light);
  font-size: 8px;
  background: var(--color-bg);
  padding: 2px 0;
}

.vp-columns__col :deep(h2) {
  font-family: var(--font-condensed-sans);
  font-size: inherit;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  line-height: 1.15;
  color: var(--color-fg);
  border-top: var(--rule-thin) solid var(--color-rule);
  border-bottom: var(--rule-thin) solid var(--color-rule);
  padding: var(--space-2) 0;
  margin: 0 0 var(--space-4);
}
</style>
