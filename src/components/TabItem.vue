<script setup lang="ts">
defineProps<{
  title: string
  isActive: boolean
  icon: string
}>()
</script>

<template>
  <div flex rounded m1 :class="{ 'bg-accent text-white': isActive }" px1>
    <div flex items-center pl-2>
      <div :class="icon" />
    </div>
    <div v-if="isActive" p2 text-center leading-5>
      {{ title }}
    </div>
  </div>
</template>
