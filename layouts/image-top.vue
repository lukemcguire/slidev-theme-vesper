<!-- Layout: image-top — Image spans full width top ~40%, content below with FIG. caption treatment -->
<script setup lang="ts">
import VesperHeader from '../components/VesperHeader.vue'
import VesperFooter from '../components/VesperFooter.vue'
import FigureCaption from '../components/FigureCaption.vue'
import VesperImage from '../components/VesperImage.vue'

defineProps<{
  title?: string
  sectionNumber?: string
  figNumber?: string | number
  figLabel?: string
  image?: string
  imageMode?: 'auto' | 'img' | 'svg'
  imageClass?: string
  caption?: string
}>()
</script>

<template>
  <div class="slidev-layout layout-image-top">
    <VesperHeader
      :title="title ?? ''"
      :section-number="sectionNumber ?? ''"

    />

    <!-- Top image band -->
    <div class="it-image-band">
      <div class="it-image-frame">
        <VesperImage
          v-if="image"
          :src="image"
          :mode="imageMode ?? 'auto'"
          :image-class="imageClass"
        />
        <slot v-else name="image">
          <div class="it-placeholder">
            <span class="vp-label" style="color: var(--color-rule-light); letter-spacing: var(--tracking-widest);">IMAGE</span>
          </div>
        </slot>
      </div>
      <FigureCaption :number="figNumber ?? '1'" :label="figLabel ?? ''" />
      <div v-if="$slots.caption || caption" class="it-caption">
        <slot name="caption">{{ caption }}</slot>
      </div>
    </div>

    <!-- Divider rule -->
    <div class="it-divider"></div>

    <!-- Bottom content area -->
    <div class="it-content">
      <h2 v-if="title" class="it-title">{{ title }}</h2>
      <div class="it-body">
        <slot />
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-image-top {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.it-image-band {
  height: 42%;
  flex-shrink: 0;
  padding: var(--space-3) var(--space-6) 0;
}

.it-image-frame {
  height: calc(100% - 1.6rem);
  border: var(--rule-thick) solid var(--color-rule);
  overflow: hidden;
}

.it-image-frame :deep(img),
.it-image-frame :deep(.svg-diagram) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.it-caption {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-subtle);
  margin-top: var(--space-1);
}

.it-placeholder {
  width: 100%;
  height: 100%;
  background: var(--vp-surface1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.it-divider {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin: 0 var(--space-6);
}

.it-content {
  flex: 1;
  padding: var(--space-3) var(--space-6) var(--space-2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.it-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 900;
  color: var(--color-fg);
  margin: 0 0 var(--space-3);
  line-height: 1.1;
}

.it-body {
  flex: 1;
  overflow: hidden;
}
</style>
