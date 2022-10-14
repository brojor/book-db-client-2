import { presetCore, presetThemeDefault } from 'anu-vue'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'bg-canvas': 'bg-[#f8f8f8] dark:bg-[#202020]',
    'bg-base': 'bg-[#e6e6e6] dark:bg-[#2e2e2e]',
    'bg-accent': 'bg-[#0f766e]',
    'text-canvas': 'text-[#f8f8f8] dark:text-[#202020]',
    'avatar-scene': 'perspect-1k w-12 h-12',
    'avatar-object': 'w-full h-full relative transform-500 preserve-3d',
    'avatar-face': 'w-full h-full absolute backface-hidden rounded-full flex-center',
  },
  rules: [
    ['perspect-1k', { perspective: '1000px' }],
    ['transform-500', { transition: 'transform 500ms' }],
    ['backface-hidden', { 'backface-visibility': 'hidden' }],
    ['rotateY180', { transform: 'rotateY(180deg)' }],
  ],
  safelist: [ "i-mdi:home", "i-mdi:gift-outline", "i-mdi:checkbox-marked-circle-outline", "i-mdi:progress-clock", "i-mdi:close-circle-outline" ],
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
    presetThemeDefault({
      // shortcutOverrides: {
      //   // 'a-base-input-root': 'min-w-[150px] gap-y-1',
      // },
    }),

    presetAttributify({}),
  ],
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
})
