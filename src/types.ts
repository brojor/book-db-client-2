const collectionTypes = ['default', 'wishlist'] as const

export type CollectionType = typeof collectionTypes[number]

export interface Book {
  id: number
  title: string
  isRead: boolean
  author: {
    id: number
    fullName: string
  }
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
