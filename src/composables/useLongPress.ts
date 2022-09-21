import { Haptics } from '@capacitor/haptics'
import type { Ref } from 'vue'

export function useLongPress(el: Ref<HTMLElement | null>, callback: () => void) {
  const longPressTimer = ref<NodeJS.Timeout>()

  const handleLongPress = async () => {
    await Haptics.vibrate({ duration: 10 })
    el.value?.classList.remove('pressed')
    callback()
  }

  return {
    touchstart: () => {
      el.value?.classList.add('pressed')
      longPressTimer.value = setTimeout(() => {
        handleLongPress()
      }, 450)
    },
    touchmove: () => {
      clearTimeout(longPressTimer.value)
      el.value?.classList.remove('pressed')
    },
    touchend: () => {
      clearTimeout(longPressTimer.value)
      el.value?.classList.remove('pressed')
    },
  }
}
