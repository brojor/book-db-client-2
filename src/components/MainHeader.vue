<script setup lang="ts">
const user = useUserStore()
const searchbar = useSearchStore()
const route = useRoute()

const placeholder = computed(() => {
  if (route.name === 'authors')
    return 'Hledat v autorech'
  else
    return 'Hledat v knihách'
})

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement
  searchbar.setValue(input.value)
}

const handleLogout = () => {
  user.logout()
}
</script>

<template>
  <header flex relative bg-canvas>
    <input
      autocomplete="off"
      type="text"
      :placeholder="placeholder"
      pt-18px
      pb-18px
      pl13
      w-full
      rounded-full
      m3
      bg-base
      un-placeholder="$color-text font-normal"
      text="$color-heading"
      font-medium
      border-none
      :value="searchbar.value"
      @input="handleInput"
    >
    <SearchIcon absolute top-26px left-7 text="2xl $color-text" rounded-full />
    <DotsVertical
      absolute
      top-26px
      right-7
      text="2xl $color-text"
      @click="handleLogout"
    />
  </header>
</template>

<style scoped></style>
