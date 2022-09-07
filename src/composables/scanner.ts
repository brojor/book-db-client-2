import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
import { Capacitor } from '@capacitor/core'

export function useScanner() {
  if (!Capacitor.isNativePlatform())
    return {}
  BarcodeScanner.checkPermission({ force: true })

  const isScanning = ref<boolean>(false)

  const stopScan = () => {
    isScanning.value = false
    BarcodeScanner.showBackground()
    document.body.classList.remove('qrscanner')
    BarcodeScanner.stopScan()
  }

  const startScan = async () => {
    isScanning.value = true
    document.body.classList.add('qrscanner')
    BarcodeScanner.hideBackground()

    const result = await BarcodeScanner.startScan()
    if (result.hasContent) {
      stopScan()
      return result.content
    }
    return null
  }

  onBeforeUnmount(() => {
    stopScan()
  })

  onDeactivated(() => {
    stopScan()
  })

  return { startScan, stopScan, isScanning }
}
