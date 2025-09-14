// src/utils/core/modules/PageTransitionManager.ts
import { BaseModule } from './BaseModule'

export class PageTransitionManager extends BaseModule {
  async initialize(): Promise<void> {
    if (this.initialized) return

    console.log('🔄 Page Transition Manager: Starting...')
    
    this.setupTransitions()
    
    this.initialized = true
    console.log('🔄 Page Transition Manager: Ready')
  }

  private setupTransitions(): void {
    const loading = document.getElementById('page-loading')

    this.addListener(document, 'astro:before-preparation', () => {
      if (loading) {
        loading.style.display = 'block'
        loading.classList.remove('-translate-x-full')
      }
    })

    this.addListener(document, 'astro:after-swap', () => {
      if (loading) {
        loading.classList.add('-translate-x-full')
        setTimeout(() => loading.style.display = 'none', 300)
      }

      // Reinitialize system after page change
      setTimeout(() => {
        window.systemManager?.reinitialize()
      }, 200)
    })
  }
}