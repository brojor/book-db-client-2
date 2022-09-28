<script setup lang="ts">
import apiService from '@/services/api'
import { BookState } from '@/types'

const route = useRoute()
const collectionStore = useCollectionStore()
const bookId = route.params.id

const state = route.query.state as unknown as BookState
collectionStore.activeCollectionName = BookState[state] as keyof typeof BookState

const bookData = ref<{
  title: string
  author: string
  subtitle?: string
  isbn?: string
  publishedDate?: string
  pageCount?: number
  language?: string
  publisher?: string
}>({
  title: route.query.title as string,
  author: route.query.author as string,
})
const isLoading = ref(true)

const fetchData = async () => {
  const { data } = await apiService.get(`books/${bookId}`)
  bookData.value = { ...data, author: bookData.value.author }
  isLoading.value = false
}
if (import.meta.env.DEV) {
  setTimeout(() => {
    fetchData()
  }, 2000)
}
else {
  fetchData()
}

const details = computed(() => {
  const { title, subtitle, author, ...rest } = bookData.value
  return rest
},
)
</script>

<template>
  <div p4 text-center bg-canvas h-full flex="~ col">
    <div w="30vw" h="30vw" bg-red rounded-full mx-auto my-8 flex-center bg-base text-primary>
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
      <SelectCollection mt4 :current-state="state - 1" />
    </div>
    <ABtn my1 @click="$router.push('/')">
      Zpět
    </ABtn>
  </div>
</template>
