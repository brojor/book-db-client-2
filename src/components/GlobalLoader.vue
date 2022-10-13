<template>
    <div v-if="isLoading" absolute w-full h-full bg-black:20 backdrop-blur-2px z-100 flex-center>
        <div i-mdi:loading text-8xl animate-spin></div>
    </div>
</template>


<script setup lang="ts">
const { isLoading, enableLoader } = useGlobalLoader()
enableLoader()
</script>
