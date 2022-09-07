<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    {{ isDark ? 'dark' : 'light' }}
  </button>
</template>

<style scoped>
    button {
        margin: 1rem 0;
        border: 1px solid teal;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
    }
</style>
