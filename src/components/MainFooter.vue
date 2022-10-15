<script setup lang="ts">
const filter = useFilter()
const collectionStore = useCollectionStore()
</script>

<template>
  <footer text-center bg-base>
    <nav v-if="!filter.selectedAuthor" flex justify-around>
      <FooterItem
        :title="$t('MainFooter.books')" :count="collectionStore.activeCollection.books.length"
        :is-active="filter.displayedSubject === 'books'" icon="i-ph:book-open"
        @click="filter.displayedSubject = 'books'"
      />
      <FooterItem
        :title="$t('MainFooter.authors')" :count="collectionStore.activeCollection.authors.length"
        :is-active="filter.displayedSubject === 'authors'" icon="i-bi:person"
        @click="filter.displayedSubject = 'authors'"
      />
    </nav>
    <nav v-else flex justify-center>
      <FooterItem
        :title="filter.selectedAuthor.fullName" :count="filter.selectedAuthor.numOfBooks"
        is-active icon="i-mdi:close" @click="filter.selectedAuthor = null"
      />
    </nav>
  </footer>
</template>
