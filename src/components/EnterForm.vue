<script setup lang="ts">
import { useForm } from 'vee-validate'

import { useAuthSchema } from '../composables/useAuthSchema'
import ValidatedInput from './ValidatedInput.vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'
import labels from '@/assets/EnterViewTexts.json'

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

const texts = computed(() => labels[props.formType])

const { validationSchema, checkValidity } = useAuthSchema(toRef(props, 'formType'))
const { handleSubmit, setFieldError } = useForm({ validationSchema })

/* Submission */
const onSubmit = handleSubmit(async (values) => {
  const credentials = checkValidity(values)
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

    <Transition name="bounce">
      <AAlert v-if="loginError" color="danger" my4>
        Nesprávné přihlašovací údaje
      </AAlert>
    </Transition>

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
