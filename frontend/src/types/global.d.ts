declare global {
    interface Window {
      gtag: (...args: any[]) => void
      dataLayer: any[]
      GA_MEASUREMENT_ID: string
      analyticsManager: AnalyticsManager
      systemManager: any
      SystemManagerClass: any
      showGlobalCookieModal: () => void
      closeGlobalCookieModal: () => void
      checkSystemStatus: () => any
      reinitializeSystem: () => Promise<boolean>
    }
  }
  
  export {}
  