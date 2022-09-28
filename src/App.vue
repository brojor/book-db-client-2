<script setup lang="ts">
const collectionStore = useCollectionStore()
collectionStore.fetchCollections()
useColorChanger()
</script>

<template>
  <RouterView />
</template>
