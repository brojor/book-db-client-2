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
  title: route.query.title as string,
  author: route.query.author as string,
})
const isLoading = ref(true)

const translation = {
  isbn: 'ISBN',
  publishedDate: 'Datum vydání',
  pageCount: 'Počet stran',
  language: 'Jazyk',
  publisher: 'Vydavatel',
}
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
const widths = [[20, 40], [30, 10], [25, 30], [30, 40], [20, 40]]
const bookStates = [
  { label: 'Seznam přání', value: 'wishlist', icon: 'i-mdi:gift-outline', color: '#ec4899' },
  { label: 'Přečtené', value: 'read', icon: 'i-mdi:checkbox-marked-circle-outline', color: '#10b981' },
  { label: 'Rozečtené', value: 'reading', icon: 'i-mdi:progress-clock', color: '#eab308' },
  { label: 'Nepřečtené', value: 'unread', icon: 'i-mdi:close-circle-outline', color: '#ef4444' },
]
const selected = ref(bookStates[0])
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
      <div v-if="isLoading" bg-base py2 rounded-lg>
        <div v-for="(width, i) in widths" :key="i" text-high-emphasis font-bold m-4 flex items-center gap4>
          <span bg-white:30 h-3 rounded animate-pulse :style="{ width: `${width[0]}%` }" />
          <span w="30%" bg-white:20 h-3 rounded block animate-pulse :style="{ width: `${width[1]}%` }" />
        </div>
      </div>
      <div v-else bg-base p4 rounded-lg>
        <div v-for="(value, key) in details" :key="key" text-high-emphasis font-bold m1 flex items-center gap4>
          {{ translation[key] }}:
          <span font-normal text-medium-emphasis>{{ value }}</span>
        </div>
      </div>
      <div mt4>
        <ASelect
          v-slot="{ attrs }"
          v-model="selected"
          :prepend-inner-icon="selected.icon"
        >
          <li
            v-for="bookState in bookStates"
            v-bind="attrs"
            :key="bookState"
            class="flex items-center gap-x-3"
            @click="selected = bookState"
          >
            <div :class="bookState.icon" :style="{ color: bookState.color }" />
            <span>{{ bookState.label }}</span>
          </li>
        </ASelect>
      </div>
    </div>
    <ABtn my1 @click="$router.push('/')">
      Zpět
    </ABtn>
  </div>
</template>
