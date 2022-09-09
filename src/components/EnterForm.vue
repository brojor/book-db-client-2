<script setup lang="ts">
import { AAlert, ABtn, ACheckbox } from 'anu-vue'
import { useVModel } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

import ValidatedInput from './ValidatedInput.vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

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

const userStore = useUserStore()

interface ValidatorError {
  field: string
  message: string
}
const rememberMe = ref<boolean>(true)
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

/* Validation */
const zodSchema = zod.object({
  email: zod.string().email({ message: 'Zadejte prosím platný email' }),
  password: zod.string().min(8, { message: 'Heslo musí mít alespoň 8 znaků' }),
})
const validationSchema = toFormValidator(zodSchema)

/* Submission */
const { handleSubmit, setFieldError } = useForm({ validationSchema })

const onSubmit = handleSubmit(async (values) => {
  const credentials = zodSchema.parse(values) // adds correct typing
  try {
    await userStore[props.formType](credentials, rememberMe.value)
    router.push('/')
  }
  catch (error: any) {
    const { errors } = error.response.data
    errors.forEach(({ field, message }: ValidatorError) => setFieldError(field, message))
  }
})
</script>

<template>
  <form mt16 @submit.prevent="onSubmit">
    <h2 text-base font-bold text-center mb4>
      {{ texts.title }}
    </h2>

    <AAlert v-if="loginError" color="danger" my4>
      Nesprávné přihlašovací údaje
    </AAlert>

    <ValidatedInput name="email" type="text" label="Email" />

    <ValidatedInput name="password" :type="showPassword ? 'text' : 'password'" label="Heslo">
      <button v-if="showPassword" i-mdi:eye-off-outline absolute right-3 @click="showPassword = !showPassword" />
      <button v-else i-mdi:eye-outline absolute right-3 @click="showPassword = !showPassword" />
    </ValidatedInput>

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
