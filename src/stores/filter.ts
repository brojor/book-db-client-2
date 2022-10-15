import { defineStore } from 'pinia'
import type { AuthorWithCount, Book } from '@/types'

export const useFilter = defineStore({
  id: 'filter',
  state: () => ({
    searchBarValue: '',
    displayedSubject: 'books' as 'books' | 'authors',
    selectedAuthor: null as null | AuthorWithCount,
  }),
  actions: {
    selectAuthor(author: AuthorWithCount) {
      this.searchBarValue = ''
      this.displayedSubject = 'books'
      this.selectedAuthor = author
    },
  },
  getters: {
    books: state => (books: Book[]) => {
      const filtredByAuthor = state.selectedAuthor
        ? books.filter(book => book.author.id === state.selectedAuthor?.id)
        : books
      return state.searchBarValue
        ? filtredByAuthor.filter(book => book.title.toLocaleLowerCase().includes(state.searchBarValue.toLowerCase()))
        : filtredByAuthor
    },
    authors: state => (authors: AuthorWithCount[]) => state.searchBarValue
      ? authors.filter(author => author.fullName.toLowerCase().includes(state.searchBarValue.toLowerCase()))
      : authors,
  },
})
