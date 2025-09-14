// src/utils/core/modules/PerformanceManager.ts
import { BaseModule } from './BaseModule'

interface PerformanceConfig {
  prefetchPages?: string[]
  monitorCore?: boolean
  enableVisibilityOptimizations?: boolean
}

export class PerformanceManager extends BaseModule {
  private perfObserver?: PerformanceObserver

  async initialize(): Promise<void> {
    if (this.initialized) return

    console.log('⚡ Performance Manager: Starting...')
    
    this.setupPagePrefetching()
    this.setupPerformanceMonitoring()
    this.setupVisibilityOptimizations()
    this.setupErrorHandling()
    
    this.initialized = true
    console.log('⚡ Performance Manager: Ready')
  }

  private setupPagePrefetching(): void {
    const defaultPages = ['/services', '/portfolio', '/contact']
    const pagesToPrefetch = this.config.prefetchPages || defaultPages

    // Only prefetch on good connections
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection?.effectiveType === '4g' || connection?.effectiveType === '3g') {
        this.prefetchPages(pagesToPrefetch)
      }
    } else {
      // Fallback: prefetch after a delay
      setTimeout(() => this.prefetchPages(pagesToPrefetch), 2000)
    }
  }

  private prefetchPages(pages: string[]): void {
    pages.forEach(page => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = page
      document.head.appendChild(link)
      console.log(`⚡ Prefetching: ${page}`)
    })
  }

  private setupPerformanceMonitoring(): void {
    if (!('PerformanceObserver' in window) || !this.config.monitorCore) return

    this.perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.handlePerformanceEntry(entry)
      }
    })

    try {
      this.perfObserver.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      })
    } catch (error) {
      console.warn('Performance monitoring not supported:', error)
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'largest-contentful-paint':
        console.log('⚡ LCP:', entry.startTime)
        if (entry.startTime > 2500) {
          console.warn('⚠️ Slow LCP detected')
        }
        break
        
      case 'first-input':
        const fidEntry = entry as PerformanceEventTiming
        const fid = fidEntry.processingStart - fidEntry.startTime
        console.log('⚡ FID:', fid)
        if (fid > 100) {
          console.warn('⚠️ High input delay detected')
        }
        break
        
      case 'layout-shift':
        const clsEntry = entry as any
        if (clsEntry.value > 0.1) {
          console.warn('⚠️ Layout shift detected:', clsEntry.value)
        }
        break
    }
  }

  private setupVisibilityOptimizations(): void {
    if (!this.config.enableVisibilityOptimizations) return

    this.addListener(document, 'visibilitychange', () => {
      const animatedElements = document.querySelectorAll('.animate-float, .animate-pulse-glow')
      
      if (document.hidden) {
        // Pause animations when tab is hidden
        animatedElements.forEach(el => {
          (el as HTMLElement).style.animationPlayState = 'paused'
        })
        
        // Pause any video elements
        document.querySelectorAll('video').forEach(video => video.pause())
      } else {
        // Resume animations when tab is visible
        animatedElements.forEach(el => {
          (el as HTMLElement).style.animationPlayState = 'running'
        })
      }
    })
  }

  private setupErrorHandling(): void {
    this.addListener(window, 'error', (e: ErrorEvent) => {
      if (e.target && (e.target as any).tagName === 'IMG') {
        const img = e.target as HTMLImageElement
        console.error('⚠️ Image failed to load:', img.src)
        
        // Hide failed images
        img.style.display = 'none'
        
        // Optionally show placeholder
        const placeholder = img.nextElementSibling
        if (placeholder?.classList.contains('img-placeholder')) {
          (placeholder as HTMLElement).style.display = 'block'
        }
      }
    }, true)

    // Handle unhandled promise rejections
    this.addListener(window, 'unhandledrejection', (e: PromiseRejectionEvent) => {
      console.error('⚠️ Unhandled promise rejection:', e.reason)
      // Optionally send to error reporting service
    })
  }

  public cleanup(): void {
    if (this.perfObserver) {
      this.perfObserver.disconnect()
      this.perfObserver = undefined
    }
    super.cleanup()
  }

  // Public API for measuring custom metrics
  public measureUserTiming(name: string, startMark?: string, endMark?: string): void {
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name, 'measure')[0]
        console.log(`⚡ ${name}:`, measure.duration)
      } catch (error) {
        console.warn('Failed to measure timing:', error)
      }
    }
  }

  public markUserTiming(name: string): void {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name)
    }
  }
}