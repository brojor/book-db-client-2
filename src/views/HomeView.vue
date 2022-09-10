<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']

const collectionStore = useCollectionStore()
const swiperInstance = ref<SwiperType | null>(null)

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper
}

const onSlideChange = (swiper: SwiperType) => {
  collectionStore.activeCollectionName = collectionList[swiper.activeIndex].id
}
</script>

<template>
  <ASelect v-model="selected" placeholder="Select Fruit" :options="fruits" />
  <MainHeader />
  <TabsHeader :collections="collectionList" :swiper-instance="swiperInstance" />
  <Swiper @slide-change="onSlideChange" @swiper="onSwiper">
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
