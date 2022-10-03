<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import type { BookToAdd } from '@/types'

const props = defineProps<{
  modelValue: BookToAdd
  isLoading: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])
const data = useVModel(props, 'modelValue', emit)

const formRows = [
  { items: [{ key: 'title', type: 'text' }] },
  { items: [{ key: 'subtitle', type: 'text' }] },
  { items: [{ key: 'author', type: 'text' }] },
  { items: [{ key: 'publisher', type: 'text' }] },
  { items: [{ key: 'publishedDate', type: 'number' }, { key: 'pageCount', type: 'number' }] },
  { items: [{ key: 'language', type: 'text' }] },
] as const
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div v-for="(row, i) in formRows" :key="`row${i}`" flex gap2 mb2>
      <AInput
        v-for="item in row.items" :key="item.key" v-model="data[item.key]" :label="$t(`forms.AddBookForm.${item.key}`)" :type="item.type"
      >
        <template v-if="isLoading" #prepend-inner>
          <div i-ph:spinner-gap ml2 animate-spin /><span text-sm op-70>načítám...</span>
        </template>
      </AInput>
      <!-- TODO: for language should be used select element -->
    </div>
    <div mt8 flex gap2>
      <ABtn w="1/2" variant="outline" @click="emit('cancel')">
        {{ $t('forms.AddBookForm.buttons.cancel') }}
      </ABtn>
      <ABtn w="1/2" :disabled="props.isLoading">
        {{ $t('forms.AddBookForm.buttons.submit') }}
      </ABtn>
    </div>
  </form>
</template>
