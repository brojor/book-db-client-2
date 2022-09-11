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
  <header flex relative bg-canvas px4 py2>
    <AInput
      v-model="searchbar.value" :placeholder="placeholder" input-wrapper-classes="rounded-full"
      prepend-inner-icon="i-material-symbols:search" bg-base
    >
      <template #append-inner>
        <button :class="searchbar.value ? 'i-mdi:close:' : 'i-mdi:dots-vertical'" right-4 absolute />
      </template>
    </AInput>
  </header>
</template>
