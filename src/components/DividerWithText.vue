<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div
    relative text-center
    un-after="content-none border-b border-$color-border block absolute top-50% w-full mt-2px"
  >
    <small bg-canvas z1 relative px2>
      {{ text }}
    </small>
  </div>
</template>
