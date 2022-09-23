<script setup lang="ts">
defineProps<{
  icon: 'author' | 'book'
}>()
</script>

<template>
  <div avatar-scene>
    <div avatar-object text-2xl>
      <div avatar-face bg-base>
        <div :class="icon === 'book' ? 'i-bi-book' : 'i-bi:person'" />
      </div>
      <div avatar-face rotateY180 rounded-full bg-primary text-canvas>
        <div class="i-material-symbols:done" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected [avatar-object] {
  transform: rotateY(-180deg);
}
[avatar-face]:first-child{
  color: rgb(var(--c-accent));
}
[avatar-face]:last-child{
  background-color: rgba(var(--c-accent), 0.4);
}
</style>
