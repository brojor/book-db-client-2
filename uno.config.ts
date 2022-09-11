import { presetCore, presetThemeDefault } from 'anu-vue'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-canvas': 'bg-[#f8f8f8v] dark:bg-[#202020]',
    'bg-base': 'bg-[#e6e6e6] dark:bg-[#2e2e2e]',
    'bg-accent': 'bg-[#0f766e]',
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'height': '1.5em',
        'flex-shrink': '0',
      },
    }),

    // anu-vue presets
    presetCore(),
    presetThemeDefault(),

    presetAttributify({}),
  ],
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
})
