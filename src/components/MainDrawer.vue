<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { isDark } from '@/stores/appState'
import apiService from '@/services/api'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const isOpen = useVModel(props, 'modelValue', emit)

const user = useUserStore()
const onChange = (e: Event) => {
  const language = (e.target as HTMLInputElement).value
  localStorage.setItem('locale', language)
  apiService.defaults.headers.common.AcceptLanguage = language
}
</script>

<template>
  <ADrawer
    v-model="isOpen"
  >
    <div flex flex-col justify-between flex-grow p4 h-full>
      <ASwitch
        v-model="isDark"
        label="Tmavý režim"
        on-icon="i-carbon-moon"
        off-icon=" i-carbon-sun"
      />
      <div flex gap-1>
        <select v-model="$i18n.locale" @change="onChange">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
            {{ locale }}
          </option>
        </select>
      </div>
      <ABtn icon="i-material-symbols:logout" @click="user.logout()">
        <span>Odhlásit se</span>
      </ABtn>
    </div>
  </ADrawer>
</template>
