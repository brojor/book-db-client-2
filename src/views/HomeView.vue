<script setup lang="ts">
import { ASelect } from 'anu-vue'
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import DarkSwitcher from '@/components/DarkSwitcher.vue'
import 'swiper/css'

const selected = ref()
const fruits = ['banana', 'apple', 'watermelon', 'orange']
</script>

<template>
  <h1>hello</h1>
  <DarkSwitcher />
  <ASelect v-model="selected" placeholder="Select Fruit" :options="fruits" />
  <Swiper>
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
  </Swiper>
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
