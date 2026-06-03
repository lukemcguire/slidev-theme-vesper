<!-- Layout: end — Final slide with closing treatment and optional contact block -->
<script setup lang="ts">
import { computed } from 'vue'
import Banner from '../components/Banner.vue'

const props = defineProps<{
  contact?: string
  photo?: string
  subtitle?: string
  bannerText?: string
  endTitle?: string
}>()

const contactLines = computed(() =>
  (props.contact ?? '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
)
</script>

<template>
  <div class="slidev-layout layout-end">
    <Banner :text="bannerText" />

    <div class="end-body">
      <!-- Presenter photo (optional) -->
      <div v-if="photo" class="end-photo-wrap">
        <img :src="photo" alt="Presenter photo" class="end-photo" />
      </div>

      <div class="end-text">
        <div class="end-rule-top"></div>
        <div v-if="subtitle" class="end-subtitle vp-label">
          {{ subtitle }}
        </div>
        <h1 class="end-title">
          <slot name="title">{{ endTitle ?? 'Thank You' }}</slot>
        </h1>
        <div class="end-rule-mid"></div>
        <div class="end-contact">
          <slot name="contact">
            <p v-for="line in contactLines" :key="line">{{ line }}</p>
          </slot>
        </div>
      </div>
    </div>

    <Banner :text="bannerText" />
  </div>
</template>

<style scoped>
.layout-end {
  display: flex;
  flex-direction: column;
  background: var(--color-bg) !important;
  color: var(--color-fg);
  padding: 0;
}

.end-body {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-6) var(--space-8);
}

.end-photo-wrap {
  flex-shrink: 0;
}

.end-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  display: block;
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 0 6px var(--vp-surface0-alpha);
}

.end-text {
  width: 100%;
  max-width: 560px;
}

.end-rule-top {
  height: 3px;
  background: var(--color-accent);
  margin-bottom: var(--space-4);
}

.end-subtitle {
  color: var(--color-fg-subtle);
  letter-spacing: var(--tracking-widest);
  margin-bottom: var(--space-4);
}

.end-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 700;
  color: var(--color-fg);
  margin: 0 0 var(--space-5);
  line-height: 1.05;
}

.end-rule-mid {
  height: 1px;
  background: var(--color-rule);
  margin-bottom: var(--space-4);
}

.end-contact {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-fg-muted);
  line-height: 1.7;
}
</style>
