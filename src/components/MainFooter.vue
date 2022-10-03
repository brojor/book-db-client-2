<script setup lang="ts">
const filter = useFilter()
const collectionStore = useCollectionStore()
</script>

<template>
  <footer text-center bg-base>
    <nav v-if="!filter.selectedAuthor" flex justify-around>
      <FooterItem
        :title="$t('MainFooter.books')" :count="collectionStore.activeCollection.books.length"
        :is-active="filter.displayedSubject === 'books'"
        @click="filter.displayedSubject = 'books'"
      />
      <FooterItem
        :title="$t('MainFooter.authors')" :count="collectionStore.activeCollection.authors.length"
        :is-active="filter.displayedSubject === 'authors'"
        @click="filter.displayedSubject = 'authors'"
      />
    </nav>
    <nav v-else flex justify-center>
      <ABtn m1 color="danger" variant="outline" @click="filter.selectedAuthor = null">
        <span>{{ filter.selectedAuthor.fullName }}</span>
        <i i-mdi:close />
      </ABtn>
    </nav>
  </footer>
</template>
