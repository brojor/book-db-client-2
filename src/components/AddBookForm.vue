<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { BookToAdd } from '@/types'

const { t } = useI18n({ useScope: 'global' })

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
] as const

const languages = ["cs", "sk", "en", "de", "fr", "it"] as const
const languageOptions = languages.map(lang => ({ value: lang, label: t(`forms.AddBookForm.languages.${lang}`) }))

console.log(languageOptions);

</script>

<template>
  <form @submit.prevent="emit('submit')">
    <div v-for="(row, i) in formRows" :key="`row${i}`" flex gap2 mb2>
      <AInput v-for="item in row.items" :key="item.key" v-model="data[item.key]"
        :label="$t(`forms.AddBookForm.${item.key}`)" :type="item.type">
        <template v-if="isLoading" #prepend-inner>
          <div i-ph:spinner-gap ml2 animate-spin /><span text-sm op-70>{{ $t('forms.AddBookForm.loading') }}</span>
        </template>
      </AInput>
    </div>
    <ASelect v-model="data.language" :label="$t('forms.AddBookForm.language')" :options="languageOptions" />
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
