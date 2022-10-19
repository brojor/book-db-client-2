import options from '@/assets/drawerOptions.json'

const availableLocales = options.locales.map(locale => locale.value)
const prefferedLocale = navigator.language.split('-')[0]

const locale = localStorage.getItem('locale') || (availableLocales.includes(prefferedLocale) ? prefferedLocale : 'en')

export default locale
