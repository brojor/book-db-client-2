<script setup lang="ts">
import { useCollectionStore } from '@/stores/collection'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()

const collection = useCollectionStore()
</script>

<template>
  <footer
    text-center
    bg="$color-background-mute"
    border-t="2px solid $color-background-soft"
  >
    <nav v-if="!searchStore.author" flex justify-around>
      <button
        class="text-$color-text"
        :class="{ active: searchStore.display === 'books' }"
        bg-inherit
        m2
        py1
        px4
        no-underline
        font-medium
        text-sm
        flex
        items-center
        border-none
        @click="searchStore.display = 'books'"
      >
        <BookIcon mr2 text-xl />
        <span>Knihy ({{ collection.activeCollection.books.length }})</span>
      </button>
      <button
        class="text-$color-text"
        :class="{ active: searchStore.display === 'authors' }"
        bg-inherit
        m2
        py1
        px3
        no-underline
        font-medium
        text-sm
        flex
        items-center
        border-none
        @click="searchStore.display = 'authors'"
      >
        <PersonIcon mr2 text-xl />
        <span>Autoři ({{ collection.activeCollection.authors.length }})</span>
      </button>
    </nav>
    <nav v-else flex justify-center>
      <button
        class="text-$color-text"
        bg-inherit
        m1
        px3
        no-underline
        font-medium
        text-sm
        flex
        items-center
        border-none
        text-rose
        rounded
        @click="searchStore.author = null"
      >
        <PersonIcon mr2 text-xl />
        <span>{{
          `${searchStore.author.firstName}${searchStore.author.lastName} (${searchStore.numOfBooks})`
        }}</span>
        <span ml2 text-2xl font-light> &times;</span>
      </button>
    </nav>
  </footer>
</template>

<style scoped>
.active {
  color: var(--color-accent);
}
</style>
