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
    color: '139,92,246',
  },
  {
    icon: 'i-mdi:gift-outline',
    color: '244,114,182',
  },
  {
    icon: 'i-mdi:checkbox-marked-circle-outline',
    color: '16,185,129',
  },
  {
    icon: 'i-mdi:progress-clock',
    color: '234,179,8',
  },
  {
    icon: 'i-mdi:close-circle-outline',
    color: '239,68,68',
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
      :color="items[index].color"
      @click="swiperInstance?.slideTo(index)"
    />
  </div>
</template>
