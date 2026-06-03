<!-- Alias for layout: three-column -->
<script setup lang="ts">
import ThreeColumn from './three-column.vue'
</script>

<template>
  <ThreeColumn v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template>
  </ThreeColumn>
</template>
