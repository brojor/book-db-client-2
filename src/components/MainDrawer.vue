<script setup lang="ts">
import { useDark, useVModel } from '@vueuse/core'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])
const isOpen = useVModel(props, 'modelValue', emit)

const isDark = useDark()

const user = useUserStore()
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
      <ABtn icon="i-material-symbols:logout" @click="user.logout()">
        <span>Odhlásit se</span>
      </ABtn>
    </div>
  </ADrawer>
</template>
