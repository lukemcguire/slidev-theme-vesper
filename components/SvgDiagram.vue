<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { hasUnsafeSvgContent, isRemoteOrDataUrl, isSvgPath, looksLikeSvg } from './svgSafety'

const props = defineProps<{ src: string }>()
const svgContent = ref('')

async function load(src: string) {
  svgContent.value = ''
  if (!src || isRemoteOrDataUrl(src)) return

  try {
    const res = await fetch(src)
    if (!res.ok) return

    const contentType = res.headers.get('content-type') ?? ''
    const text = await res.text()
    const pathLooksSvg = isSvgPath(src)

    if (!pathLooksSvg && contentType && !contentType.includes('image/svg+xml')) return
    if (!looksLikeSvg(text) || hasUnsafeSvgContent(text)) return

    svgContent.value = text
  } catch {
    svgContent.value = ''
  }
}

onMounted(() => load(props.src))
watch(() => props.src, load)
</script>

<template>
  <div class="svg-diagram" v-html="svgContent" />
</template>

<style scoped>
.svg-diagram {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-diagram :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
