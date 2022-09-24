<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
const collectionStore = useCollectionStore()

collectionStore.fetchCollections()
const el = document.getElementById('app')

const color = useCssVar('--c-accent', el)

const hslColors = {
  library: '139,92,246',
  wishlist: '244,114,182',
  read: '16,185,129',
  reading: '234,179,8',
  unread: '239,68,68',
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
