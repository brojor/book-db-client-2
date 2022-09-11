<script setup lang="ts">
const user = useUserStore()
const searchbar = useSearchStore()

const placeholder = computed(() => `Hledat v ${searchbar.display === 'books' ? 'knihách' : 'autorech'}`)
const handleLogout = () => {
  user.logout()
}
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
    handleLogout()
}
</script>

<template>
  <header flex relative bg-canvas px4 py2>
    <AInput
      v-model="searchbar.value" :placeholder="placeholder"
      input-wrapper-classes="rounded-full" prepend-inner-icon="i-material-symbols:search" bg-base
    >
      <template #append-inner>
        <button :class="searchbar.value ? 'i-mdi:close:' : 'i-mdi:dots-vertical'" right-4 absolute @click="buttonHandler" />
      </template>
    </AInput>
  </header>
</template>
