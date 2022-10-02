<script setup lang="ts">
const emit = defineEmits(['showDrawer'])

const filter = useFilter()
const placeholder = computed(() => `Hledat v ${filter.displayedSubject === 'books' ? 'knihách' : 'autorech'}`)

const deleteSearchbarValue = (e: Event) => {
  filter.searchBarValue = ''
  const button = e.target as HTMLButtonElement
  const input = button.previousElementSibling as HTMLInputElement
  input.focus()
}

const buttonHandler = (e: Event) => {
  if (filter.searchBarValue)
    deleteSearchbarValue(e)
  else
    emit('showDrawer')
}
</script>

<template>
  <div relative h16>
    <header flex relative bg-canvas px4 py2>
      <AInput
        v-model="filter.searchBarValue" :placeholder="placeholder"
        input-wrapper-classes="rounded-full" prepend-inner-icon="i-material-symbols:search" bg-base
      >
        <template #append-inner>
          <button
            :class="filter.searchBarValue ? 'i-mdi:close:' : 'i-mdi:dots-vertical'" right-0 absolute p="x6 y2"
            @click="buttonHandler"
          />
        </template>
      </AInput>
    </header>
    <ActionBar />
  </div>
</template>
