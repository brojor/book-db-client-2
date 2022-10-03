import { createPinia } from 'pinia'

import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'
import App from './App.vue'
import router from './router'

import './assets/main.css'
// UnoCSS import
import 'uno.css'

// import styles
import 'anu-vue/dist/style.css'

const i18n = createI18n({
  locale: 'cs',
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
