import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

const locale = localStorage.getItem('locale') || 'cs'

export default createI18n({
    legacy: false,
    locale,
    fallbackLocale: 'en',
    messages,
  })