<!-- Layout: cover — Full-bleed title slide with accent banners and corner bracket frame -->
<script setup lang="ts">
import Banner from '../components/Banner.vue'

defineProps<{
  date?: string
  bannerText?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="slidev-layout layout-cover">
    <!-- Accent banner top -->
    <Banner :text="bannerText" />

    <!-- Main content area -->
    <div class="cover-body">
      <div class="cover-frame">
        <!-- Bracket corners -->
        <span class="cover-frame__tl"></span>
        <span class="cover-frame__tr"></span>
        <span class="cover-frame__bl"></span>
        <span class="cover-frame__br"></span>

        <!-- Thick top rule -->
        <div class="cover-rule-top"></div>

        <!-- Title -->
        <h1 class="cover-title">
          <slot name="title">
            <slot />
          </slot>
        </h1>

        <!-- Sub-rule -->
        <div class="cover-rule-mid"></div>

        <!-- Subtitle -->
        <div v-if="$slots.subtitle || subtitle" class="cover-subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>

        <!-- Date -->
        <div class="cover-meta">
          <span class="cover-date vp-label">{{ date ?? '' }}</span>
          <slot name="meta" />
        </div>
      </div>
    </div>

    <!-- Accent banner bottom -->
    <Banner :text="bannerText" />
  </div>
</template>

<style scoped>
.layout-cover {
  background: var(--color-bg) !important;
  display: flex;
  flex-direction: column;
  color: var(--color-fg);
  padding: 0;
  position: relative;
}

.cover-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6) var(--space-8);
  position: relative;
  z-index: 2;
}

.cover-frame {
  width: 100%;
  max-width: 800px;
  padding: var(--space-6) var(--space-7);
  position: relative;
  border: 1px solid var(--vp-overlay1-alpha);
}

/* Corner brackets */
.cover-frame__tl,
.cover-frame__tr,
.cover-frame__bl,
.cover-frame__br {
  position: absolute;
  width: 20px;
  height: 20px;
}

.cover-frame__tl {
  top: -2px; left: -2px;
  border-top: 2px solid var(--color-accent);
  border-left: 2px solid var(--color-accent);
}

.cover-frame__tr {
  top: -2px; right: -2px;
  border-top: 2px solid var(--color-accent);
  border-right: 2px solid var(--color-accent);
}

.cover-frame__bl {
  bottom: -2px; left: -2px;
  border-bottom: 2px solid var(--color-accent);
  border-left: 2px solid var(--color-accent);
}

.cover-frame__br {
  bottom: -2px; right: -2px;
  border-bottom: 2px solid var(--color-accent);
  border-right: 2px solid var(--color-accent);
}

.cover-rule-top {
  height: 4px;
  background: var(--color-accent);
  margin-bottom: var(--space-5);
}

.cover-title {
  font-family: var(--font-condensed-sans);
  font-size: clamp(2.4rem, 5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.0;
  color: var(--color-fg);
  letter-spacing: 0.04em;
  margin: 0 0 var(--space-5);
  text-transform: uppercase;
}

.cover-rule-mid {
  height: 2px;
  background: var(--color-rule);
  margin-bottom: var(--space-4);
}

.cover-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-md);
  color: var(--color-fg);
  margin-bottom: var(--space-4);
  line-height: 1.4;
}

.cover-meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.cover-date {
  color: var(--color-fg);
  letter-spacing: var(--tracking-widest);
}

</style>
