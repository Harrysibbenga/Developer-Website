// src/utils/core/modules/BaseModule.ts
/**
 * Base Module - Abstract class for all system modules
 */

export abstract class BaseModule {
    protected initialized = false
    protected eventListeners: Array<{
      element: Element | Document | Window
      event: string
      handler: EventListener
      options?: AddEventListenerOptions
    }> = []
    protected observers: Map<string, IntersectionObserver | MutationObserver | ResizeObserver> = new Map()
    protected timers: Set<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>> = new Set()
  
    constructor(protected config: any = {}) {}
  
    abstract initialize(): Promise<void> | void
  
    protected addListener(
      element: Element | Document | Window,
      event: string,
      handler: EventListener,
      options?: AddEventListenerOptions
    ): void {
      element.addEventListener(event, handler, options)
      this.eventListeners.push({ element, event, handler, options })
    }
  
    protected addObserver(name: string, observer: IntersectionObserver | MutationObserver | ResizeObserver): void {
      this.observers.set(name, observer)
    }
  
    protected addTimer(timer: ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>): void {
      this.timers.add(timer)
    }
  
    protected debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
      let timeout: ReturnType<typeof setTimeout>
      return ((...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
        this.addTimer(timeout)
      }) as T
    }
  
    protected throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
      let inThrottle: boolean
      return ((...args: any[]) => {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          const timeout = setTimeout(() => inThrottle = false, limit)
          this.addTimer(timeout)
        }
      }) as T
    }
  
    public cleanup(): void {
      // Remove event listeners
      this.eventListeners.forEach(({ element, event, handler, options }) => {
        element.removeEventListener(event, handler, options)
      })
      this.eventListeners = []
  
      // Disconnect observers
      this.observers.forEach(observer => observer.disconnect())
      this.observers.clear()
  
      // Clear timers
      this.timers.forEach(timer => clearTimeout(timer))
      this.timers.clear()
  
      this.initialized = false
    }
  
    public isInitialized(): boolean {
      return this.initialized
    }
  }