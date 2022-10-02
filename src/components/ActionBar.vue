<script setup lang="ts">
import { BookState } from '@/types'

const collectionStore = useCollectionStore()
const statesToSet = collectionList.slice(2)
</script>

<template>
  <div
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
    <div v-if="collectionStore.selectedItems.length" flex gap-1>
      <ABtn
        v-if="collectionStore.activeCollectionName === 'wishlist'"
        icon="i-mdi:home-import-outline" text-white icon-only variant="text"
        @click="collectionStore.setBookState(BookState.unread)"
      />
      <template v-else>
        <template v-for="state in statesToSet" :key="state.id">
          <ABtn
            v-if="!collectionStore.selectedItems.some(id => collectionStore.collections[state.id].books.find(
              book => book.id === id))"
            :icon="`i-${state.icon}`" text-white icon-only variant="text"
            @click="collectionStore.setBookState(BookState[state.id as keyof typeof BookState])"
          />
        </template>
      </template>
      <ABtn
        icon="i-mdi:trash-can-outline" text-white icon-only variant="text"
        @click="collectionStore.deleteSelectedFromCollection()"
      />
    </div>
  </div>
</template>
