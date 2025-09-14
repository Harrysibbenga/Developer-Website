// src/composables/useAnalyticsTracker.ts
import { onMounted, onUnmounted } from 'vue'

export function useAnalyticsTracker() {
  function trackPageView() {
    if (window.analyticsManager?.isEnabled()) {
      window.analyticsManager.trackPageView(
        location.pathname,
        document.title
      )
      console.log('📊 Page view tracked:', location.pathname)
    }
  }

  onMounted(() => {
    // Track the initial mount
    trackPageView()

    // Track Astro view transitions (soft navigation)
    const handler = () => trackPageView()
    document.addEventListener('astro:after-swap', handler)

    // Clean up
    onUnmounted(() => {
      document.removeEventListener('astro:after-swap', handler)
    })
  })
}
