// src/utils/core/modules/AnalyticsManager.ts
import { ANALYTICS_CONFIG } from '../../constants'

interface SystemConfig {
  gaId?: string
  enableAnalytics?: boolean
  debugMode?: boolean
}

export class AnalyticsManager {
  private isInitialized = false
  private consentGiven = false
  private config: SystemConfig
  private pageViewQueue: Array<{path: string, title: string}> = []

  constructor(config: SystemConfig = {}) {
    this.config = config
    
    // Make available globally for composables
    window.analyticsManager = this
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    console.log('📊 Analytics Manager: Initializing...')

    // Check for existing consent
    this.checkExistingConsent()

    // Listen for consent changes
    this.setupConsentListener()

    // Listen for page navigation events (Astro view transitions)
    this.setupNavigationTracking()

    this.isInitialized = true
    console.log('📊 Analytics Manager: Ready')
  }

  private checkExistingConsent(): void {
    const stored = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookie-consent='))
    
    if (stored) {
      try {
        const consent = JSON.parse(decodeURIComponent(stored.split('=')[1]))
        if (consent?.analytics) {
          this.updateConsent(true)
        }
      } catch (err) {
        console.warn('Failed to parse existing consent:', err)
      }
    }
  }

  private setupConsentListener(): void {
    document.addEventListener('cookie-consent-updated', (event: CustomEvent) => {
      const { consent } = event.detail
      this.updateConsent(consent?.analytics || false)
    })
  }

  private setupNavigationTracking(): void {
    // Track Astro view transitions
    document.addEventListener('astro:after-swap', () => {
      // Small delay to ensure title has updated
      setTimeout(() => {
        this.trackPageView()
      }, 100)
    })

    // Track initial page load
    if (document.readyState === 'complete') {
      this.trackPageView()
    } else {
      window.addEventListener('load', () => {
        this.trackPageView()
      })
    }
  }

  async updateConsent(hasConsent: boolean): Promise<void> {
    const wasEnabled = this.consentGiven
    this.consentGiven = hasConsent

    if (hasConsent && !wasEnabled) {
      // Consent granted - load analytics
      await this.loadGoogleAnalytics()
      
      // Process queued page views
      this.processPageViewQueue()
    } else if (!hasConsent && wasEnabled) {
      // Consent revoked - update gtag
      if (window.gtag) {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        })
      }
    } else if (hasConsent && window.gtag) {
      // Update consent if gtag already loaded
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })
    }

    console.log('📊 Analytics consent updated:', hasConsent)
  }

  private async loadGoogleAnalytics(): Promise<void> {
    if (window.gtag) return // Already loaded

    const gaId = this.config.gaId || ANALYTICS_CONFIG.GA_MEASUREMENT_ID
    
    try {
      // Load gtag script
      const script = document.createElement('script')
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
      document.head.appendChild(script)

      // Wait for script to load
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
      })

      // Initialize gtag
      window.dataLayer = window.dataLayer || []
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }

      window.gtag('js', new Date())
      window.gtag('config', gaId, {
        debug_mode: this.config.debugMode || ANALYTICS_CONFIG.DEBUG,
        send_page_view: false, // We handle page views manually
        anonymize_ip: true, // GDPR compliance
        allow_google_signals: this.consentGiven,
        allow_ad_personalization_signals: false // Keep strict for privacy
      })

      // Update consent immediately
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      })

      console.log('📊 Google Analytics loaded successfully')
    } catch (error) {
      console.error('📊 Failed to load Google Analytics:', error)
    }
  }

  private processPageViewQueue(): void {
    while (this.pageViewQueue.length > 0) {
      const { path, title } = this.pageViewQueue.shift()!
      this.trackPageView(path, title)
    }
  }

  isEnabled(): boolean {
    return this.isInitialized && this.consentGiven && !!window.gtag
  }

  trackPageView(path?: string, title?: string): void {
    const page_path = path || window.location.pathname
    const page_title = title || document.title

    if (!this.consentGiven) {
      // Queue for later if consent not given yet
      this.pageViewQueue.push({ path: page_path, title: page_title })
      return
    }

    if (!this.isEnabled()) return

    const gaId = this.config.gaId || ANALYTICS_CONFIG.GA_MEASUREMENT_ID || window.GA_MEASUREMENT_ID

    window.gtag('config', gaId, {
      page_path,
      page_title,
      custom_map: {
        dimension1: 'page_category'
      }
    })

    if (this.config.debugMode || ANALYTICS_CONFIG.DEBUG) {
      console.log('📊 Page view tracked:', { page_path, page_title })
    }
  }

  trackEvent(action: string, category: string, label?: string, value?: number, customParams?: Record<string, any>): void {
    if (!this.isEnabled()) return

    const eventData: any = {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams
    }

    window.gtag('event', action, eventData)

    if (this.config.debugMode || ANALYTICS_CONFIG.DEBUG) {
      console.log('📊 Event tracked:', { action, category, label, value, customParams })
    }
  }

  // Convenience methods for common events
  trackClick(element: string, location?: string): void {
    this.trackEvent('click', 'engagement', element, undefined, { location })
  }

  trackDownload(filename: string, filetype?: string): void {
    this.trackEvent('download', 'file', filename, undefined, { file_type: filetype })
  }

  trackScroll(percentage: number): void {
    this.trackEvent('scroll', 'engagement', `${percentage}%`, percentage)
  }

  trackTiming(category: string, variable: string, value: number, label?: string): void {
    this.trackEvent('timing_complete', category, label, value, { 
      name: variable,
      value: value 
    })
  }

  cleanup(): void {
    // Remove event listeners
    document.removeEventListener('cookie-consent-updated', this.setupConsentListener)
    document.removeEventListener('astro:after-swap', this.setupNavigationTracking)
    
    // Clear queued events
    this.pageViewQueue = []
    
    // Remove global reference
    if (window.analyticsManager === this) {
      delete window.analyticsManager
    }
  }
}

// Global type augmentation
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    GA_MEASUREMENT_ID: string
    analyticsManager: AnalyticsManager
  }
}