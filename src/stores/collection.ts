import { defineStore } from 'pinia'
import apiService from '@/services/api'
import type { BookToAdd, Collection } from '@/types'

export const collectionList = [
  { id: 'library', title: 'Knihovna' },
  { id: 'wishlist', title: 'Seznam přání' },
  { id: 'read', title: 'Přečtené' },
  { id: 'reading', title: 'Rozečtené' },
  { id: 'unread', title: 'Nepřečtené' },
] as const

export type CollectionList = typeof collectionList

export type CollectionId = typeof collectionList[number]['id']
type BookState = 'wishlist' | 'read' | 'reading' | 'unread'

const emptyCollection = {
  books: [],
  authors: [],
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
    async getCollection(collectionType: CollectionId) {
      const response = await apiService.get(`collection/${collectionType}`)
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
    async setBookState(targetState: BookState) {
      await apiService.put(`collection/${targetState}`, {
        bookIds: this.selectedItems,
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
