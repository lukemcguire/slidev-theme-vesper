<script setup lang="ts">
defineProps<{
  sectionNumber?: string
  date?: string
}>()
</script>

<template>
  <footer class="vp-footer">
    <div class="vp-footer__rule"></div>
    <div class="vp-footer__inner">
      <span class="vp-footer__section vp-section-id">
        {{ sectionNumber ?? '' }}
      </span>
      <span class="vp-footer__date vp-label">
        {{ date ?? $slidev?.configs?.date ?? '' }}
      </span>
      <span class="vp-footer__page vp-section-id">
        {{ $nav?.currentPage ?? '' }}
        <template v-if="$nav?.total"> / {{ $nav.total }}</template>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.vp-footer {
  flex-shrink: 0;
}

.vp-footer__rule {
  height: var(--rule-thick);
  background: var(--color-rule);
}

.vp-footer__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  padding: var(--space-2) var(--space-6);
  background: var(--color-bg-alt);
  gap: var(--space-4);
}

.vp-footer__section {
  color: var(--color-accent);
  font-weight: 600;
  justify-self: start;
}

.vp-footer__date {
  color: var(--color-fg-subtle);
  letter-spacing: 0.10em;
  text-align: center;
  justify-self: center;
}

.vp-footer__page {
  color: var(--color-fg-muted);
  justify-self: end;
}
</style>
