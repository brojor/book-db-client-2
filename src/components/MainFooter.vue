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
        :class="{ 'text-primary': filter.displayedSubject === 'books' }"
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
        <span>Knihy ({{ collectionStore[collectionStore.activeCollectionName].books.length }})</span>
      </button>
      <button
        :class="{ 'text-primary': filter.displayedSubject === 'authors' }"
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
        <span>Autoři ({{ collectionStore[collectionStore.activeCollectionName].authors.length }})</span>
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
