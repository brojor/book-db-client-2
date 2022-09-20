<script setup lang="ts">
import type { CollectionType } from '@/types'

const props = defineProps<{
  collectionType: CollectionType
}>()

const collectionStore = useCollectionStore()
const filter = useFilter()

const books = computed(() => filter.books(collectionStore.collections[props.collectionType].books))
const authors = computed(() => filter.authors(collectionStore.collections[props.collectionType].authors))
</script>

<template>
  <div v-show="filter.displayedSubject === 'books'" h-full>
    <ListItem
      v-for="book in books"
      :id="book.id"
      :key="book.id"
      :collection-type="props.collectionType"
      :title="book.title"
      :subtitle="book.author.fullName"
      icon="book"
    />
  </div>
  <div v-show="filter.displayedSubject === 'authors'">
    <ListItem
      v-for="author in authors"
      :id="author.id"
      :key="author.id"
      :title="`${author.firstName} ${author.lastName}`"
      :subtitle="`Počet knih: ${author.numOfBooks}`"
      icon="author"
      @click="filter.selectAuthor(author)"
    />
  </div>
</template>
