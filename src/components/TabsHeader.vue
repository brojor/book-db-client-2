<script setup lang="ts">
import type { Swiper } from 'swiper/types'
import type { CollectionList } from '@/stores/collection'

defineProps<{
  swiperInstance: Swiper | null
  collections: CollectionList
}>()
const collectionStore = useCollectionStore()

const icons = [
  'i-mdi:home',
  'i-mdi:gift-outline',
  'i-mdi:checkbox-marked-circle-outline',
  'i-mdi:progress-clock',
  'i-mdi:close-circle-outline',
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
      :icon="icons[index]"
      @click="swiperInstance?.slideTo(index)"
    />
  </div>
</template>
