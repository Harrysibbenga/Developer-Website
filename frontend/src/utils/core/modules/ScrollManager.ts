// src/utils/core/modules/ScrollManager.ts
import { BaseModule } from './BaseModule'

export class ScrollManager extends BaseModule {
    private ticking = false
  
    async initialize(): Promise<void> {
      if (this.initialized) return
  
      console.log('📜 Scroll Manager: Starting...')
      
      this.setupBackToTop()
      this.setupScrollProgress()
      
      this.initialized = true
      console.log('📜 Scroll Manager: Ready')
    }
  
    private setupBackToTop(): void {
      const backToTop = document.getElementById('back-to-top')
      if (!backToTop) return
  
      const updateButton = this.throttle(() => {
        const show = window.pageYOffset > 300
        backToTop.classList.toggle('opacity-0', !show)
        backToTop.classList.toggle('invisible', !show)
      }, 100)
  
      this.addListener(window, 'scroll', updateButton, { passive: true })
      this.addListener(backToTop, 'click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  
    private setupScrollProgress(): void {
      const progress = document.getElementById('scroll-progress')
      if (!progress) return
  
      const updateProgress = this.throttle(() => {
        const scrolled = window.pageYOffset
        const height = document.documentElement.scrollHeight - window.innerHeight
        const percent = height > 0 ? (scrolled / height) : 0
        progress.style.transform = `scaleX(${percent})`
      }, 10)
  
      this.addListener(window, 'scroll', updateProgress, { passive: true })
    }
  }
  