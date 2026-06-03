<script setup lang="ts">
import { computed } from 'vue'
import SvgDiagram from './SvgDiagram.vue'

const props = defineProps<{
  src?: string
  mode?: 'auto' | 'img' | 'svg'
  imageClass?: string
  alt?: string
}>()

const assetUrls = import.meta.glob('/assets/**/*.{apng,avif,gif,jpeg,jpg,png,svg,webp}', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>

const resolvedSrc = computed(() => {
  const src = props.src
  if (!src || /^(?:https?:|data:)/.test(src)) return src

  const normalized = src.startsWith('/') ? src : src.startsWith('./') ? src.slice(1) : `/${src}`
  return assetUrls[normalized] ?? src
})

const renderAsSvg = computed(() => {
  if (!props.src) return false
  if (props.mode === 'svg') return true
  if (props.mode === 'img') return false
  return props.src.split(/[?#]/, 1)[0]?.toLowerCase().endsWith('.svg') ?? false
})
</script>

<template>
  <SvgDiagram
    v-if="src && renderAsSvg"
    :src="resolvedSrc"
    :class="imageClass"
  />
  <img
    v-else-if="src"
    :src="resolvedSrc"
    :class="imageClass"
    :alt="alt ?? ''"
  />
</template>
