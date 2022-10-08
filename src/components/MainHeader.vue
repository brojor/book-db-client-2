<script setup lang="ts">
const emit = defineEmits(['showDrawer'])

const filter = useFilter()
const searchTarget = computed(() => filter.displayedSubject === 'books' ? 'books' : 'authors')

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
        v-model="filter.searchBarValue"
        :placeholder="$t('searchbar.placeholder', { target: $t(`searchbar.${searchTarget}`) })"
        input-wrapper-classes="rounded-full border-0" prepend-inner-icon="i-material-symbols:search" placeholder:text-medium-emphasis bg-base
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
