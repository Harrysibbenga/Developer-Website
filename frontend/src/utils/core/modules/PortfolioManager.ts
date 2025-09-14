// src/utils/core/modules/PortfolioManager.ts
import { BaseModule } from './BaseModule'

export class PortfolioManager extends BaseModule {
    private filters = {
      category: 'All',
      technologies: [] as string[],
      search: '',
      sort: 'featured'
    }
  
    async initialize(): Promise<void> {
      if (this.initialized) return
  
      const portfolioSection = document.getElementById('all-projects-section')
      if (!portfolioSection) {
        this.initialized = true
        return
      }
  
      console.log('🎨 Portfolio Manager: Starting...')
      
      this.setupFilters(portfolioSection)
      
      this.initialized = true
      console.log('🎨 Portfolio Manager: Ready')
    }
  
    private setupFilters(section: HTMLElement): void {
      const searchInput = section.querySelector('#portfolio-search') as HTMLInputElement
      const categoryFilters = section.querySelectorAll('.portfolio-category-filter')
      const techFilters = section.querySelectorAll('.portfolio-tech-filter')
      const clearBtn = section.querySelector('#portfolio-clear-filters')
  
      // Search
      if (searchInput) {
        const searchHandler = this.debounce((e: Event) => {
          this.filters.search = (e.target as HTMLInputElement).value.toLowerCase()
          this.applyFilters(section)
        }, 300)
        this.addListener(searchInput, 'input', searchHandler)
      }
  
      // Category filters
      categoryFilters.forEach(filter => {
        this.addListener(filter, 'click', () => {
          this.filters.category = (filter as HTMLElement).dataset.category || 'All'
          this.updateCategoryUI(categoryFilters, filter as HTMLElement)
          this.applyFilters(section)
        })
      })
  
      // Technology filters
      techFilters.forEach(filter => {
        this.addListener(filter, 'click', () => {
          const tech = (filter as HTMLElement).dataset.tech || ''
          this.toggleTechnology(tech, filter as HTMLElement)
          this.applyFilters(section)
        })
      })
  
      // Clear filters
      if (clearBtn) {
        this.addListener(clearBtn, 'click', () => {
          this.clearAllFilters(section)
        })
      }
  
      // Initial state
      this.applyFilters(section)
    }
  
    private updateCategoryUI(filters: NodeListOf<Element>, activeFilter: HTMLElement): void {
      filters.forEach(filter => {
        filter.classList.remove('active', 'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500', 'text-white', 'shadow-lg')
        filter.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300')
      })
  
      activeFilter.classList.add('active', 'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500', 'text-white', 'shadow-lg')
      activeFilter.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300')
    }
  
    private toggleTechnology(tech: string, element: HTMLElement): void {
      const index = this.filters.technologies.indexOf(tech)
      if (index > -1) {
        this.filters.technologies.splice(index, 1)
        element.classList.remove('active')
      } else {
        this.filters.technologies.push(tech)
        element.classList.add('active')
      }
    }
  
    private applyFilters(section: HTMLElement): void {
      const cards = section.querySelectorAll('.project-card')
      let visible = 0
  
      cards.forEach(card => {
        const htmlCard = card as HTMLElement
        const category = htmlCard.dataset.category
        const techs = htmlCard.dataset.technologies?.split(',') || []
        const title = htmlCard.dataset.title?.toLowerCase() || ''
        const desc = htmlCard.querySelector('p')?.textContent?.toLowerCase() || ''
  
        let show = true
  
        // Category filter
        if (this.filters.category !== 'All' && category !== this.filters.category) {
          show = false
        }
  
        // Technology filter
        if (this.filters.technologies.length > 0) {
          const hasTech = this.filters.technologies.some(tech =>
            techs.some(cardTech => cardTech.trim().toLowerCase() === tech.toLowerCase())
          )
          if (!hasTech) show = false
        }
  
        // Search filter
        if (this.filters.search) {
          const matches = title.includes(this.filters.search) || 
                        desc.includes(this.filters.search) ||
                        techs.some(tech => tech.toLowerCase().includes(this.filters.search))
          if (!matches) show = false
        }
  
        htmlCard.classList.toggle('hidden', !show)
        if (show) visible++
      })
  
      this.updateResultsCount(section, visible)
    }
  
    private updateResultsCount(section: HTMLElement, count: number): void {
      const resultsCount = section.querySelector('#portfolio-results-count')
      if (resultsCount) {
        resultsCount.textContent = count.toString()
      }
  
      const noResults = section.querySelector('#portfolio-no-results')
      if (noResults) {
        noResults.classList.toggle('hidden', count > 0)
      }
    }
  
    private clearAllFilters(section: HTMLElement): void {
      const searchInput = section.querySelector('#portfolio-search') as HTMLInputElement
      if (searchInput) searchInput.value = ''
  
      this.filters = {
        category: 'All',
        technologies: [],
        search: '',
        sort: 'featured'
      }
  
      this.applyFilters(section)
    }
  }