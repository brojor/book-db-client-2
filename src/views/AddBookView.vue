<script setup lang="ts">
import { Capacitor } from '@capacitor/core'
import type { BookToAdd } from '@/types'
import apiService from '@/services/api'

const isNative = Capacitor.isNativePlatform()
const { startScan, stopScan, isScanning } = useScanner()
const collection = useCollectionStore()
const router = useRouter()

const emptyForm = {
  author: '',
  title: '',
}

const bookToAdd = ref<BookToAdd>(emptyForm)
const isLoading = ref(false)
const showWarning = ref(false)

const fetchInfo = async (isbn: string) => {
  const { data } = await apiService.get(`/isbn/${isbn}`)
  bookToAdd.value = {
    ...bookToAdd.value,
    ...data,
  }
}

const startScanning = async () => {
  if (!isNative)
    return showWarning.value = true

  bookToAdd.value = emptyForm
  isLoading.value = true

  const result = await startScan!()
  if (result) {
    bookToAdd.value.isbn = Number(result)
    await fetchInfo(result)
    isLoading.value = false
  }
  else {
    // TODO: handle scanning error
  }
}

const onSubmit = async () => {
  await collection.addToCollection(collection.activeCollectionName, bookToAdd.value)
  router.push('/')
}
const searchISBN = async () => {
  if (!bookToAdd.value.isbn)
    return
  isLoading.value = true
  await fetchInfo(bookToAdd.value.isbn.toString())
  isLoading.value = false
}
</script>

<template>
  <div p4 grow bg-canvas overflow-y="auto" :class="{ 'scanner-hide': isScanning }">
    <h1 text-2xl m2 text-center>
      {{ $t('AddBookView.title') }}
    </h1>
    <small block text-center m6>{{ $t('AddBookView.viaISBN') }}</small>
    <div flex items-center>
      <AInput
        v-model="bookToAdd.isbn" text-sm
        :placeholder="$t('AddBookView.inputPlaceholder')" type="number"
      >
        <template #append-inner>
          <ABtn v-if="!bookToAdd.isbn" icon-only icon="i-mdi:barcode-scan" ml-auto mr-1 @click="startScanning" />
          <ABtn v-else icon-only icon="i-material-symbols:search" ml-auto mr-1 @click="searchISBN" />
        </template>
      </AInput>
    </div>
    <DividerWithText :text="$t('AddBookView.manually')" my8 />
    <AddBookForm
      v-model="bookToAdd" :is-loading="isLoading" @submit="onSubmit"
      @cancel="() => router.push('/')"
    />
    <ScannerUI v-if="isScanning" class="scanner-ui" @stop-scan="stopScan" />
    <ADialog
      v-model="showWarning"
      :title="$t('AddBookView.warning.title')"
      :text="$t('AddBookView.warning.text')"
    >
      <div pb6 pt2 flex justify-center>
        <ABtn @click="showWarning = false">
          {{ $t('AddBookView.warning.button') }}
        </ABtn>
      </div>
    </ADialog>
  </div>
</template>

<style scoped>
.scanner-hide {
  background-color: transparent;
}

.scanner-hide > :not(.scanner-ui) {
  display: none;
}
</style>
