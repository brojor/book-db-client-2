<script setup lang="ts">
import { AAlert, ABtn, ACheckbox } from 'anu-vue'
import { useForm } from 'vee-validate'
import { toFormValidator } from '@vee-validate/zod'
import * as zod from 'zod'

import ValidatedInput from './ValidatedInput.vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

interface ValidatorError {
  field: string
  message: string
}

const props = defineProps<{
  formType: 'register' | 'login'
}>()

const userStore = useUserStore()

const rememberMe = ref<boolean>(true)
const loginError = ref<boolean>(false)
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
const schema = {
  register: zod.object({
    email: zod.string().email({ message: 'Zadejte prosím platný email' }),
    password: zod.string().min(8, { message: 'Heslo musí mít alespoň 8 znaků' }),
  }),
  login: zod.object({
    email: zod.string().min(1, 'Bez emailu Vás nemohu přihlásit'),
    password: zod.string().min(1, 'Bez hesla Vás nemohu přihlásit'),
  }),
}
const validationSchema = computed(() => toFormValidator(schema[props.formType]))

const { handleSubmit, setFieldError } = useForm({ validationSchema })

/* Submission */
const onSubmit = handleSubmit(async (values) => {
  // loginError.value = false
  const credentials = schema[props.formType].parse(values) // adds correct typing
  try {
    await userStore[props.formType](credentials, rememberMe.value)
    router.push('/')
  }
  catch (error: any) {
    if (error.response.status === 401)
      loginError.value = true
    if (error.response.status === 422) {
      const { errors } = error.response.data
      errors.forEach(({ field, message }: ValidatorError) => setFieldError(field, message))
    }
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

    <ValidatedInput name="email" type="text" label="Email" @focus="loginError = false" />

    <ValidatedInput name="password" :type="showPassword ? 'text' : 'password'" label="Heslo" @focus="loginError = false">
      <button v-if="showPassword" i-mdi:eye-off-outline absolute right-3 @click="showPassword = !showPassword" />
      <button v-else i-mdi:eye-outline absolute right-3 @click="showPassword = !showPassword" />
    </ValidatedInput>

    <div my4>
      <ACheckbox v-model="rememberMe">
        Pamatuj si mě
      </ACheckbox>
    </div>

    <ABtn w-full>
      {{ texts.button }}
    </ABtn>
  </form>
</template>
