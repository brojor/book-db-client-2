export const collectionTypes = ['default', 'wishlist'] as const

export type CollectionType = typeof collectionTypes[number]

export enum BookState {
  wishlist = 1,
  unread = 2,
  reading = 3,
  read = 4,
}

export interface Book {
  id: number
  title: string
  bookState: BookState
  author: {
    id: number
    fullName: string
  }
  pageCount: number
  publishedDate: string
}

export interface AuthorWithCount {
  id: number
  fullName: string
  numOfBooks: number
}

export interface BookToAdd {
  author: string
  title: string
  subtitle?: string
  isbn?: number
  pageCount?: number
  publisher?: string
  publishedDate?: string
  language?: string
}

export interface Collection {
  books: Book[]
  authors: AuthorWithCount[]
}
