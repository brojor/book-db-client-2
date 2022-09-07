<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div
    relative text-center
    un-after="content-none border border-$color-border block absolute top-50% w-full"
  >
    <small bg="$color-background-soft" z1 relative px2>
      {{ text }}
    </small>
  </div>
</template>
