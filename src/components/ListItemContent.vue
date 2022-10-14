<script setup lang="ts">
import type { AuthorWithCount, Book } from '@/types'

defineProps<{
  book?: Book
  author?: AuthorWithCount
}>()
</script>

<template>
  <div grow>
    <div flex justify-between>
      <h3 text-sm font-bold flex gap1 items-center>
        <span max-w="60vw" whitespace-nowrap overflow-hidden text-ellipsis>
          {{ book?.title || author?.fullName }}</span>
      </h3>
      <div v-if="book" text-xs text-medium-emphasis flex gap-1 items-center mb="3px">
        {{ book.publishedDate || 'n/a' }}
        <i i-material-symbols:calendar-month-outline text-primary:70 />
      </div>
    </div>
    <div flex justify-between>
      <p text-xs leading-5>
        {{ book?.author.fullName || $t('CollectionList.numOfBooks', { count: author?.numOfBooks }) }}
      </p>
      <div v-if="book" text-xs text-medium-emphasis flex gap-1 items-center mt="3px">
        {{ book.pageCount || 'n/a' }}
        <i i-fluent:document-page-bottom-right-24-regular text-primary:70 />
      </div>
    </div>
  </div>
</template>

