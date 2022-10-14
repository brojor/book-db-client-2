<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { isDark } from '@/stores/appState'
import i18n from '@/i18n'
import apiService from '@/services/api'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const isOpen = useVModel(props, 'modelValue', emit)

const locales = [
  {
    value: 'cs',
    icon: 'i-twemoji:flag-czechia',
    label: 'Čeština',
  },
  {
    value: 'en',
    icon: 'i-twemoji:flag-united-kingdom',
    label: 'English',
  },
  {
    value: 'sk',
    icon: 'i-twemoji:flag-slovakia',
    label: 'Slovenčina',
  },
]

const sortKeys = [
  {
    value: 'title',
    label: 'Title',
    icon: 'i-mdi:alphabetical-variant',
  },
  {
    value: 'publishedDate',
    label: 'Published date',
    icon: 'i-material-symbols:calendar-month-outline',
  },
  {
    value: 'pageCount',
    label: 'Page count',
    icon: 'i-fluent:document-page-bottom-right-24-regular',
  },
]

const sortDirections = [
  {
    value: 'asc',
    label: 'Ascending',
    icon: 'i-mdi:arrow-up',
  },
  {
    value: 'desc',
    label: 'Descending',
    icon: 'i-mdi:arrow-down',
  },
] as const

const sort = reactive({
  key: sortKeys[0],
  direction: sortDirections[0],
})

const collectionStore = useCollectionStore()

const selectedLocale = ref(locales.find(l => l.value === i18n.global.locale.value) ?? locales[0])

const user = useUserStore()
watch(() => selectedLocale.value.value,
  (locale) => {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
    apiService.defaults.headers.common.AcceptLanguage = locale
  },
)

watch(() => sort,
  (option) => {
    collectionStore.getCollection(collectionStore.activeCollectionName,
      { key: option.key.value, order: option.direction.value })
  },
  { deep: true },
)
</script>

<template>
  <ADrawer v-model="isOpen">
    <div flex flex-col justify-between h-full p4>
      <div>
        <h1 text-2xl mb4 text-primary>
          {{ $t('MainDrawer.title') }}
        </h1>
        <ASwitch v-model="isDark" :label="$t('MainDrawer.darkMode')" on-icon="i-carbon-moon" off-icon=" i-carbon-sun" />
        <DrawerSelect v-model="selectedLocale" :options="locales" :label="$t('MainDrawer.language')" />
        <DrawerSelect v-model="sort.key" :options="sortKeys" :label="$t('MainDrawer.sort')" />
        <DrawerSelect v-model="sort.direction" :options="sortDirections" />
      </div>

      <ABtn icon="i-material-symbols:logout" @click="user.logout()">
        <span>{{ $t('MainDrawer.logout') }}</span>
      </ABtn>
    </div>
  </ADrawer>
</template>
