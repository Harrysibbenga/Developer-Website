// src/composables/useAnalyticsTracker.ts
import { onMounted, onUnmounted } from 'vue'

export function useAnalyticsTracker() {
  let navigationHandler: (() => void) | null = null

  function trackPageView(path?: string, title?: string) {
    // Try analytics manager first
    if (window.analyticsManager?.isEnabled()) {
      window.analyticsManager.trackPageView(path, title)
      return
    }

    // Fallback to system manager
    if (window.systemManager?.isInitialized()) {
      window.systemManager.trackPageView(path, title)
      return
    }

    // Queue for later if neither is ready
    const page_path = path || location.pathname
    const page_title = title || document.title
    
    console.log('📊 Analytics not ready, queuing page view:', { page_path, page_title })
  }

  function trackEvent(action: string, category: string, label?: string, value?: number) {
    if (window.analyticsManager?.isEnabled()) {
      window.analyticsManager.trackEvent(action, category, label, value)
    } else if (window.systemManager?.isInitialized()) {
      window.systemManager.trackEvent(action, category, label, value)
    }
  }

  onMounted(() => {
    // Track the initial mount
    trackPageView()

    // Track Astro view transitions (soft navigation)
    navigationHandler = () => {
      // Small delay to ensure page title and content have updated
      setTimeout(() => {
        trackPageView()
      }, 100)
    }

    document.addEventListener('astro:after-swap', navigationHandler)

    // Also listen for system ready events
    const systemReadyHandler = () => {
      trackPageView()
    }
    document.addEventListener('system:ready', systemReadyHandler, { once: true })

    // Cleanup
    onUnmounted(() => {
      if (navigationHandler) {
        document.removeEventListener('astro:after-swap', navigationHandler)
      }
      document.removeEventListener('system:ready', systemReadyHandler)
    })
  })

  return {
    trackPageView,
    trackEvent,
    // Convenience methods
    trackClick: (element: string, location?: string) => {
      if (window.analyticsManager?.isEnabled()) {
        window.analyticsManager.trackClick(element, location)
      }
    },
    trackDownload: (filename: string, filetype?: string) => {
      if (window.analyticsManager?.isEnabled()) {
        window.analyticsManager.trackDownload(filename, filetype)
      }
    },
    trackScroll: (percentage: number) => {
      if (window.analyticsManager?.isEnabled()) {
        window.analyticsManager.trackScroll(percentage)
      }
    }
  }
}