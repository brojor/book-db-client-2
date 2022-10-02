<script setup lang="ts">
defineProps<{
  title: string
  isActive: boolean
  icon: string
  name: string
}>()
</script>

<template>
  <div
    flex rounded m1 transition-all duration-800 px1
    :style="{ backgroundColor: `hsla(var(--c-${name}), 0.1)` }" :class="{ '!bg-primary:40 text-white': isActive }"
  >
    <div flex items-center px2>
      <div :class="`i-${icon}`" />
    </div>
    <div
      py2 max-w-0 transition-all duration-300 overflow-hidden whitespace-nowrap
      :class="{ '!max-w-300 pr2': isActive }"
    >
      {{ title }}
    </div>
  </div>
</template>
