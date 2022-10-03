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
      {{ $t('EnterView.title') }}
    </h1>
    <p text-center m="y-3 x-auto" w="5/6">
      {{ $t('EnterView.subtitle') }}
    </p>
    <EnterForm :form-type="formType" />
    <p mt12>
      {{ $t(`EnterView.question.${formType}`) }}
      <a text-primary tabIndex="0" @click="changeFormType">{{ $t(`EnterView.action.${formType}`) }}</a>
    </p>
  </div>
</template>
