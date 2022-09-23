import { defineStore } from 'pinia'
import apiService from '@/services/api'
import type {
  AuthorWithCount,
  Book,
  BookToAdd,
  Collection,
  CollectionType,
} from '@/types'
import {
  ReadStatus,
  collectionTypes,
} from '@/types'

export const collectionList = [
  { id: 'default', title: 'Knihovna' },
  { id: 'wishlist', title: 'Seznam přání' },
  { id: 'readBooks', title: 'Přečtené' },
  { id: 'readInProgres', title: 'Čtu' },
  { id: 'unreadBooks', title: 'Nepřečtené' },
] as const

export type CollectionList = typeof collectionList

export type CollectionId = typeof collectionList[number]['id']

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
    activeCollectionName: 'default' as CollectionId,
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
    async deleteSelectedFromCollection() {
      const response = await apiService.delete(`/collections/${this.activeCollectionName}`, {
        data: { bookIds: this.selectedItems },
      })
      this.collections[this.activeCollectionName] = response.data as Collection
      this.removeSelectedItems()
    },
    async moveSelectedToCollection(targerCollection: CollectionType) {
      const response = await apiService.put(`/collections/${this.activeCollectionName}?target=${targerCollection}`, {
        bookIds: this.selectedItems,
      })
      this.collections[this.activeCollectionName] = response.data.sourceCollection as Collection
      this.collections[targerCollection] = response.data.targetCollection as Collection
      this.removeSelectedItems()
    },
    async setReadStatus(readStatus: ReadStatus) {
      const response = await apiService.patch(`/collections/${this.activeCollectionName}?readStatus=${readStatus}`, {
        bookIds: this.selectedItems,
      })
      this.collections[this.activeCollectionName] = response.data as Collection
      this.removeSelectedItems()
    },
    async fetchCollections() {
      await Promise.all(collectionTypes.map(collectionName => this.getCollection(collectionName)))
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
    // ----------------------------------
    readBooksIds: state => state.collections.default.books.filter(book => book.readStatus === ReadStatus.READ).map(book => book.id),
    readInProgresIds: state => state.collections.default.books.filter(book => book.readStatus === ReadStatus.IN_PROGRESS).map(book => book.id),
    unreadBooksIds: state => state.collections.default.books.filter(book => book.readStatus === ReadStatus.UNREAD).map(book => book.id),
    // ----------------------------------
    default: state => state.collections.default,
    wishlist: state => state.collections.wishlist,
    readBooks: (state) => {
      const books = state.collections.default.books.filter(book => book.readStatus === ReadStatus.READ)
      const authors = books.reduce(sumBooksFromAuthor, [])
      return { books, authors }
    },
    readInProgres: (state) => {
      const books = state.collections.default.books.filter(book => book.readStatus === ReadStatus.IN_PROGRESS)
      const authors = books.reduce(sumBooksFromAuthor, [])
      return { books, authors }
    },
    unreadBooks: (state) => {
      const books = state.collections.default.books.filter(book => book.readStatus === ReadStatus.UNREAD)
      const authors = books.reduce(sumBooksFromAuthor, [])
      return { books, authors }
    },
  },
})

function sumBooksFromAuthor(arr: AuthorWithCount[], book: Book) {
  const author = arr.find(author => author.id === book.author.id)
  if (author)
    author.numOfBooks += 1
  else arr.push({ ...book.author, numOfBooks: 1 })
  return arr
}
