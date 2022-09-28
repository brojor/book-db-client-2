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
    flex rounded m1 px1 transition duration-500
    :style="{ backgroundColor: `hsla(var(--c-${name}), 0.1)` }" :class="{ '!bg-primary:40 text-white': isActive }"
  >
    <div flex items-center p-2>
      <div :class="icon" />
    </div>
    <div v-if="isActive" py3 pr2 text-center leading-5>
      {{ title }}
    </div>
  </div>
</template>
