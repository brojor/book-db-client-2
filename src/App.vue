<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
const collectionStore = useCollectionStore()

collectionStore.fetchCollections()
const el = document.getElementById('app')

const color = useCssVar('--c-accent', el)

const hslColors = {
  default: '139,92,246',
  wishlist: '244,114,182',
  readBooks: '16,185,129',
  readInProgres: '234,179,8',
  unreadBooks: '239,68,68',
}
watch(
  () => collectionStore.activeCollectionName,
  (collectionName) => {
    color.value = hslColors[collectionName]
  },
)
</script>

<template>
  <RouterView />
</template>
