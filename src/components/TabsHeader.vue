<script setup lang="ts">
import type { Swiper } from 'swiper/types'
import type { CollectionList } from '@/stores/collection'

defineProps<{
  swiperInstance: Swiper | null
  collections: CollectionList
}>()
const collectionStore = useCollectionStore()
</script>

<template>
  <div name="tabs" flex bg-canvas px4 pb2>
    <TabItem
      v-for="(collection, index) in collections"
      :key="collection.id"
      :title="collection.title"
      :is-active="collection.id === collectionStore.activeCollectionName"
      @click="swiperInstance?.slideTo(index)"
    />
  </div>
</template>
