import { z } from 'zod'
import { toFormValidator } from '@vee-validate/zod'
import type { Ref } from 'vue'

const schema = {
  register: z.object({
    email: z.string().email({ message: 'Zadejte prosím platný email' }),
    password: z.string().min(8, { message: 'Heslo musí mít alespoň 8 znaků' }),
  }),
  login: z.object({
    email: z.string().min(1, 'Bez emailu Vás nemohu přihlásit'),
    password: z.string().min(1, 'Bez hesla Vás nemohu přihlásit'),
  }),
}

export function useAuthSchema(formType: Ref<'login' | 'register'>) {
  const validationSchema = computed(() => toFormValidator(schema[formType.value]))
  const checkValidity = (values: Record<string, any>) => schema[formType.value].parse(values)
  return { validationSchema, checkValidity }
}

