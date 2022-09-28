<script setup lang="ts">
const props = defineProps<{
  currentState: number
}>()
const bookStates = [
  { label: 'Seznam přání', value: 'wishlist', icon: 'i-mdi:gift-outline' },
  { label: 'Nepřečtené', value: 'unread', icon: 'i-mdi:close-circle-outline' },
  { label: 'Rozečtené', value: 'reading', icon: 'i-mdi:progress-clock' },
  { label: 'Přečtené', value: 'read', icon: 'i-mdi:checkbox-marked-circle-outline' },
] as const
const selected = ref<typeof bookStates[number]>(bookStates[props.currentState])

const collectionStore = useCollectionStore()
watchEffect(() => {
  collectionStore.activeCollectionName = selected.value.value
})
</script>

<template>
  <div>
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
        <div :class="bookState.icon" :style="{ color: `hsl(var(--c-${bookState.value}))` }" />
        <span>{{ bookState.label }}</span>
      </li>
    </ASelect>
  </div>
</template>

<style scoped>

</style>
