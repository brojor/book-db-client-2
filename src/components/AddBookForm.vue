<script setup lang="ts">
import SpinnerIcon from './icons/SpinnerIcon.vue'
import type { BookToAdd } from '@/types'

const props = defineProps<{
  modelValue: BookToAdd
  isLoading: boolean
}>()

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const importanceLevel = ref<number>(1)

const onInput = (field: keyof BookToAdd, event: Event) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: (event.target as HTMLInputElement).value,
  })
}

const formItems = [
  {
    label: 'Autor',
    name: 'author',
    type: 'text',
    placeholder: 'Jméno a příjmení',
    importance: 1,
  },
  {
    label: 'Titul',
    name: 'title',
    type: 'text',
    placeholder: 'Název knihy',
    importance: 1,
  },
  {
    label: 'Podtitul',
    name: 'subtitle',
    type: 'text',
    placeholder: 'Podtitul',
    importance: 1,
  },
  {
    label: 'ISBN',
    name: 'isbn',
    type: 'text',
    placeholder: 'Kód ISBN',
    importance: 2,
  },
  {
    label: 'Počet stran',
    name: 'pageCount',
    type: 'number',
    placeholder: 'Počet stran',
    importance: 2,
  },
  {
    label: 'Vydavatel',
    name: 'publisher',
    type: 'text',
    placeholder: 'Název vydavatele',
    importance: 2,
  },
  {
    label: 'Rok vydání',
    name: 'publishedDate',
    type: 'number',
    placeholder: 'Rok vydání',
    importance: 2,
  },
  {
    label: 'Jazyk',
    name: 'language',
    type: 'text',
    placeholder: 'Jazyk',
    importance: 2,
  },
] as const
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <template v-for="formItem in formItems" :key="formItem.name">
      <div v-if="importanceLevel >= formItem.importance" flex="~ col" relative>
        <label mb1 :for="formItem.name">{{ formItem.label }}</label>
        <input
          :id="formItem.name"
          :type="formItem.type"
          autocomplete="off"
          :placeholder="props.isLoading ? `${' '.repeat(6)}Načítám...` : formItem.placeholder"
          class="input-base"
          p3
          rounded
          :class="{ 'placeholder:italic': props.isLoading }"
          :value="props.modelValue[formItem.name]"
          @input="onInput(formItem.name, $event)"
        >
        <SpinnerIcon v-if="props.isLoading" absolute bottom-3 left-3 text-teal animate-spin text-lg />
      </div>
    </template>
    <p v-if="importanceLevel === 1" m2 @click="importanceLevel += 1">
      Další pole
    </p>
    <div mt8 flex gap2>
      <button
        text="teal-700 center"
        p2
        w="1/3"
        font-bold
        bg-transparent
        border="1px solid teal700"
        rounded
        @click="emit('cancel')"
      >
        Zrušit
      </button>
      <button
        type="submit"
        p2
        bg-teal700
        border-none
        rounded
        text-white
        text-base
        font-bold
        grow
      >
        Přidat
      </button>
    </div>
  </form>
</template>
