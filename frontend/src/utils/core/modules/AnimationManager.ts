// src/utils/core/modules/AnimationManager.ts
import { BaseModule } from './BaseModule'

export class AnimationManager extends BaseModule {
    async initialize(): Promise<void> {
      if (this.initialized) return
  
      console.log('🎭 Animation Manager: Starting...')
      
      this.setupScrollAnimations()
      
      this.initialized = true
      console.log('🎭 Animation Manager: Ready')
    }
  
    private setupScrollAnimations(): void {
      const elements = document.querySelectorAll('.animate-on-scroll, [data-animate]')
      if (elements.length === 0) return
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            element.classList.add('animate-in')
            
            // Handle staggered animations
            const staggered = element.querySelectorAll('.stagger-animation')
            staggered.forEach((el, i) => {
              setTimeout(() => el.classList.add('animate-in'), i * 100)
            })
            
            // Handle skill bars
            if (element.dataset.animate === 'skills') {
              this.animateSkillBars(element)
            }
            
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
  
      elements.forEach(el => {
        el.classList.remove('animate-in')
        observer.observe(el)
      })
  
      this.addObserver('scroll-animations', observer)
    }
  
    private animateSkillBars(container: HTMLElement): void {
      const bars = container.querySelectorAll('.skill-progress')
      bars.forEach((bar, i) => {
        setTimeout(() => {
          const htmlBar = bar as HTMLElement
          const width = htmlBar.getAttribute('data-width')
          if (width) {
            htmlBar.style.width = `${width}%`
            setTimeout(() => htmlBar.classList.add('animated'), 500)
          }
        }, i * 150)
      })
    }
  }
  