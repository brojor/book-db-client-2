<script setup lang="ts">
import GlobalLoader from './components/GlobalLoader.vue';
useColorChanger()
</script>

<template>
  <RouterView />
  <GlobalLoader />
</template>
