<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'

const collectionStore = useCollectionStore()
const swiperInstance = ref<SwiperType | null>(null)
const isDrawerShown = ref<boolean>(false)

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper: SwiperType) => {
  collectionStore.activeCollectionName = collectionList[swiper.activeIndex].id
}
</script>

<template>
  <MainHeader @show-drawer="isDrawerShown = true" />
  <TabsHeader :collections="collectionList" :swiper-instance="swiperInstance" />
  <Swiper bg-canvas @slide-change="onSlideChange" @swiper="onSwiper">
    <SwiperSlide v-for="collection in collectionList" :key="collection.id">
      <CollectionList :collection-type="collection.id" />
    </SwiperSlide>
  </Swiper>
  <RouterLink
    to="/add-book" flex items-center justify-center
    absolute bottom-16 right-6 z-2 h-14 w-14
    bg-teal-700 text-white rounded-full
  >
    <AddBook text-3xl />
  </RouterLink>
  <MainFooter />
  <MainDrawer v-model="isDrawerShown" />
</template>

<style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  flex-grow: 1;
  overflow: scroll;
}
</style>
