import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
// UnoCSS import
import 'uno.css'

// import styles
import 'anu-vue/dist/style.css'
import i18n from './i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
