<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import SpinnerIcon from './icons/SpinnerIcon.vue'
import type { BookToAdd } from '@/types'

const props = defineProps<{
  modelValue: BookToAdd
  isLoading: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])
const data = useVModel(props, 'modelValue', emit)

const formRows = [
  {
    items: [
      {
        label: 'Název knihy',
        key: 'title',
        type: 'text',
      },
    ],
  },
  {
    items: [
      {
        label: 'Podtitul',
        key: 'subtitle',
        type: 'text',
      },
    ],
  },
  {
    items: [
      {
        label: 'Autor',
        key: 'author',
        type: 'text',
      },
    ],
  },
  {
    items: [
      {
        label: 'Vydavatel',
        key: 'publisher',
        type: 'text',
      },
    ],
  },
  {
    items: [
      {
        label: 'Rok vydání',
        key: 'publishedDate',
        type: 'number',
      },
      {
        label: 'Počet stran',
        key: 'pageCount',
        type: 'number',
      },
    ],
  },
  {
    items: [
      {
        label: 'Jazyk',
        key: 'language',
        type: 'text',
      },
    ],
  },
] as const
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div v-for="(row, i) in formRows" :key="`row${i}`" flex gap2 mb2>
      <AInput
        v-for="item in row.items" :key="item.label" v-model="data[item.key]" :label="item.label" :type="item.type"
      />
      <!-- TODO: for language should be used select element -->
    </div>
    <div mt8 flex gap2>
      <ABtn grow variant="outline" @click="emit('cancel')">
        Zrušit
      </ABtn>
      <ABtn grow :disabled="props.isLoading">
        Přidat
      </ABtn>
    </div>
  </form>
</template>
