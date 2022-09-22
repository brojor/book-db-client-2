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
    <TransitionGroup name="list">
      <ListItem
        v-for="book in books"
        :id="book.id"
        :key="book.id"
        :title="book.title"
        :subtitle="book.author.fullName"
        icon="book"
        :selected="collectionStore.selectedItems.includes(book.id)"
        :is-read="collectionStore.activeCollectionName === 'default' ? book.isRead : undefined"
        @select="collectionStore.selectItem(book.id)"
      />
    </TransitionGroup>
  </div>
  <div v-show="filter.displayedSubject === 'authors'">
    <TransitionGroup name="list">
      <ListItem
        v-for="author in authors"
        :id="author.id"
        :key="author.id"
        :title="author.fullName"
        :subtitle="`Počet knih: ${author.numOfBooks}`"
        :is-read="undefined"
        icon="author"
        :selected="collectionStore.selectedItems.includes(author.id)"
        @click="filter.selectAuthor(author)"
        @select="collectionStore.selectItem(author.id)"
      />
    </TransitionGroup>
  </div>
</template>
