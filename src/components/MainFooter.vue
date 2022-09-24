<script setup lang="ts">
const filter = useFilter()

const collectionStore = useCollectionStore()
</script>

<template>
  <footer
    text-center
    bg-base
  >
    <nav v-if="!filter.selectedAuthor" flex justify-around>
      <button
        :class="{ isActive: filter.displayedSubject === 'books' }"
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
        @click="filter.displayedSubject = 'books'"
      >
        <BookIcon mr2 text-xl />
        <span>Knihy ({{ collectionStore.activeCollection.books.length }})</span>
      </button>
      <button
        :class="{ isActive: filter.displayedSubject === 'authors' }"
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
        @click="filter.displayedSubject = 'authors'"
      >
        <PersonIcon mr2 text-xl />
        <span>Autoři ({{ collectionStore.activeCollection.authors.length }})</span>
      </button>
    </nav>
    <nav v-else flex justify-center>
      <button
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
        @click="filter.selectedAuthor = null"
      >
        <PersonIcon mr2 text-xl />
        <span>{{ filter.selectedAuthor.fullName }}</span>
        <span ml2 text-2xl font-light> &times;</span>
      </button>
    </nav>
  </footer>
</template>

<style scoped>
  .isActive {
    color: rgb(var(--c-accent));
  }
</style>
