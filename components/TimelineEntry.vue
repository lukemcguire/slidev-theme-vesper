<script setup lang="ts">
defineProps<{
  date?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="tl-entry">
    <div class="tl-entry-marker">
      <div class="tl-entry-dot"></div>
    </div>
    <div class="tl-entry-body">
      <div v-if="date" class="tl-entry-date vp-label">{{ date }}</div>
      <div v-if="title" class="tl-entry-title">{{ title }}</div>
      <div v-if="$slots.default || description" class="tl-entry-desc">
        <slot>{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
