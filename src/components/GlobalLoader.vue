<template>
    <div v-if="isLoading" absolute w-full h-full bg-black:20 backdrop-blur-2px z-100 flex-center>
        <div i-mdi:loading text-8xl animate-spin></div>
    </div>
</template>


<script setup lang="ts">
import apiService from "@/services/api";

const apiCalls = ref(0);

const isLoading = computed(() => apiCalls.value > 0);

apiService.interceptors.request.use(
  (config) => {
    apiCalls.value += 1;
    if (import.meta.env.DEV) {
      return new Promise((resolve) => setTimeout(() => resolve(config), 1500));
    }
    return config;
  },
  (error) => {
    apiCalls.value -= 1;
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    apiCalls.value -= 1;
    return response;
  },
  (error) => {
    apiCalls.value -= 1;
    return Promise.reject(error);
  }
);
</script>
