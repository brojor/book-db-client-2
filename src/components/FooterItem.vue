<script setup lang="ts">
defineProps<{
  isActive: boolean
  title: string
  count: number
  icon: string
}>()
</script>

<template>
  <button flex items-center p2 :class="{ 'text-primary': isActive }">
    <div :class="icon" text-xl />
    <span px2>{{ title }}</span>
    <span
      px2 text-high-emphasis rounded-lg font-normal
      :class="isActive ? 'dark:bg-primary:40 bg-primary:80 text-white' : 'bg-gray:20 text-medium-emphasis' "
    >
      {{ count }}
    </span>
  </button>
</template>

