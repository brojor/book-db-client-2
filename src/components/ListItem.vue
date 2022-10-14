<script setup lang="ts">
import { AuthorWithCount, Book } from '@/types';

const props = defineProps<{
  book?: Book;
  author?: AuthorWithCount;
  selected: boolean;
}>()

const emit = defineEmits(['select'])

const el = ref<HTMLElement | null>(null)
const touchHandler = useLongPress(el, () => {
  emit('select')
})
</script>

<template>
  <div ref="el" px3 py1 mx1 mb2px flex items-center gap3 relative rounded-lg overflow-hidden
    :class="{ selected: props.selected }" v-on="touchHandler ">
    <div class="press-marker" />
    <ItemAvatar :icon="book? 'book': 'author'" @click.stop="$emit('select')" />
    <ListItemContent :book="book" :author="author" />
  </div>
</template>

<style scoped>
.press-marker {
  width: 30%;
  height: 30%;
  position: absolute;
  /* background: #FFFFFF00; */
  left: 0;
  right: 0;
  margin: auto;
  transition: all 0.25s;
  transition-delay: 0.1s;
}

.selected {
  background: hsla(var(--a-primary), 0.1);
}

.pressed>.press-marker {
  width: 100%;
  height: 100%;
  background: var(--marked-color)
}
</style>
