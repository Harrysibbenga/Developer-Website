// src/composables/useCookieConsent.ts
import { ref } from 'vue'
import type { Consent } from '../components/core/CookieProvider.vue'

const consent = ref<Consent | null>(null)

function loadConsent() {
  const stored = document.cookie.split('; ').find(row => row.startsWith('cookie-consent='))
  if (stored) {
    try {
      consent.value = JSON.parse(decodeURIComponent(stored.split('=')[1]))
    } catch (err) {
      console.warn('Failed to parse cookie consent:', err)
    }
  }
}

function saveConsent(c: Consent) {
  consent.value = c
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  document.cookie = `cookie-consent=${encodeURIComponent(JSON.stringify(c))};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`

  document.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: { consent: c } }))
}

function acceptAll() {
  saveConsent({
    essential: true,
    analytics: true,
    performance: true,
    marketing: false,
    timestamp: new Date().toISOString()
  })
}

function rejectAll() {
  saveConsent({
    essential: true,
    analytics: false,
    performance: false,
    marketing: false,
    timestamp: new Date().toISOString()
  })
}

export function useCookieConsent() {
  if (!consent.value) loadConsent()
  return {
    consent,
    loadConsent,
    saveConsent,
    acceptAll,
    rejectAll
  }
}
