// src/utils/portfolio-filter-utility.ts
/**
 * Dedicated Portfolio Filtering Utility
 * Handles all portfolio filtering logic with clean separation of concerns
 */

export interface FilterState {
    category: string
    technologies: string[]
    search: string
    sort: string
  }
  
  export interface PortfolioElements {
    searchInput: HTMLInputElement | null
    sortSelect: HTMLSelectElement | null
    categoryFilters: NodeListOf<HTMLButtonElement>
    techFilters: NodeListOf<HTMLButtonElement>
    clearFiltersBtn: HTMLButtonElement | null
    resultsCount: HTMLElement | null
    selectedFiltersBar: HTMLElement | null
    projectCards: NodeListOf<Element>
  }
  
  export class PortfolioFilterManager {
    private activeFilters: FilterState = {
      category: 'All',
      technologies: [],
      search: '',
      sort: 'featured'
    }
  
    private elements: PortfolioElements
    private eventListeners: Array<{
      element: Element | Document | Window
      event: string
      handler: EventListener
    }> = []
  
    constructor(private container: HTMLElement) {
      this.elements = this.getElements()
      this.initialize()
    }
  
    private getElements(): PortfolioElements {
      return {
        searchInput: this.container.querySelector('#portfolio-search'),
        sortSelect: this.container.querySelector('#portfolio-sort'),
        categoryFilters: this.container.querySelectorAll('.portfolio-category-filter'),
        techFilters: this.container.querySelectorAll('.portfolio-tech-filter'),
        clearFiltersBtn: this.container.querySelector('#portfolio-clear-filters'),
        resultsCount: this.container.querySelector('#portfolio-results-count'),
        selectedFiltersBar: this.container.querySelector('#selected-filters-bar'),
        projectCards: this.container.querySelectorAll('.project-card')
      }
    }
  
    private initialize(): void {
      console.log('🎨 Initializing Portfolio Filter Manager...')
  
      this.setupSearchFilter()
      this.setupSortFilter()
      this.setupCategoryFilters()
      this.setupTechnologyFilters()
      this.setupClearFilters()
  
      // Apply initial filters
      this.applyFilters()
  
      console.log('✅ Portfolio Filter Manager initialized')
    }
  
    private setupSearchFilter(): void {
      if (!this.elements.searchInput) return
  
      const searchHandler = this.debounce((e: Event) => {
        this.activeFilters.search = (e.target as HTMLInputElement).value.toLowerCase()
        this.applyFilters()
      }, 300)
  
      this.elements.searchInput.addEventListener('input', searchHandler)
      this.addEventListenerToCleanup(this.elements.searchInput, 'input', searchHandler)
    }
  
    private setupSortFilter(): void {
      if (!this.elements.sortSelect) return
  
      const sortHandler = (e: Event) => {
        this.activeFilters.sort = (e.target as HTMLSelectElement).value
        this.applyFilters()
      }
  
      this.elements.sortSelect.addEventListener('change', sortHandler)
      this.addEventListenerToCleanup(this.elements.sortSelect, 'change', sortHandler)
    }
  
    private setupCategoryFilters(): void {
      this.elements.categoryFilters.forEach(filter => {
        const clickHandler = () => {
          this.activeFilters.category = filter.dataset.category || 'All'
          this.updateCategoryFilterUI(filter)
          this.applyFilters()
        }
  
        filter.addEventListener('click', clickHandler)
        this.addEventListenerToCleanup(filter, 'click', clickHandler)
      })
    }
  
    private setupTechnologyFilters(): void {
      this.elements.techFilters.forEach(filter => {
        const clickHandler = () => {
          const tech = filter.dataset.tech || ''
          this.toggleTechnologyFilter(tech, filter)
          this.applyFilters()
        }
  
        filter.addEventListener('click', clickHandler)
        this.addEventListenerToCleanup(filter, 'click', clickHandler)
      })
    }
  
    private setupClearFilters(): void {
      if (!this.elements.clearFiltersBtn) return
  
      const clearHandler = () => this.clearAllFilters()
      this.elements.clearFiltersBtn.addEventListener('click', clearHandler)
      this.addEventListenerToCleanup(this.elements.clearFiltersBtn, 'click', clearHandler)
    }
  
    private updateCategoryFilterUI(activeFilter: HTMLButtonElement): void {
      // Remove active state from all buttons
      this.elements.categoryFilters.forEach(filter => {
        filter.classList.remove('active')
        this.removeActiveStyles(filter)
        this.addInactiveStyles(filter)
      })
  
      // Add active state to clicked button
      activeFilter.classList.add('active')
      this.removeInactiveStyles(activeFilter)
      this.addActiveStyles(activeFilter)
    }
  
    private addActiveStyles(element: HTMLElement): void {
      element.classList.add(
        'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500', 
        'text-white', 'shadow-lg'
      )
    }
  
    private removeActiveStyles(element: HTMLElement): void {
      element.classList.remove(
        'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500', 
        'text-white', 'shadow-lg'
      )
    }
  
    private addInactiveStyles(element: HTMLElement): void {
      element.classList.add(
        'bg-white', 'text-gray-700', 'border', 'border-gray-300', 
        'hover:border-blue-500', 'hover:text-blue-600', 'shadow-sm'
      )
    }
  
    private removeInactiveStyles(element: HTMLElement): void {
      element.classList.remove(
        'bg-white', 'text-gray-700', 'border', 'border-gray-300', 
        'hover:border-blue-500', 'hover:text-blue-600', 'shadow-sm'
      )
    }
  
    private toggleTechnologyFilter(tech: string, filterElement: HTMLButtonElement): void {
      const index = this.activeFilters.technologies.indexOf(tech)
  
      if (index > -1) {
        // Remove technology
        this.activeFilters.technologies.splice(index, 1)
        filterElement.classList.remove('active')
      } else {
        // Add technology
        this.activeFilters.technologies.push(tech)
        filterElement.classList.add('active')
      }
  
      this.updateSelectedFiltersBar()
    }
  
    private updateSelectedFiltersBar(): void {
      if (!this.elements.selectedFiltersBar) return
  
      // Clear existing content
      this.elements.selectedFiltersBar.innerHTML = ''
  
      // Hide if no active technologies
      if (this.activeFilters.technologies.length === 0) {
        this.elements.selectedFiltersBar.classList.add('hidden')
        return
      }
  
      // Show and style the bar
      this.elements.selectedFiltersBar.classList.remove('hidden')
      this.elements.selectedFiltersBar.className = [
        'mb-8', 'flex', 'flex-wrap', 'items-center', 'gap-3',
        'bg-gray-100', 'border', 'border-gray-200', 'rounded-xl', 'p-4', 'shadow-sm'
      ].join(' ')
  
      // Create pills for each active technology
      this.activeFilters.technologies.forEach(tech => {
        const pill = this.createTechnologyPill(tech)
        this.elements.selectedFiltersBar!.appendChild(pill)
      })
    }
  
    private createTechnologyPill(tech: string): HTMLElement {
      const pill = document.createElement('div')
      pill.className = [
        'flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full',
        'text-sm', 'font-semibold', 'text-white',
        'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500',
        'shadow-md', 'hover:shadow-lg', 'transition'
      ].join(' ')
  
      pill.innerHTML = `
        <span>${tech}</span>
        <button class="text-white text-lg leading-none hover:text-gray-200 transition" title="Remove filter">
          &times;
        </button>
      `
  
      // Add remove functionality
      const removeButton = pill.querySelector('button')
      if (removeButton) {
        const removeHandler = () => {
          this.activeFilters.technologies = this.activeFilters.technologies.filter(t => t !== tech)
          
          // Update corresponding tech filter button
          const techFilterBtn = this.container.querySelector(`.portfolio-tech-filter[data-tech="${tech}"]`)
          techFilterBtn?.classList.remove('active')
          
          this.updateSelectedFiltersBar()
          this.applyFilters()
        }
  
        removeButton.addEventListener('click', removeHandler)
        this.addEventListenerToCleanup(removeButton, 'click', removeHandler)
      }
  
      return pill
    }
  
    private applyFilters(): void {
      let visibleCount = 0
  
      this.elements.projectCards.forEach(card => {
        const htmlCard = card as HTMLElement
        const isVisible = this.shouldShowProject(htmlCard)
  
        if (isVisible) {
          htmlCard.classList.remove('hidden')
          htmlCard.style.display = 'block'
          visibleCount++
        } else {
          htmlCard.classList.add('hidden')
          htmlCard.style.display = 'none'
        }
      })
  
      this.updateResultsCount(visibleCount)
      this.updateNoResultsDisplay(visibleCount)
      this.updateClearFiltersButton()
      this.applySorting()
    }
  
    private shouldShowProject(card: HTMLElement): boolean {
      const category = card.dataset.category
      const technologies = card.dataset.technologies?.split(',') || []
      const title = card.dataset.title?.toLowerCase() || ''
      const description = card.querySelector('p')?.textContent?.toLowerCase() || ''
  
      // Category filter
      if (this.activeFilters.category !== 'All' && category !== this.activeFilters.category) {
        return false
      }
  
      // Technology filter
      if (this.activeFilters.technologies.length > 0) {
        const hasRequiredTech = this.activeFilters.technologies.some(tech =>
          technologies.some(cardTech => 
            cardTech.trim().toLowerCase() === tech.toLowerCase()
          )
        )
        if (!hasRequiredTech) return false
      }
  
      // Search filter
      if (this.activeFilters.search) {
        const searchTerm = this.activeFilters.search
        const matchesSearch = 
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          technologies.some(tech => tech.toLowerCase().includes(searchTerm))
        
        if (!matchesSearch) return false
      }
  
      return true
    }
  
    private applySorting(): void {
      const projectsGrid = this.container.querySelector('#projects-grid')
      if (!projectsGrid) return
  
      const visibleCards = Array.from(
        this.container.querySelectorAll('.project-card:not(.hidden)')
      ) as HTMLElement[]
  
      if (visibleCards.length === 0) return
  
      visibleCards.sort((a, b) => this.compareProjects(a, b))
  
      // Reorder DOM elements
      visibleCards.forEach(card => projectsGrid.appendChild(card))
    }
  
    private compareProjects(a: HTMLElement, b: HTMLElement): number {
      const aYear = parseInt(a.dataset.year || '0')
      const bYear = parseInt(b.dataset.year || '0')
      const aFeatured = a.dataset.featured === 'true'
      const bFeatured = b.dataset.featured === 'true'
      const aTitle = a.dataset.title || ''
      const bTitle = b.dataset.title || ''
  
      switch (this.activeFilters.sort) {
        case 'newest':
          return bYear - aYear
        case 'oldest':
          return aYear - bYear
        case 'alphabetical':
          return aTitle.localeCompare(bTitle)
        case 'live-first':
          const aStatus = a.dataset.status
          const bStatus = b.dataset.status
          if (aStatus === 'live' && bStatus !== 'live') return -1
          if (aStatus !== 'live' && bStatus === 'live') return 1
          return bYear - aYear
        case 'featured':
        default:
          if (aFeatured && !bFeatured) return -1
          if (!aFeatured && bFeatured) return 1
          return bYear - aYear
      }
    }
  
    private updateResultsCount(count: number): void {
      if (this.elements.resultsCount) {
        this.elements.resultsCount.textContent = count.toString()
      }
    }
  
    private updateNoResultsDisplay(visibleCount: number): void {
      const noResults = document.getElementById('portfolio-no-results')
      if (noResults) {
        noResults.classList.toggle('hidden', visibleCount > 0)
      }
    }
  
    private updateClearFiltersButton(): void {
      if (!this.elements.clearFiltersBtn) return
  
      const hasActiveFilters = 
        this.activeFilters.category !== 'All' ||
        this.activeFilters.technologies.length > 0 ||
        this.activeFilters.search !== ''
  
      this.elements.clearFiltersBtn.classList.toggle('hidden', !hasActiveFilters)
    }
  
    public clearAllFilters(): void {
      // Reset search
      if (this.elements.searchInput) {
        this.elements.searchInput.value = ''
      }
  
      // Reset sort
      if (this.elements.sortSelect) {
        this.elements.sortSelect.value = 'featured'
      }
  
      // Reset category filters
      this.elements.categoryFilters.forEach((filter, index) => {
        filter.classList.remove('active')
        this.removeActiveStyles(filter)
        this.addInactiveStyles(filter)
  
        if (index === 0) {
          filter.classList.add('active')
          this.removeInactiveStyles(filter)
          this.addActiveStyles(filter)
        }
      })
  
      // Reset technology filters
      this.elements.techFilters.forEach(filter => {
        filter.classList.remove('active')
      })
  
      // Reset active filters state
      this.activeFilters = {
        category: 'All',
        technologies: [],
        search: '',
        sort: 'featured'
      }
  
      this.updateSelectedFiltersBar()
      this.applyFilters()
    }
  
    private debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
      let timeout: ReturnType<typeof setTimeout>
      return ((...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(this, args), wait)
      }) as T
    }
  
    private addEventListenerToCleanup(
      element: Element | Document | Window,
      event: string,
      handler: EventListener
    ): void {
      this.eventListeners.push({ element, event, handler })
    }
  
    public cleanup(): void {
      console.log('🧹 Cleaning up Portfolio Filter Manager...')
      
      // Remove all event listeners
      this.eventListeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler)
      })
      this.eventListeners.length = 0
    }
  
    public getActiveFilters(): FilterState {
      return { ...this.activeFilters }
    }
  
    public setFilters(filters: Partial<FilterState>): void {
      this.activeFilters = { ...this.activeFilters, ...filters }
      this.applyFilters()
    }
  }
  
  // Factory function for easy initialization
  export function initializePortfolioFiltering(container: HTMLElement): PortfolioFilterManager | null {
    if (!container) {
      console.warn('Portfolio filtering: Container element not found')
      return null
    }
  
    try {
      return new PortfolioFilterManager(container)
    } catch (error) {
      console.error('Failed to initialize portfolio filtering:', error)
      return null
    }
  }