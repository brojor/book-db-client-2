<script setup lang="ts">
import type { BookState } from '@/types'

const props = defineProps<{
  currentState: number
}>()

const emit = defineEmits<{ (e: 'update:state', state: keyof typeof BookState): void }>()

const bookStates = collectionList.slice(1).map(({ id: value, title: label, icon }) => ({ value, label, icon })) as {
  value: keyof typeof BookState
  label: string
  icon: string
}[]
const selected = ref<typeof bookStates[number]>(bookStates[props.currentState])

const collectionStore = useCollectionStore()
watch(selected, (value) => {
  collectionStore.activeCollectionName = value.value
  emit('update:state', value.value)
})
</script>

<template>
  <div>
    <ASelect v-slot="{ attrs }" v-model="selected" :prepend-inner-icon="`i-${selected.icon}`">
      <li
        v-for="bookState in bookStates"
        v-bind="attrs"
        :key="bookState"
        class="flex items-center gap-x-3"
        @click="selected = bookState"
      >
        <i :class="`i-${bookState.icon}`" :style="{ color: `hsl(var(--c-${bookState.value}))` }" />
        <span>{{ bookState.label }}</span>
      </li>
    </ASelect>
  </div>
</template>
