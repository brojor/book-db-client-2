<script setup lang="ts">
defineProps<{
  title: string
  isActive: boolean
}>()
</script>

<template>
  <div
    px2 rounded m1 text="$color-text"
    :class="{ 'bg-$color-accent text-white': isActive }"
  >
    {{ title }}
  </div>
</template>
