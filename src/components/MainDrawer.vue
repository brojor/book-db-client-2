<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { isDark } from '@/stores/appState'
import i18n from '@/i18n'
import apiService from '@/services/api'
import options from '@/assets/drawerOptions.json'

interface MenuOption { icon: string; label: string; value: string }
interface SortDirectionOption extends MenuOption { value: 'asc' | 'desc' }

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const isOpen = useVModel(props, 'modelValue', emit)

const collectionStore = useCollectionStore()
const user = useUserStore()
const { t } = useI18n({ useScope: 'global' })

const sortKeys = computed(() => {
  const sortKeys = options.sort.keys as MenuOption[]
  return sortKeys.map(({ value, icon }) => ({ label: t(`MainDrawer.sort.keys.${value}`), value, icon }))
})

const sortDirections = computed(() => {
  const sortDirections = options.sort.directions as SortDirectionOption[]
  return sortDirections.map(({ value, icon }) => ({ label: t(`MainDrawer.sort.directions.${value}`), value, icon }))
})

const selectedSortingMethod = reactive({
  key: sortKeys.value[0],
  direction: sortDirections.value[0],
})

const selectedLocale = ref(options.locales.find(l => l.value === i18n.global.locale.value) ?? options.locales[0])

watch(
  () => selectedLocale.value.value,
  (locale) => {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
    apiService.defaults.headers.common.AcceptLanguage = locale
  },
)

watch(
  () => selectedSortingMethod,
  (option) => {
    collectionStore.getCollection(collectionStore.activeCollectionName, {
      key: option.key.value,
      order: option.direction.value,
    })
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
        <DrawerSelect v-model="selectedLocale" :options="options.locales" :label="$t('MainDrawer.language')" />
        <DrawerSelect v-model="selectedSortingMethod.key" :options="sortKeys" :label="$t('MainDrawer.sort.title')" />
        <DrawerSelect v-model="selectedSortingMethod.direction" :options="sortDirections" />
      </div>

      <ABtn icon="i-material-symbols:logout" @click="user.logout()">
        <span>{{ $t('MainDrawer.logout') }}</span>
      </ABtn>
    </div>
  </ADrawer>
</template>
