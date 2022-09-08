<script setup lang="ts">
import { AAlert, ABtn, ACheckbox, AInput } from 'anu-vue'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  formType: 'register' | 'login'
  loginError: boolean
  modelValue: {
    email: string
    password: string
    rememberMe: boolean
  }
}>()

const emit = defineEmits(['submit', 'update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

const showPassword = ref<boolean>(false)
const texts = computed(() =>
  props.formType === 'register'
    ? {
        title: 'Pro registraci zadejte svůj email a zvolte heslo:',
        button: 'Vytvořit účet',
      }
    : {
        title: 'Pro přihlášení zadejte své přihlašovací údaje',
        button: 'Přihlásit se',
      },
)
</script>

<template>
  <form mt16 @submit.prevent="$emit('submit')">
    <h2 text-base font-bold text-center mb4>
      {{ texts.title }}
    </h2>

    <AAlert v-if="loginError" color="danger" my4>
      Nesprávné přihlašovací údaje
    </AAlert>

    <div my2>
      <AInput
        v-model="data.email" type="email" label="Email"
        :hint="formType === 'register' ? 'Váš e-mail zůstane důvěrný' : ''"
      />
    </div>

    <!-- TODO - Find out why input type cannot be changed dynamically -->
    <div my2>
      <AInput
        v-if="showPassword" v-model="data.password" type="text" label="Heslo"
        :hint="formType === 'register' ? 'Heslo musí mít alespoň osm znaků' : ''"
      >
        <template #append-inner>
          <button i-mdi:eye-off-outline absolute right-3 @click="showPassword = !showPassword" />
        </template>
      </AInput>

      <AInput
        v-else v-model="data.password" type="password" label="Heslo"
        :hint="formType === 'register' ? 'Heslo musí mít alespoň osm znaků' : ''"
      >
        <template #append-inner>
          <button i-mdi:eye-outline absolute right-3 @click="showPassword = !showPassword" />
        </template>
      </AInput>
    </div>

    <div my4>
      <ACheckbox v-model="data.rememberMe">
        Pamatuj si mě
      </ACheckbox>
    </div>

    <ABtn w-full>
      {{ texts.button }}
    </ABtn>
  </form>
</template>
