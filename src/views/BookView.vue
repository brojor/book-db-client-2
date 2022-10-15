<script setup lang="ts">
import apiService from '@/services/api'
import type { BookToAdd } from '@/types'
import { BookState } from '@/types'

const route = useRoute()
const collectionStore = useCollectionStore()
const { enableLoader, disableLoader } = useGlobalLoader()
const bookId = Number(route.params.id)
const book = collectionStore.activeCollection.books.find(b => b.id === bookId)!

collectionStore.activeCollectionName = BookState[book.bookState] as keyof typeof BookState

const bookData = ref< BookToAdd >({
  title: book.title,
  author: book.author.fullName,
})
const isLoading = ref(true)

const fetchData = async () => {
  disableLoader()
  const { data } = await apiService.get(`books/${bookId}`)
  bookData.value = { ...data, author: bookData.value.author }
  isLoading.value = false
  enableLoader()
}

fetchData()

const details = computed(() => {
  const { title, subtitle, author, ...rest } = bookData.value
  return rest
},
)
</script>

<template>
  <div p4 text-center bg-canvas h-full flex="~ col">
    <div w="30vw" h="30vw" rounded-full mx-auto my-8 flex-center bg-base text-primary>
      <div class="i-bi-book" text="15vw" />
    </div>
    <h1 text-3xl m1 font-bold>
      {{ bookData.title }}
    </h1>
    <p v-if="bookData.subtitle" font-bold text-xl>
      {{ bookData.subtitle }}
    </p>
    <p m2 text-high-emphasis>
      {{ bookData.author }}
    </p>
    <div text-left grow mt-10>
      <BookDetails :book-details="details" :is-loading="isLoading" />
      <SelectCollection
        mt4 :current-state="book.bookState"
        @update:state="collectionStore.setBookState(BookState[$event], bookId)"
      />
    </div>
    <ABtn my1 @click="$router.push('/')">
      Zpět
    </ABtn>
  </div>
</template>
