<!-- Layout: image-bottom — Content top, image bottom with figure caption -->
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
  <div class="slidev-layout layout-image-bottom">
    <VesperHeader
      :title="title ?? ''"
      :section-number="sectionNumber ?? ''"

    />

    <!-- Top content area -->
    <div class="ib-content">
      <div v-if="title" class="ib-rule"></div>
      <h2 v-if="title" class="ib-title">{{ title }}</h2>
      <div class="ib-body">
        <slot />
      </div>
    </div>

    <!-- Divider -->
    <div class="ib-divider"></div>

    <!-- Bottom image band -->
    <div class="ib-image-band">
      <div class="ib-image-frame">
        <VesperImage
          v-if="image"
          :src="image"
          :mode="imageMode ?? 'auto'"
          :image-class="imageClass"
        />
        <slot v-else name="image">
          <div class="ib-placeholder">
            <span class="vp-label" style="color: var(--color-rule-light);">IMAGE</span>
          </div>
        </slot>
      </div>
      <FigureCaption :number="figNumber ?? ''" :label="figLabel ?? ''" />
      <div v-if="$slots.caption || caption" class="ib-caption">
        <slot name="caption">{{ caption }}</slot>
      </div>
    </div>

    <VesperFooter :section-number="sectionNumber ?? ''" />
  </div>
</template>

<style scoped>
.layout-image-bottom {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.ib-content {
  flex: 1;
  padding: var(--space-3) var(--space-6);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ib-rule {
  height: var(--rule-thick);
  background: var(--color-rule);
  margin-bottom: var(--space-3);
}

.ib-title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 900;
  margin: 0 0 var(--space-3);
  line-height: 1.1;
}

.ib-body {
  flex: 1;
  overflow: hidden;
}

.ib-divider {
  height: var(--rule-mid);
  background: var(--color-rule);
  margin: 0 var(--space-6);
}

.ib-image-band {
  height: 38%;
  flex-shrink: 0;
  padding: 0 var(--space-6) var(--space-2);
}

.ib-image-frame {
  height: calc(100% - 1.4rem);
  border: var(--rule-thick) solid var(--color-rule);
  overflow: hidden;
}

.ib-image-frame :deep(img),
.ib-image-frame :deep(.svg-diagram) {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.ib-caption {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-fg-subtle);
  margin-top: var(--space-1);
}

.ib-placeholder {
  width: 100%;
  height: 100%;
  background: var(--vp-surface1);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
