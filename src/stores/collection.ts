import { defineStore } from 'pinia'
import apiService from '@/services/api'
import type { BookToAdd, Collection } from '@/types'
import { BookState } from '@/types'
export const collectionList = [
  { id: 'library', icon: 'mdi:home' },
  { id: 'wishlist', icon: 'mdi:gift-outline' },
  { id: 'read', icon: 'mdi:checkbox-marked-circle-outline' },
  { id: 'reading', icon: 'mdi:progress-clock' },
  { id: 'unread', icon: 'mdi:close-circle-outline' },
] as const

export type CollectionList = typeof collectionList

export type CollectionId = typeof collectionList[number]['id']

const emptyCollection = {
  books: [],
  authors: [],
}

const defaultSort = {
  key: 'title',
  order: 'asc' as 'asc' | 'desc',
}

const collections = collectionList.reduce(
  (obj, collection) => ({ ...obj, [collection.id]: emptyCollection }),
  {} as { [key in CollectionId]: Collection },
)

export const useCollectionStore = defineStore({
  id: 'collection',
  state: () => ({
    collections,
    activeCollectionName: 'library' as CollectionId,
    selectedItems: [] as number[],
  }),
  actions: {
    async getCollection(collectionType: CollectionId, sort?: typeof defaultSort) {
      const sortString = `${sort?.key || defaultSort.key}:${sort?.order || defaultSort.order}`
      const response = await apiService.get(`collection/${collectionType}?sort=${sortString}`)
      this.collections[collectionType] = response.data as Collection
    },
    async addToCollection(collectionType: CollectionId, book: BookToAdd) {
      await apiService.post(`collection/${collectionType}`, book)
      this.getCollection('library')
      if (collectionType === 'library')
        this.getCollection('unread')
      else
        this.getCollection(collectionType)
    },
    async deleteSelectedFromCollection() {
      await apiService.delete('collection/', { data: { bookIds: this.selectedItems } })
      if (this.activeCollectionName === 'library') {
        this.fetchCollections()
      }
      else {
        this.getCollection('library')
        this.getCollection(this.activeCollectionName)
      }
      this.removeSelectedItems()
    },
    async setBookState(targetState: BookState, bookId?: number) {
      await apiService.put(`collection/${BookState[targetState]}`, {
        bookIds: bookId ? [bookId] : this.selectedItems,
      })
      this.fetchCollections()
      this.removeSelectedItems()
    },
    async fetchCollections() {
      await Promise.all(collectionList.map(collection => this.getCollection(collection.id)))
    },
    selectItem(bookId: number) {
      if (this.selectedItems.includes(bookId))
        this.selectedItems = this.selectedItems.filter(id => id !== bookId)
      else
        this.selectedItems.push(bookId)
    },
    removeSelectedItems() {
      this.selectedItems = []
    },
  },
  getters: {
    activeCollection: state => state.collections[state.activeCollectionName],
    activeCollectionIndex: state => collectionList.findIndex(({ id }) => id === state.activeCollectionName),
    selectedItemsCount: state => state.selectedItems.length,
  },
})
