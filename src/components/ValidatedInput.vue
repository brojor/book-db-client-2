<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { AInput } from 'anu-vue'
const props = defineProps<{
  name: string
}>()

const nameRef = toRef(props, 'name')
const { errorMessage, value, handleChange } = useField<string>(nameRef, undefined, { validateOnValueUpdate: false })

const validationListeners = computed(() => {
  // If the field is valid or have not been validated yet
  if (!errorMessage.value) {
    // lazy
    return {
      blur: handleChange,
      change: handleChange,
      // disable `shouldValidate` to avoid validating on input
      input: (e: Event) => handleChange(e, false),
    }
  }
  // Aggressive
  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange, // only switched this
  }
})
</script>

<template>
  <div>
    <AInput v-model="value" type="text" :error="errorMessage" v-on="validationListeners" />
  </div>
</template>
