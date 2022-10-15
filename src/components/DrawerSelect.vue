<script setup lang="ts">
import { useVModel } from '@vueuse/core'

interface MenuOption {
  icon: string
  label: string
  value: string
}

const props = defineProps<{
  modelValue: MenuOption
  options: Readonly<MenuOption[]>
  label?: string
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div mt3 flex items-center>
    <ASelect
      v-slot="{ attrs }" v-model="data" options-wrapper-classes="z-52" :label="label"
      :prepend-inner-icon="data.icon"
    >
      <li
        v-for="option in options" v-bind="attrs" :key="option.label" class="flex items-center gap-x-3"
        @click="data = option"
      >
        <i :class="option.icon" />
        <span>{{ option.label }}</span>
      </li>
    </ASelect>
  </div>
</template>
