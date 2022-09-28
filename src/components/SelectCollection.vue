<script setup lang="ts">
import type { BookState } from '@/types'

const props = defineProps<{
  currentState: number
}>()

const emit = defineEmits({
  'update:state': (state: keyof typeof BookState) => true,
})

const bookStates = [
  { label: 'Seznam přání', value: 'wishlist', icon: 'i-mdi:gift-outline' },
  { label: 'Nepřečtené', value: 'unread', icon: 'i-mdi:close-circle-outline' },
  { label: 'Rozečtené', value: 'reading', icon: 'i-mdi:progress-clock' },
  { label: 'Přečtené', value: 'read', icon: 'i-mdi:checkbox-marked-circle-outline' },
] as const
const selected = ref<typeof bookStates[number]>(bookStates[props.currentState])

const collectionStore = useCollectionStore()
watch(selected, (value) => {
  collectionStore.activeCollectionName = value.value
  emit('update:state', value.value)
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
