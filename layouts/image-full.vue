<!-- Layout: image-full — Full-bleed background image with gradient overlay and text block bottom-left -->
<script setup lang="ts">
import Banner from '../components/Banner.vue'
import VesperImage from '../components/VesperImage.vue'

defineProps<{
  sectionNumber?: string
  bannerText?: string
  image?: string
  imageMode?: 'auto' | 'img' | 'svg'
  imageClass?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="slidev-layout layout-image-full">
    <!-- Background image slot -->
    <div class="if-bg">
      <VesperImage
        v-if="image"
        :src="image"
        :mode="imageMode ?? 'auto'"
        :image-class="imageClass"
      />
      <slot v-else name="image">
        <div class="if-bg-placeholder"></div>
      </slot>
    </div>

    <!-- Gradient overlay -->
    <div class="if-overlay"></div>

    <!-- Optional banner on top -->
    <Banner v-if="bannerText" :text="bannerText" class="if-banner" />

    <!-- Text block anchored bottom-left -->
    <div class="if-text-block">
      <div class="if-text-rule"></div>
      <div class="if-title">
        <slot />
      </div>
      <div v-if="$slots.subtitle || subtitle" class="if-subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-image-full {
  padding: 0;
  position: relative;
  overflow: hidden;
}

.if-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.if-bg :deep(img),
.if-bg :deep(.svg-diagram) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.85);
}

.if-bg-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-rule) 0%, var(--vp-surface1) 100%);
}

.if-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(14, 14, 26, 0.88) 0%,
    rgba(14, 14, 26, 0.45) 50%,
    rgba(14, 14, 26, 0.10) 100%
  );
}

.if-banner {
  position: relative;
  z-index: 3;
}

.if-text-block {
  position: absolute;
  bottom: 40px;
  left: 48px;
  right: 200px;
  z-index: 2;
}

.if-text-rule {
  height: 3px;
  width: 60px;
  background: var(--color-fg-muted);
  margin-bottom: var(--space-3);
}

.if-title {
  font-family: var(--font-heading);
  color: var(--color-fg-muted);
  font-size: clamp(1.6rem, 3.2vw, 2.6rem);
  font-weight: 900;
  line-height: 1.1;
  margin: 0 0 var(--space-3);
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.if-title :deep(h1),
.if-title :deep(h2),
.if-title :deep(p) {
  color: var(--color-fg-muted);
  font-family: var(--font-heading);
  font-size: inherit;
  font-weight: 900;
  margin: 0;
}

.if-subtitle {
  font-family: var(--font-body);
  color: var(--color-bg-panel);
  font-size: var(--text-md);
}
</style>
