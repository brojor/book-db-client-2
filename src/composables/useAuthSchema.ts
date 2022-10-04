import { z } from 'zod'
import { toFormValidator } from '@vee-validate/zod'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useAuthSchema(formType: Ref<'login' | 'register'>) {
  const { t } = useI18n({ useScope: 'global' })

  const schema = {
    register: z.object({
      email: z.string().email({ message: t('validation.register.email') }),
      password: z.string().min(8, { message: t('validation.register.password') }),
    }),
    login: z.object({
      email: z.string().min(1, { message: t('validation.login.email') }),
      password: z.string().min(1, { message: t('validation.login.password') }),
    }),
  }

  const validationSchema = computed(() => toFormValidator(schema[formType.value]))
  const checkValidity = (values: Record<string, any>) => schema[formType.value].parse(values)
  return { validationSchema, checkValidity }
}

