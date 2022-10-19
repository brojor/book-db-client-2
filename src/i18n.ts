import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import locale from '@/locale'

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages,
})
