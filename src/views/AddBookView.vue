<script setup lang="ts">
import { Capacitor } from '@capacitor/core'
import type { BookToAdd } from '@/types'
import apiService from '@/services/api'
import { useScanner } from '@/composables/scanner'

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

const fetchInfo = async (isbn: string) => {
  const { data } = await apiService.get(
    `http://192.168.1.133:3333/isbn/${isbn}`,
  )
  bookToAdd.value = {
    ...bookToAdd.value,
    ...data,
  }
}

const onStartScanning = async () => {
  bookToAdd.value = emptyForm
  isLoading.value = true

  const result = await startScan!()
  if (result) {
    bookToAdd.value.isbn = Number(result)
    await fetchInfo(result)
    isLoading.value = false
  }
  else {
    // TODO: error not found
  }
}

const onSubmit = async () => {
  await collection.addToCollection('default', bookToAdd.value)
  router.push('/')
}
</script>

<template>
  <div
    p4 grow bg="$color-background-soft" overflow-y="auto"
    :class="{ 'scanner-hide': isScanning }"
  >
    <h1 text-2xl m2 text-center>
      Přidání nové knihy
    </h1>
    <small block text-center m6>Předvyplnit pomocí kódu EAN</small>
    <button
      flex items-center gap2 mx-a p="y-2 x-3" bg-transparent
      border="1px solid teal-700 rounded" text-teal font-bold
      :disabled="!isNative" @click="onStartScanning"
    >
      <BarCodeIcon text="xl teal" />
      <p>Naskenovat kód</p>
    </button>
    <DividerWithText text="nebo vyplnit ručně" my8 />
    <AddBookForm
      v-model="bookToAdd" :is-loading="isLoading" @submit="onSubmit"
      @cancel="() => router.push('/')"
    />
    <ScannerUI v-if="isScanning" class="scanner-ui" @stop-scan="stopScan" />
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
