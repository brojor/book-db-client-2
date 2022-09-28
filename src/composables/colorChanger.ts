import { useCssVar } from '@vueuse/core'

export function useColorChanger() {
  const collectionStore = useCollectionStore()
  const el = document.getElementById('app')
  const color = useCssVar('--a-primary', el)
  watch(
    () => collectionStore.activeCollectionName,
    (collectionName) => {
      color.value = `var(--c-${collectionName})`
    },
  )
}

