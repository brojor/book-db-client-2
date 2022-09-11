<script setup lang="ts">
type FormType = 'register' | 'login'

const formType = ref<FormType>('login')

const changeFormType = () => {
  formType.value = formType.value === 'register' ? 'login' : 'register'
}
</script>

<template>
  <div bg-canvas w-full h-screen p-6 flex="~ col">
    <h1 font="bold" text-2xl text-center>
      Vítejte v databázi knih
    </h1>
    <p text-center m="y-3 x-auto" w="5/6">
      Na místě, kde máte dokonalý přehled o své sbírce knih.
    </p>
    <EnterForm :form-type="formType" />
    <p mt12>
      {{ formType === 'register' ? 'Máte již účet?' : 'Nemáte účet? ' }}
      <a text-teal-500 tabIndex="0" @click="changeFormType">{{
        formType === 'register' ? 'Přihlašte se' : 'Zaregistrujte se'
      }}</a>
    </p>
  </div>
</template>
