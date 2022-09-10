import { defineStore } from 'pinia'
import type { AuthorWithCount } from '@/types'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    value: '',
    display: 'books' as 'books' | 'authors',
    author: null as null | AuthorWithCount,
  }),
  actions: {
    setValue(value: string) {
      this.value = value.toLocaleLowerCase()
    },
    clean() {
      this.value = ''
    },
  },
  getters: {
    numOfBooks: (state) => {
      const collectionStore = useCollectionStore()
      return collectionStore.activeCollection.books.filter(
        book => book.author.id === state.author?.id,
      ).length
    },
  },
})
