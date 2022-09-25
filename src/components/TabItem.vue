<script setup lang="ts">
defineProps<{
  title: string
  isActive: boolean
  icon: string
  color: string
}>()
</script>

<template>
  <div flex rounded m1 :class="{ isActive }" px1 :style="{ backgroundColor: `rgba(${color}, 0.1)` }">
    <div flex items-center p-2>
      <div :class="icon" />
    </div>
    <div v-if="isActive" py3 pr2 text-center leading-5>
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.isActive {
    background-color: rgba(var(--c-accent), 0.4) !important;
    color: white;
}
</style>
