<script setup lang="ts">
import type { Swiper } from 'swiper/types'
import type { CollectionList } from '@/stores/collection'

defineProps<{
  swiperInstance: Swiper | null
  collections: CollectionList
}>()
const collectionStore = useCollectionStore()

const items = [
  {
    icon: 'i-mdi:home',
    name: 'library',
  },
  {
    icon: 'i-mdi:gift-outline',
    name: 'wishlist',
  },
  {
    icon: 'i-mdi:checkbox-marked-circle-outline',
    name: 'read',
  },
  {
    icon: 'i-mdi:progress-clock',
    name: 'reading',
  },
  {
    icon: 'i-mdi:close-circle-outline',
    name: 'unread',
  },
] as const
</script>

<template>
  <div name="tabs" flex bg-canvas px4>
    <TabItem
      v-for="(collection, index) in collections"
      :key="collection.id"
      :title="collectionList[index].title"
      :index="index"
      :is-active="collection.id === collectionStore.activeCollectionName"
      :icon="items[index].icon"
      :name="items[index].name"
      @click="swiperInstance?.slideTo(index)"
    />
  </div>
</template>
