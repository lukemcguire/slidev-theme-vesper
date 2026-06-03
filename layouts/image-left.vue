<!-- Layout: image-left — Mirror of image-right: bracketed image frame 45% left, text 55% right -->
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
  <div class="slidev-layout layout-image-left">
    <VesperHeader
      :title="title ?? ''"
      :section-number="sectionNumber ?? ''"

    />

    <div class="il-body">
      <!-- Left image column -->
      <div class="il-image-col">
        <div class="il-image-frame vp-bracketed">
          <span class="vp-bracket-bl"></span>
          <span class="vp-bracket-br"></span>
          <VesperImage
            v-if="image"
            :src="image"
            :mode="imageMode ?? 'auto'"
            :image-class="imageClass"
          />
          <slot v-else name="image">
            <div class="il-image-placeholder">
              <span class="il-placeholder-label vp-label">IMAGE</span>
            </div>
          </slot>
        </div>
        <FigureCaption :number="figNumber ?? ''" :label="figLabel ?? ''" />
        <div v-if="$slots.caption || caption" class="il-caption">
          <slot name="caption">{{ caption }}</slot>
        </div>
      </div>

      <!-- Right text column -->
      <div class="il-text">
        <div v-if="title" class="il-rule"></div>
        <h2 v-if="title" class="il-title">{{ title }}</h2>
        <div class="il-content">
          <slot />
        </div>
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-image-left {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.il-body {
  flex: 1;
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-6) var(--space-3);
  overflow: hidden;
  min-height: 0;
}

.il-image-col {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.il-image-frame {
  flex: 1;
  border: var(--rule-thick) solid var(--color-rule);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
}

.il-image-frame :deep(img),
.il-image-frame :deep(.svg-diagram) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.il-image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--vp-surface1);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
}

.il-placeholder-label {
  color: var(--color-rule-light);
  letter-spacing: var(--tracking-widest);
}

.il-caption {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-subtle);
  margin-top: var(--space-1);
}

.il-text {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.il-rule {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin-bottom: var(--space-3);
}

.il-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 900;
  color: var(--color-fg);
  margin: 0 0 var(--space-4);
  line-height: 1.1;
}

.il-content {
  flex: 1;
  overflow: hidden;
}
</style>
