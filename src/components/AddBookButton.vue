<script setup lang="ts">
const collectionStore = useCollectionStore()
const collection = computed(() =>
  collectionStore.activeCollectionName,
)
</script>

<template>
  <RouterLink
    to="/add-book" flex items-center justify-center absolute bottom-16 right-6 z-2 h-14 w-14 text-white rounded-full
    dark:bg-primary:40 bg-primary:80
  >
    <div :class="collection !== 'wishlist' ? 'i-bx:book-add' : 'i-bx:book-heart'" text-2xl />
  </RouterLink>
</template>
