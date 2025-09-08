// src/utils/enhanced-components-manager.ts
/**
 * Enhanced Global Components Manager
 * Centralized component initialization with proper cleanup and page transition handling
 */

interface ComponentEventListener {
  element: Element | Document | Window
  event: string
  handler: EventListener
  group: string
}

interface ComponentObserver {
  observer: IntersectionObserver
  group: string
}

export class EnhancedComponentsManager {
  private static instance: EnhancedComponentsManager
  private observers: Map<string, ComponentObserver> = new Map()
  private eventListeners: ComponentEventListener[] = []
  private initialized = false
  private initializationPromise: Promise<void> | null = null

  private constructor() {}

  public static getInstance(): EnhancedComponentsManager {
    if (!EnhancedComponentsManager.instance) {
      EnhancedComponentsManager.instance = new EnhancedComponentsManager()
    }
    return EnhancedComponentsManager.instance
  }

  /**
   * Main initialization method with promise-based execution
   */
  public async initialize(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise
    }

    this.initializationPromise = this.performInitialization()
    return this.initializationPromise
  }

  private async performInitialization(): Promise<void> {
    console.log('🚀 Enhanced Components Manager: Starting initialization...')

    // Wait for DOM to be ready
    await this.waitForDOM()

    // Clean up any existing components
    this.cleanup()

    // Initialize all components in order
    this.initializeContactPageTabs()
    this.initializePortfolioFiltering()
    this.initializeScrollAnimations()
    this.initializeImageLazyLoading()
    this.initializeFormComponents()
    this.initializeNavigationComponents()
    this.initializeModalComponents()
    this.initializeAccordionComponents()

    this.initialized = true
    document.body.classList.add('components-loaded')
    
    console.log('✅ Enhanced Components Manager: All components initialized')
  }

  /**
   * Setup page transition handling
   */
  public setupPageTransitions(): void {
    // Astro View Transitions
    document.addEventListener('astro:before-preparation', () => {
      console.log('📄 Page transition starting - cleaning up components...')
      this.cleanup()
    })

    document.addEventListener('astro:after-swap', () => {
      console.log('🔄 Page transition completed - reinitializing components...')
      this.initializationPromise = null
      setTimeout(() => {
        this.initialize()
      }, 100)
    })

    // Fallback for manual navigation
    let currentUrl = window.location.href
    const checkNavigation = () => {
      if (window.location.href !== currentUrl) {
        currentUrl = window.location.href
        console.log('🔄 Manual navigation detected - reinitializing...')
        this.initializationPromise = null
        setTimeout(() => {
          this.initialize()
        }, 100)
      }
    }
    setInterval(checkNavigation, 500)
  }

  /**
   * Wait for DOM to be ready
   */
  private waitForDOM(): Promise<void> {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => resolve())
      } else {
        resolve()
      }
    })
  }

  /**
   * Contact page tab functionality
   */
  private initializeContactPageTabs(): void {
    const tabButtons = document.querySelectorAll('.tab-button')
    const tabContents = document.querySelectorAll('.tab-content')

    if (tabButtons.length === 0) return

    console.log('📋 Initializing contact page tabs...', tabButtons.length, 'buttons found')

    tabButtons.forEach(button => {
      const clickHandler = (e: Event) => {
        e.preventDefault()
        const target = e.currentTarget as HTMLElement
        const tabId = target.dataset.tab

        if (!tabId) return

        console.log('📋 Tab clicked:', tabId)

        // Update button states
        tabButtons.forEach(btn => {
          btn.classList.remove('active', 'bg-blue-600', 'text-white')
          btn.classList.add('text-gray-600', 'hover:text-gray-900')
        })

        target.classList.add('active', 'bg-blue-600', 'text-white')
        target.classList.remove('text-gray-600', 'hover:text-gray-900')

        // Update content visibility
        tabContents.forEach(content => {
          content.classList.add('hidden')
        })

        const targetContent = document.getElementById(`${tabId}-tab`)
        if (targetContent) {
          targetContent.classList.remove('hidden')
          
          // Trigger animations
          const animatedElements = targetContent.querySelectorAll('.animate-on-scroll')
          animatedElements.forEach(el => {
            el.classList.remove('animate-in')
            setTimeout(() => el.classList.add('animate-in'), 50)
          })
        }

        console.log('📋 Successfully switched to tab:', tabId)
      }

      button.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('contact-tabs', button, 'click', clickHandler)
    })

    // Set initial active state
    const activeButton = document.querySelector('.tab-button.active') as HTMLElement
    if (activeButton?.dataset.tab) {
      const targetContent = document.getElementById(`${activeButton.dataset.tab}-tab`)
      targetContent?.classList.remove('hidden')
    }
  }

  /**
   * Portfolio filtering functionality
   */
  private initializePortfolioFiltering(): void {
    const portfolioSection = document.getElementById('all-projects-section')
    if (!portfolioSection) return

    console.log('🎨 Initializing portfolio filtering...')

    const searchInput = portfolioSection.querySelector('#portfolio-search') as HTMLInputElement
    const sortSelect = portfolioSection.querySelector('#portfolio-sort') as HTMLSelectElement
    const categoryFilters = portfolioSection.querySelectorAll('.portfolio-category-filter') as NodeListOf<HTMLButtonElement>
    const techFilters = portfolioSection.querySelectorAll('.portfolio-tech-filter') as NodeListOf<HTMLButtonElement>
    const clearFiltersBtn = portfolioSection.querySelector('#portfolio-clear-filters') as HTMLButtonElement
    const resultsCount = portfolioSection.querySelector('#portfolio-results-count') as HTMLElement
    const selectedFiltersBar = portfolioSection.querySelector('#selected-filters-bar') as HTMLElement

    let activeFilters = {
      category: 'All',
      technologies: [] as string[],
      search: '',
      sort: 'featured'
    }

    // Search functionality
    if (searchInput) {
      const searchHandler = this.debounce((e: Event) => {
        activeFilters.search = (e.target as HTMLInputElement).value.toLowerCase()
        applyFilters()
      }, 300)
      searchInput.addEventListener('input', searchHandler)
      this.addEventListenerToCleanup('portfolio', searchInput, 'input', searchHandler)
    }

    // Sort functionality
    if (sortSelect) {
      const sortHandler = (e: Event) => {
        activeFilters.sort = (e.target as HTMLSelectElement).value
        applyFilters()
      }
      sortSelect.addEventListener('change', sortHandler)
      this.addEventListenerToCleanup('portfolio', sortSelect, 'change', sortHandler)
    }

    // Category filters
    categoryFilters.forEach(filter => {
      const clickHandler = () => {
        activeFilters.category = filter.dataset.category || 'All'
        updateCategoryFilterUI(filter)
        applyFilters()
      }
      filter.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('portfolio', filter, 'click', clickHandler)
    })

    // Technology filters
    techFilters.forEach(filter => {
      const clickHandler = () => {
        const tech = filter.dataset.tech || ''
        toggleTechnologyFilter(tech, filter)
        applyFilters()
      }
      filter.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('portfolio', filter, 'click', clickHandler)
    })

    // Clear filters
    if (clearFiltersBtn) {
      const clearHandler = () => clearAllFilters()
      clearFiltersBtn.addEventListener('click', clearHandler)
      this.addEventListenerToCleanup('portfolio', clearFiltersBtn, 'click', clearHandler)
    }

    function updateCategoryFilterUI(activeFilter: HTMLButtonElement) {
      categoryFilters.forEach(f => {
        f.classList.remove('active')
        f.className = f.className.replace(
          'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg',
          'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 shadow-sm'
        )
      })
      
      activeFilter.classList.add('active')
      activeFilter.className = activeFilter.className.replace(
        'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600 shadow-sm',
        'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
      )
    }

    function toggleTechnologyFilter(tech: string, filterElement: HTMLButtonElement) {
      const index = activeFilters.technologies.indexOf(tech)
      if (index > -1) {
        activeFilters.technologies.splice(index, 1)
        filterElement.classList.remove('active')
      } else {
        activeFilters.technologies.push(tech)
        filterElement.classList.add('active')
      }
      updateSelectedFiltersBar()
    }

    function updateSelectedFiltersBar() {
      if (!selectedFiltersBar) return
      selectedFiltersBar.innerHTML = ''

      if (activeFilters.technologies.length === 0) {
        selectedFiltersBar.classList.add('hidden')
        return
      }

      selectedFiltersBar.className = 'mb-8 flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm'

      activeFilters.technologies.forEach(tech => {
        const pill = document.createElement('div')
        pill.className = 'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-lg transition'

        pill.innerHTML = `
          <span>${tech}</span>
          <button class="text-white text-lg leading-none hover:text-gray-200 transition" title="Remove filter">&times;</button>
        `

        pill.querySelector('button')?.addEventListener('click', () => {
          activeFilters.technologies = activeFilters.technologies.filter(t => t !== tech)
          const btn = document.querySelector(`.portfolio-tech-filter[data-tech="${tech}"]`)
          btn?.classList.remove('active')
          updateSelectedFiltersBar()
          applyFilters()
        })

        selectedFiltersBar.appendChild(pill)
      })
    }

    function applyFilters() {
      const projectCards = portfolioSection.querySelectorAll('.project-card')
      let visibleCount = 0

      projectCards.forEach(card => {
        const htmlCard = card as HTMLElement
        const category = htmlCard.dataset.category
        const technologies = htmlCard.dataset.technologies?.split(',') || []
        const title = htmlCard.dataset.title?.toLowerCase() || ''
        const description = htmlCard.querySelector('p')?.textContent?.toLowerCase() || ''

        let isVisible = true

        // Category filter
        if (activeFilters.category !== 'All' && category !== activeFilters.category) {
          isVisible = false
        }

        // Technology filter
        if (activeFilters.technologies.length > 0) {
          const hasRequiredTech = activeFilters.technologies.some(tech =>
            technologies.some(cardTech => cardTech.trim().toLowerCase() === tech.toLowerCase())
          )
          if (!hasRequiredTech) isVisible = false
        }

        // Search filter
        if (activeFilters.search && 
            !title.includes(activeFilters.search) && 
            !description.includes(activeFilters.search) &&
            !technologies.some(tech => tech.toLowerCase().includes(activeFilters.search))) {
          isVisible = false
        }

        // Show/hide card
        if (isVisible) {
          htmlCard.classList.remove('hidden')
          visibleCount++
        } else {
          htmlCard.classList.add('hidden')
        }
      })

      // Update results count
      if (resultsCount) {
        resultsCount.textContent = visibleCount.toString()
      }

      // Show/hide no results
      const noResults = document.getElementById('portfolio-no-results')
      if (noResults) {
        noResults.classList.toggle('hidden', visibleCount > 0)
      }

      // Update clear filters button
      if (clearFiltersBtn) {
        const hasActiveFilters = activeFilters.category !== 'All' || 
                                activeFilters.technologies.length > 0 || 
                                activeFilters.search !== ''
        clearFiltersBtn.classList.toggle('hidden', !hasActiveFilters)
      }
    }

    function clearAllFilters() {
      if (searchInput) searchInput.value = ''
      if (sortSelect) sortSelect.value = 'featured'

      categoryFilters.forEach((filter, index) => {
        filter.classList.remove('active')
        if (index === 0) {
          filter.classList.add('active')
        }
      })

      techFilters.forEach(filter => {
        filter.classList.remove('active')
      })

      activeFilters = {
        category: 'All',
        technologies: [],
        search: '',
        sort: 'featured'
      }

      updateSelectedFiltersBar()
      applyFilters()
    }

    // Initial filter application
    applyFilters()
  }

  /**
   * Scroll animations with skill bars
   */
  private initializeScrollAnimations(): void {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-animate]')
    if (animatedElements.length === 0) return

    console.log('🎭 Initializing scroll animations...', animatedElements.length, 'elements')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          element.classList.add('animate-in')
          
          // Handle staggered animations
          const staggeredElements = element.querySelectorAll('.stagger-animation')
          staggeredElements.forEach((el, index) => {
            setTimeout(() => el.classList.add('animate-in'), index * 100)
          })
          
          // Handle skill bar animations for TechStack
          if (element.dataset.animate === 'skills') {
            this.animateSkillBars(element)
          }
          
          observer.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    animatedElements.forEach(el => {
      el.classList.remove('animate-in')
      observer.observe(el)
    })

    this.observers.set('scroll-animations', { observer, group: 'animations' })
  }

  /**
   * Animate skill bars in TechStack section
   */
  private animateSkillBars(container: HTMLElement): void {
    const skillBars = container.querySelectorAll('.skill-progress')
    
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const htmlBar = bar as HTMLElement
        const width = htmlBar.getAttribute('data-width')
        
        if (width) {
          // Animate width
          htmlBar.style.width = `${width}%`
          
          // Add animated class for glow effect
          setTimeout(() => {
            htmlBar.classList.add('animated')
          }, 500)
        }
      }, index * 150) // Stagger animations
    })
  }

  /**
   * Image lazy loading
   */
  private initializeImageLazyLoading(): void {
    const lazyImages = document.querySelectorAll('img[data-src]')
    if (lazyImages.length === 0) return

    console.log('🖼️ Initializing image lazy loading...', lazyImages.length, 'images')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          
          if (img.dataset.src) {
            const newImg = new Image()
            newImg.onload = () => {
              img.src = img.dataset.src!
              img.classList.remove('loading-skeleton')
              img.classList.add('loaded')
              observer.unobserve(img)
            }
            newImg.onerror = () => {
              img.src = '/images/placeholder.jpg'
              img.alt = 'Image unavailable'
              img.classList.remove('loading-skeleton')
              observer.unobserve(img)
            }
            newImg.src = img.dataset.src
          }
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    })

    lazyImages.forEach(img => {
      img.classList.add('loading-skeleton')
      observer.observe(img)
    })

    this.observers.set('image-loading', { observer, group: 'images' })
  }

  /**
   * Form components
   */
  private initializeFormComponents(): void {
    const forms = document.querySelectorAll('form[data-validate]')
    if (forms.length === 0) return

    console.log('📝 Initializing form components...', forms.length, 'forms')

    forms.forEach(form => {
      const submitHandler = (e: Event) => {
        if (!this.validateForm(form as HTMLFormElement)) {
          e.preventDefault()
        }
      }
      form.addEventListener('submit', submitHandler)
      this.addEventListenerToCleanup('forms', form, 'submit', submitHandler)

      // Field validation
      const inputs = form.querySelectorAll('input, textarea, select')
      inputs.forEach(input => {
        const blurHandler = () => this.validateField(input as HTMLInputElement)
        input.addEventListener('blur', blurHandler)
        this.addEventListenerToCleanup('forms', input, 'blur', blurHandler)
      })
    })
  }

  /**
   * Navigation components
   */
  private initializeNavigationComponents(): void {
    const mobileMenuButton = document.getElementById('mobile-menu-button')
    const mobileMenu = document.getElementById('mobile-menu')

    if (mobileMenuButton && mobileMenu) {
      console.log('🧭 Enhanced Components Manager: Initializing navigation components...')

      const toggleHandler = () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true'
        
        mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString())
        
        if (!isExpanded) {
          // Show menu
          mobileMenu.classList.remove('hidden')
          
          // Update icon to close icon
          const svg = mobileMenuButton.querySelector('svg path')
          if (svg) {
            svg.setAttribute('d', 'M6 18L18 6M6 6l12 12')
          }
        } else {
          // Hide menu
          mobileMenu.classList.add('hidden')
          
          // Update icon to hamburger icon
          const svg = mobileMenuButton.querySelector('svg path')
          if (svg) {
            svg.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
          }
        }
      }

      mobileMenuButton.addEventListener('click', toggleHandler)
      this.addEventListenerToCleanup('navigation', mobileMenuButton, 'click', toggleHandler)

      // Close menu when clicking outside
      const outsideClickHandler = (e: Event) => {
        const target = e.target as Element
        if (!mobileMenuButton.contains(target) && !mobileMenu.contains(target)) {
          mobileMenu.classList.add('hidden')
          mobileMenuButton.setAttribute('aria-expanded', 'false')
          
          // Reset icon to hamburger
          const svg = mobileMenuButton.querySelector('svg path')
          if (svg) {
            svg.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
          }
        }
      }
      document.addEventListener('click', outsideClickHandler)
      this.addEventListenerToCleanup('navigation', document, 'click', outsideClickHandler)

      // Close menu when navigating
      const mobileLinks = mobileMenu.querySelectorAll('a')
      mobileLinks.forEach(link => {
        const linkClickHandler = () => {
          mobileMenu.classList.add('hidden')
          mobileMenuButton.setAttribute('aria-expanded', 'false')
          
          // Reset icon to hamburger
          const svg = mobileMenuButton.querySelector('svg path')
          if (svg) {
            svg.setAttribute('d', 'M4 6h16M4 12h16M4 18h16')
          }
        }
        link.addEventListener('click', linkClickHandler)
        this.addEventListenerToCleanup('navigation', link, 'click', linkClickHandler)
      })
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      const clickHandler = (e: Event) => {
        e.preventDefault()
        const target = e.currentTarget as HTMLAnchorElement
        const targetId = target.getAttribute('href')?.substring(1)
        const targetElement = targetId ? document.getElementById(targetId) : null
        
        if (targetElement) {
          const headerOffset = 80
          const elementPosition = targetElement.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
      link.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('navigation', link, 'click', clickHandler)
    })
  }

  /**
   * Modal components
   */
  private initializeModalComponents(): void {
    const modalTriggers = document.querySelectorAll('[data-modal-target]')
    const modalCloses = document.querySelectorAll('[data-modal-close]')
    const modals = document.querySelectorAll('[data-modal]')

    if (modalTriggers.length === 0) return

    console.log('🪟 Initializing modal components...')

    // Modal triggers
    modalTriggers.forEach(trigger => {
      const clickHandler = (e: Event) => {
        e.preventDefault()
        const target = (e.currentTarget as HTMLElement).dataset.modalTarget
        const modal = document.querySelector(`[data-modal="${target}"]`) as HTMLElement
        
        if (modal) {
          modal.classList.remove('hidden')
          modal.setAttribute('aria-hidden', 'false')
          document.body.classList.add('modal-open')
          
          const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement
          firstFocusable?.focus()
        }
      }
      trigger.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('modals', trigger, 'click', clickHandler)
    })

    // Modal close
    modalCloses.forEach(closeBtn => {
      const clickHandler = () => {
        const modal = closeBtn.closest('[data-modal]') as HTMLElement
        if (modal) {
          modal.classList.add('hidden')
          modal.setAttribute('aria-hidden', 'true')
          document.body.classList.remove('modal-open')
        }
      }
      closeBtn.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('modals', closeBtn, 'click', clickHandler)
    })

    // Escape key
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modals.forEach(modal => {
          if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden')
            modal.setAttribute('aria-hidden', 'true')
          }
        })
        document.body.classList.remove('modal-open')
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.addEventListenerToCleanup('modals', document, 'keydown', escapeHandler)
  }

  /**
   * Accordion components
   */
  private initializeAccordionComponents(): void {
    const accordionTriggers = document.querySelectorAll('[data-accordion-trigger]')
    if (accordionTriggers.length === 0) return

    console.log('📖 Initializing accordion components...')

    accordionTriggers.forEach(trigger => {
      const clickHandler = (e: Event) => {
        e.preventDefault()
        const target = (e.currentTarget as HTMLElement).dataset.accordionTrigger
        const content = document.querySelector(`[data-accordion-content="${target}"]`) as HTMLElement
        const icon = trigger.querySelector('.accordion-icon') as HTMLElement

        if (content) {
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true'
          
          trigger.setAttribute('aria-expanded', (!isExpanded).toString())
          
          if (isExpanded) {
            content.classList.add('hidden')
            if (icon) icon.style.transform = 'rotate(0deg)'
          } else {
            content.classList.remove('hidden')
            if (icon) icon.style.transform = 'rotate(180deg)'
          }
        }
      }
      trigger.addEventListener('click', clickHandler)
      this.addEventListenerToCleanup('accordions', trigger, 'click', clickHandler)
    })
  }

  /**
   * Utility methods
   */
  private debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: ReturnType<typeof setTimeout>
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }) as T
  }

  private validateForm(form: HTMLFormElement): boolean {
    let isValid = true
    const inputs = form.querySelectorAll('input[required], textarea[required]')
    
    inputs.forEach(input => {
      if (!(input as HTMLInputElement).value.trim()) {
        this.showFieldError(input as HTMLInputElement, 'This field is required')
        isValid = false
      } else {
        this.clearFieldError(input as HTMLInputElement)
      }
    })
    
    return isValid
  }

  private validateField(input: HTMLInputElement): void {
    this.clearFieldError(input)
    
    if (input.hasAttribute('required') && !input.value.trim()) {
      this.showFieldError(input, 'This field is required')
      return
    }

    if (input.type === 'email' && input.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(input.value)) {
        this.showFieldError(input, 'Please enter a valid email address')
      }
    }
  }

  private showFieldError(input: HTMLInputElement, message: string): void {
    this.clearFieldError(input)
    
    const errorElement = document.createElement('div')
    errorElement.className = 'field-error text-red-600 text-sm mt-1'
    errorElement.textContent = message
    
    input.classList.add('border-red-500')
    input.parentNode?.appendChild(errorElement)
  }

  private clearFieldError(input: HTMLInputElement): void {
    input.classList.remove('border-red-500')
    const existingError = input.parentNode?.querySelector('.field-error')
    existingError?.remove()
  }

  private addEventListenerToCleanup(
    group: string,
    element: Element | Document | Window,
    event: string,
    handler: EventListener
  ): void {
    this.eventListeners.push({ element, event, handler, group })
  }

  /**
   * Clean up all observers and event listeners
   */
  private cleanup(): void {
    console.log('🧹 Cleaning up existing components...')
    
    // Clean up observers
    this.observers.forEach(({ observer }) => observer.disconnect())
    this.observers.clear()
    
    // Clean up event listeners
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler)
    })
    this.eventListeners.length = 0
    
    // Remove temporary elements
    document.querySelectorAll('[data-tooltip-element="true"]').forEach(el => el.remove())
    
    // Reset initialization state
    this.initialized = false
    this.initializationPromise = null
  }

  /**
   * Public methods
   */
  public async reinitialize(): Promise<void> {
    this.initializationPromise = null
    return this.initialize()
  }

  public isInitialized(): boolean {
    return this.initialized
  }
}

// Export singleton instance
export const enhancedComponentsManager = EnhancedComponentsManager.getInstance()