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
    <div grow>
      <div flex justify-between>
        <h3 text-sm font-bold flex gap1 items-center>
          <span max-w="60vw" whitespace-nowrap overflow-hidden text-ellipsis>
            {{ book?.title || author?.fullName }}</span>
        </h3>
        <div v-if="book" text-xs text-medium-emphasis flex gap-1 items-center mb="3px">
          {{ book.publishedDate || 'n/a' }}
          <i i-material-symbols:calendar-month-outline text-primary:70></i>
        </div>
      </div>
      <div flex justify-between>
        <p text-xs leading-5>
          {{ book?.author.fullName || $t('CollectionList.numOfBooks', { count: author?.numOfBooks }) }}
        </p>
        <div v-if="book" text-xs text-medium-emphasis flex gap-1 items-center mt="3px">
          {{ book.pageCount || 'n/a' }}
          <i i-fluent:document-page-bottom-right-24-regular text-primary:70></i>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.press-marker {
  width: 30%;
  height: 30%;
  position: absolute;
  background: #FFFFFF00;
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
