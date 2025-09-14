// src/utils/core/modules/NavigationManager.ts
import { BaseModule } from './BaseModule'

export class NavigationManager extends BaseModule {
  async initialize(): Promise<void> {
    if (this.initialized) return

    console.log('🧭 Navigation Manager: Starting...')
    
    this.setupMobileMenu()
    this.setupSmoothScrolling()
    
    this.initialized = true
    console.log('🧭 Navigation Manager: Ready')
  }

  private setupMobileMenu(): void {
    const button = document.getElementById('mobile-menu-button')
    const menu = document.getElementById('mobile-menu')
    
    if (!button || !menu) return

    const toggleMenu = () => {
      const expanded = button.getAttribute('aria-expanded') === 'true'
      const newState = !expanded
      
      button.setAttribute('aria-expanded', newState.toString())
      menu.classList.toggle('hidden', !newState)
      
      // Update icon
      const path = button.querySelector('svg path')
      if (path) {
        path.setAttribute('d', newState 
          ? 'M6 18L18 6M6 6l12 12'     // X
          : 'M4 6h16M4 12h16M4 18h16'  // hamburger
        )
      }
    }

    const closeMenu = () => {
      menu.classList.add('hidden')
      button.setAttribute('aria-expanded', 'false')
      const path = button.querySelector('svg path')
      if (path) path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
    }

    this.addListener(button, 'click', toggleMenu)
    
    // Close on outside click
    this.addListener(document, 'click', (e) => {
      if (!button.contains(e.target as Node) && !menu.contains(e.target as Node)) {
        closeMenu()
      }
    })

    // Close on escape
    this.addListener(document, 'keydown', (e) => {
      if (e.key === 'Escape') closeMenu()
    })

    // Close on navigation
    menu.querySelectorAll('a').forEach(link => {
      this.addListener(link, 'click', closeMenu)
    })
  }

  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      this.addListener(link, 'click', (e) => {
        e.preventDefault()
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
        const targetId = href?.substring(1)
        const target = targetId ? document.getElementById(targetId) : null
        
        if (target) {
          const headerOffset = 80
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      })
    })
  }
}