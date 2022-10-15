<script setup lang="ts">
import type { BookToAdd } from '@/types'

type BookDetails = Omit<BookToAdd, 'author' | 'title' | 'subtitle'>

defineProps<{ isLoading: boolean; bookDetails: BookDetails }>()

const widths = [[20, 40], [30, 10], [25, 30], [30, 40], [20, 40]]
</script>

<template>
  <div v-if="isLoading" bg-base py2 rounded-lg>
    <div v-for="(width, i) in widths" :key="i" text-high-emphasis font-bold m-4 flex items-center gap4>
      <span bg-white:30 h-3 rounded animate-pulse :style="{ width: `${width[0]}%` }" />
      <span w="30%" bg-white:20 h-3 rounded block animate-pulse :style="{ width: `${width[1]}%` }" />
    </div>
  </div>
  <div v-else bg-base p4 rounded-lg>
    <div v-for="(value, key) in bookDetails" :key="key" text-high-emphasis font-bold m1 flex items-center gap4>
      {{ $t(`BookDetails.${key}`) }}
      <span font-normal text-medium-emphasis>{{ key === 'language' ? $t(`BookDetails.languages.${value}`) : value
      }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
