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

onMounted(() => {
  swiperInstance.value?.slideTo(collectionStore.activeCollectionIndex, 0)
  // swiperInstance.value?.onAny(() => console.log('event'))
})
</script>

<template>
  <MainHeader @show-drawer="isDrawerShown = true" />
  <TabsHeader :collections="collectionList" :swiper-instance="swiperInstance" />
  <Swiper bg-canvas @slide-change="onSlideChange" @swiper="onSwiper">
    <SwiperSlide v-for="collection in collectionList" :key="collection.id">
      <CollectionList :collection-type="collection.id" />
    </SwiperSlide>
  </Swiper>
  <AddBookButton />
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
