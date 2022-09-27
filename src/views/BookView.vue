<script setup lang="ts">
import apiService from '@/services/api'

const route = useRoute()
const bookId = route.params.id

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
  title: '',
  author: '',
})

const translation = {
  isbn: 'ISBN',
  publishedDate: 'Datum vydání',
  pageCount: 'Počet stran',
  language: 'Jazyk',
  publisher: 'Vydavatel',
}
const fetchData = async () => {
  const { data } = await apiService.get(`books/${bookId}`)
  bookData.value = data
}
fetchData()
const details = computed(() => {
  const { title, subtitle, author, ...rest } = bookData.value
  return rest
},
)
</script>

<template>
  <div p6 text-center bg-canvas h-full flex="~ col">
    <div w="30vw" h="30vw" bg-red rounded-full mx-auto my-10 flex-center bg-base text-primary>
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
    <div text-left grow mt-20>
      <p v-for="(value, key) in details" :key="key" text-high-emphasis font-bold m1>
        {{ translation[key] }}: <span font-normal ml-2 text-medium-emphasis>{{ value }}</span>
      </p>
    </div>
    <ABtn my1 @click="$router.push('/')">
      Zpět
    </ABtn>
  </div>
</template>
