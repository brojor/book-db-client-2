<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import apiService from '@/services/api'
import { useCollectionStore } from '@/stores/collection'
import EnterForm from '@/components/EnterForm.vue'

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

interface Credentials {
  email: string
  password: string
  rememberMe: boolean
}
type FormType = 'register' | 'login'

const user = useUserStore()
const collectionStore = useCollectionStore()
const router = useRouter()

const credentials = ref<Credentials>({
  email: '',
  password: '',
  rememberMe: false,
})

const loginError = ref<boolean>(false)

const formType = ref<FormType>('register')

// const emailIsValid = computed(() => {
//   return credentials.value.email.length > 0 && emailRegex.test(credentials.value.email)
// })
// const passwordIsValid = computed(() => {
//   return credentials.value.password.length > 8
// })

const changeFormType = () => {
  formType.value = formType.value === 'register' ? 'login' : 'register'
}

const login = async () => {
  loginError.value = false
  try {
    const response = await apiService.post(`/${formType.value}`, credentials)
    const token = response.data.token
    user.setToken(token, { rememberMe: credentials.value.rememberMe })
    await collectionStore.getCollection('default')
    await collectionStore.getCollection('wishlist')
    router.push('/')
  }
  catch (error: any) {
    if (error.response.data.error === 'Invalid credentials')
      loginError.value = true
  }
}

const handleSubmit = async () => {
  // if (emailIsValid.value && passwordIsValid.value)
  login()
}
</script>

<template>
  <div bg="$color-background-soft" w-full h-screen p-2 flex="~ col">
    <h1 font="bold" text-2xl text-center>
      Vítejte v databázi knih
    </h1>
    <p text-center m="y-3 x-auto" w="5/6">
      Na místě, kde máte dokonalý přehled o své sbírce knih.
    </p>
    <EnterForm v-model="credentials" :form-type="formType" :login-error="loginError" />
    <p mt8>
      {{ formType === 'register' ? 'Máte již účet?' : 'Nemáte účet? ' }}
      <a text-teal-500 tabIndex="0" @click="changeFormType">{{
        formType === 'register' ? 'Přihlašte se' : 'Zaregistrujte se'
      }}</a>
    </p>
  </div>
</template>
