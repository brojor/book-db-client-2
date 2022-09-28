<script setup lang="ts">
import { BookState } from '@/types'

const emit = defineEmits(['showDrawer'])

const filter = useFilter()
const collectionStore = useCollectionStore()

const placeholder = computed(() => `Hledat v ${filter.displayedSubject === 'books' ? 'knihách' : 'autorech'}`)

const deleteSearchbarValue = (e: Event) => {
  filter.searchBarValue = ''
  const button = e.target as HTMLButtonElement
  const input = button.previousElementSibling as HTMLInputElement
  input.focus()
}

const buttonHandler = (e: Event) => {
  if (filter.searchBarValue)
    deleteSearchbarValue(e)
  else
    emit('showDrawer')
}

const removeFromCollection = () => {
  collectionStore.deleteSelectedFromCollection()
}
</script>

<template>
  <div relative h16>
    <header flex relative bg-canvas px4 py2>
      <AInput
        v-model="filter.searchBarValue" :placeholder="placeholder"
        input-wrapper-classes="rounded-full" prepend-inner-icon="i-material-symbols:search" bg-base
      >
        <template #append-inner>
          <button :class="filter.searchBarValue ? 'i-mdi:close:' : 'i-mdi:dots-vertical'" right-0 absolute p="x6 y2" @click="buttonHandler" />
        </template>
      </AInput>
    </header>
    <header
      bg-base p2 text-xl flex justify-between absolute inset-x-0 top-0 z1 transition-all duration-300
      :class="collectionStore.selectedItemsCount ? 'opacity-100' : 'opacity-0  -translate-y-full'"
    >
      <div flex items-center>
        <ABtn
          icon="i-material-symbols:arrow-back" text-white icon-only variant="text"
          @click="collectionStore.removeSelectedItems()"
        />
        <span ml6>{{ collectionStore.selectedItemsCount }}</span>
      </div>
      <div v-if="collectionStore.selectedItems.length" flex>
        <ABtn
          v-if="collectionStore.activeCollectionName === 'wishlist'"
          icon="i-mdi:home-import-outline" text-white icon-only variant="text"
          @click="collectionStore.setBookState(BookState.unread)"
        />

        <div flex gap-1>
          <template v-if="collectionStore.activeCollectionName !== 'wishlist'">
            <ABtn
              v-if="!collectionStore.selectedItems.some(id => collectionStore.collections.read.books.find(
                book => book.id === id))"
              icon="i-mdi:checkbox-marked-circle-outline" text-white icon-only variant="text"
              @click="collectionStore.setBookState(BookState.read)"
            />
            <ABtn
              v-if="!collectionStore.selectedItems.some(id => collectionStore.collections.reading.books.find(
                book => book.id === id))"
              icon="i-mdi:progress-clock" text-white icon-only variant="text"
              @click="collectionStore.setBookState(BookState.reading)"
            />
            <ABtn
              v-if="!collectionStore.selectedItems.some(id => collectionStore.collections.unread.books.find(
                book => book.id === id))"
              icon="i-mdi:close-circle-outline" text-white icon-only variant="text"
              @click="collectionStore.setBookState(BookState.unread)"
            />
          </template>
          <ABtn
            icon="i-mdi:trash-can-outline" text-white icon-only variant="text"
            @click="removeFromCollection"
          />
        </div>
      </div>
    </header>
  </div>
</template>
