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
    :class="{ 'bg-primary:10': props.selected }" v-on="touchHandler ">
    <PressMarker />
    <ItemAvatar :icon="book? 'book': 'author'" @click.stop="$emit('select')" />
    <ListItemContent :book="book" :author="author" />
  </div>
</template>
