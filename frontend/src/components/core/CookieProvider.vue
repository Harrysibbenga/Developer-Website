<script setup lang="ts">
import { onMounted } from 'vue'
import { cookieConsent, type Consent } from '../../stores/cookieStore'
import { useAnalyticsTracker } from '../../composables/useAnalyticsTracker'

useAnalyticsTracker()

function loadConsent() {
  const stored = document.cookie
    .split('; ')
    .find(row => row.startsWith('cookie-consent='))
  if (stored) {
    try {
      cookieConsent.value = JSON.parse(decodeURIComponent(stored.split('=')[1]))
    } catch (err) {
      console.warn('Failed to parse cookie consent:', err)
    }
  }
}

function saveConsent(newConsent: Consent) {
  cookieConsent.value = newConsent
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  document.cookie = `cookie-consent=${encodeURIComponent(
    JSON.stringify(newConsent)
  )};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`

  // Update analytics consent immediately
  updateAnalyticsConsent(newConsent.analytics)

  // Dispatch global event
  document.dispatchEvent(
    new CustomEvent('cookie-consent-updated', { detail: { consent: newConsent } })
  )
}

function updateAnalyticsConsent(hasConsent: boolean) {
  // Update gtag consent
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': hasConsent ? 'granted' : 'denied'
    })
  }

  // Update analytics manager if available
  if (window.analyticsManager) {
    window.analyticsManager.updateConsent(hasConsent)
  }

  console.log('📊 Analytics consent updated:', hasConsent)
}

function acceptAll() {
  saveConsent({
    essential: true,
    analytics: true,
    performance: true,
    marketing: false,
    timestamp: new Date().toISOString(),
  })
}

function rejectAll() {
  saveConsent({
    essential: true,
    analytics: false,
    performance: false,
    marketing: false,
    timestamp: new Date().toISOString(),
  })
}

onMounted(() => {
  loadConsent()
  
  // If consent exists, update analytics immediately
  if (cookieConsent.value) {
    updateAnalyticsConsent(cookieConsent.value.analytics)
  }
  
  console.log('🍪 Cookie consent loaded:', cookieConsent.value)
})
</script>

<template>
  <div>
    <slot :consent="cookieConsent" :acceptAll="acceptAll" :rejectAll="rejectAll" />
  </div>
</template>