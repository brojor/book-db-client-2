<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BookStateOption } from '@/types'
import { BookState } from '@/types'

const props = defineProps<{
  currentState: number
}>()

const emit = defineEmits<{ (e: 'update:state', state: keyof typeof BookState): void }>()

const { t } = useI18n({ useScope: 'global' })

const bookStates = collectionList.slice(1)
  .map(({ id: value, icon }) => ({ value, label: t(`collections.${value}`), icon })) as BookStateOption[]

const selected = ref(bookStates.find(({ value }) => value === BookState[props.currentState])!)

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
        v-for="bookState in bookStates" v-bind="attrs" :key="bookState" class="flex items-center gap-x-3"
        @click="selected = bookState"
      >
        <i :class="`i-${bookState.icon}`" :style="{ color: `hsl(var(--c-${bookState.value}))` }" />
        <span>{{ bookState.label }}</span>
      </li>
    </ASelect>
  </div>
</template>
