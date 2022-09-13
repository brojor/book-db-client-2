<script setup lang="ts">
import type { AuthorWithCount, CollectionType } from '@/types'

const props = defineProps<{
  collectionType: CollectionType
}>()

const searchStore = useSearchStore()
const collectionStore = useCollectionStore()

const { books, authors } = collectionStore.collections[props.collectionType]

if (!books.length)
  collectionStore.getCollection(props.collectionType)

const filtredBooks = computed(() => {
  const filtredByAuthor = searchStore.author
    ? books.filter(book => book.author.id === searchStore.author?.id)
    : books

  return searchStore.value
    ? filtredByAuthor.filter(book =>
      book.title.toLocaleLowerCase().includes(searchStore.value.toLowerCase()),
    )
    : filtredByAuthor
})

const filtredAuthors = computed(() =>
  searchStore.value
    ? authors.filter(author =>
        `${author.firstName} ${author.lastName}`
          .toLocaleLowerCase()
          .includes(searchStore.value.toLowerCase()),
    )
    : authors,
)

const selectAuthor = (author: AuthorWithCount) => {
  searchStore.value = ''
  searchStore.display = 'books'
  searchStore.author = author
}
</script>

<template>
  <div v-show="searchStore.display === 'books'" h-full>
    <ListItem
      v-for="book in filtredBooks"
      :key="book.id"
      :title="book.title"
      :subtitle="book.author.fullName"
      icon="book"
    />
  </div>
  <div v-show="searchStore.display === 'authors'">
    <ListItem
      v-for="author in filtredAuthors"
      :key="author.id"
      :title="`${author.firstName} ${author.lastName}`"
      :subtitle="`Počet knih: ${author.numOfBooks}`"
      icon="author"
      @click="selectAuthor(author)"
    />
  </div>
</template>
