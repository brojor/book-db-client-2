<script setup lang="ts">
const collectionStore = useCollectionStore()
const collection = computed(() =>
  collectionStore.activeCollectionName,
)
</script>

<template>
  <div bg-canvas absolute bottom-16 right-6 z-2 rounded-full overflow-hidden>
    <RouterLink to="/add-book" text-white dark:bg-primary:40 bg-primary:80 rounded-full h-14 w-14 flex-center>
      <div :class="collection !== 'wishlist' ? 'i-bx:book-add' : 'i-bx:book-heart'" text-2xl />
    </RouterLink>
  </div>
</template>
