import { ref } from 'vue'

export type Consent = {
  essential: boolean
  analytics: boolean
  performance: boolean
  marketing: boolean
  timestamp: string
}

export const cookieConsent = ref<Consent | null>(null)
