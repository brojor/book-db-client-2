import { defineStore } from 'pinia'
import apiService from '@/services/api'
import type {
  BookToAdd,
  Collection,
  CollectionType,
} from '@/types'

export const collectionList = [
  { id: 'default', title: 'Knihovna' },
  { id: 'wishlist', title: 'Seznam přání' },
] as const

export type CollectionList = typeof collectionList

type CollectionId = typeof collectionList[number]['id']

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
    activeCollectionName: 'default' as CollectionType,
    selectedItems: [] as number[],
  }),
  actions: {
    async getCollection(collectionType: CollectionType) {
      const response = await apiService.get(`/collections/${collectionType}`)
      this.collections[collectionType] = response.data as Collection
    },
    async addToCollection(collectionType: CollectionType, book: BookToAdd) {
      const response = await apiService.post(`/collections/${collectionType}`, book)
      this.collections[collectionType] = response.data as Collection
    },
    async fetchCollections() {
      await Promise.all(collectionList.map(({ id }) => this.getCollection(id)))
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
    availableCollections: state =>
      Object.keys(state.collections) as (keyof typeof state.collections)[],
    activeCollectionIndex: state => collectionList.findIndex(({ id }) => id === state.activeCollectionName),
    selectedItemsCount: state => state.selectedItems.length,
  },
})
