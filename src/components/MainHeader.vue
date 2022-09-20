<script setup lang="ts">
const emit = defineEmits(['showDrawer'])

const searchbar = useSearchStore()
const collectionStore = useCollectionStore()

const placeholder = computed(() => `Hledat v ${searchbar.display === 'books' ? 'knihách' : 'autorech'}`)

const deleteSearchbarValue = (e: Event) => {
  searchbar.clean()
  const button = e.target as HTMLButtonElement
  const input = button.previousElementSibling as HTMLInputElement
  input.focus()
}

const buttonHandler = (e: Event) => {
  if (searchbar.value)
    deleteSearchbarValue(e)
  else
    emit('showDrawer')
}
</script>

<template>
  <div relative h16>
    <header flex relative bg-canvas px4 py2>
      <AInput
        v-model="searchbar.value" :placeholder="placeholder"
        input-wrapper-classes="rounded-full" prepend-inner-icon="i-material-symbols:search" bg-base
      >
        <template #append-inner>
          <button :class="searchbar.value ? 'i-mdi:close:' : 'i-mdi:dots-vertical'" right-0 absolute p="x6 y2" @click="buttonHandler" />
        </template>
      </AInput>
    </header>
    <header
      bg-base p2 text-xl flex items-center absolute inset-x-0 top-0 z1 transition-all duration-300
      :class="collectionStore.selectedItemsCount ? 'opacity-100' : 'opacity-0  -translate-y-full'"
    >
      <ABtn
        icon="i-material-symbols:arrow-back" text-white icon-only variant="text"
        @click="collectionStore.removeSelectedItems()"
      />
      <span ml6>{{ collectionStore.selectedItemsCount }}</span>
    </header>
  </div>
</template>
