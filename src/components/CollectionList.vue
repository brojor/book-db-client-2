<script setup lang="ts">
import type { CollectionId } from '@/stores/collection'

const props = defineProps<{
  collectionType: CollectionId
}>()

const collectionStore = useCollectionStore()
const filter = useFilter()

const books = computed(() => filter.books(collectionStore.collections[props.collectionType].books))
const authors = computed(() => filter.authors(collectionStore.collections[props.collectionType].authors))
</script>

<template>
  <div v-show="filter.displayedSubject === 'books'" h-full>
    <ListItem v-for="book in books" :key="book.id" :book="book"
      :selected="collectionStore.selectedItems.includes(book.id)"
      @click="$router.push({ name: 'book', params: { id: book.id } })" @select="collectionStore.selectItem(book.id)" />
  </div>
  <div v-show="filter.displayedSubject === 'authors'">
    <ListItem v-for="author in authors" :key="author.id" :author="author"
      :selected="collectionStore.selectedItems.includes(author.id)" @click="filter.selectAuthor(author)"
      @select="collectionStore.selectItem(author.id)" />
  </div>
</template>
