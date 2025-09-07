// src/utils/portfolioFilters.ts

export function initializePortfolioFilters(root: HTMLElement) {
    const searchInput = root.querySelector<HTMLInputElement>('#portfolio-search');
    const sortSelect = root.querySelector<HTMLSelectElement>('#portfolio-sort');
    const categoryFilters = root.querySelectorAll<HTMLButtonElement>('.portfolio-category-filter');
    const techFilters = root.querySelectorAll<HTMLButtonElement>('.portfolio-tech-filter');
    const clearFiltersBtn = root.querySelector<HTMLButtonElement>('#portfolio-clear-filters');
    const resultsCount = root.querySelector<HTMLElement>('#portfolio-results-count');
    const projectsGrid = root.querySelector<HTMLElement>('#projects-grid');
    const selectedFiltersBar = root.querySelector<HTMLElement>('#selected-filters-bar');
  
    let activeFilters = {
      category: 'All',
      technologies: [] as string[],
      search: '',
      sort: 'featured',
    };
  
    // --- Event Listeners ---
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e: Event) => {
        activeFilters.search = (e.target as HTMLInputElement).value.toLowerCase();
        applyFilters();
      }, 300));
    }
  
    if (sortSelect) {
      sortSelect.addEventListener('change', (e: Event) => {
        activeFilters.sort = (e.target as HTMLSelectElement).value;
        applyFilters();
      });
    }
  
    categoryFilters.forEach((filter) => {
      filter.addEventListener('click', () => {
        activeFilters.category = filter.dataset.category || 'All';
        updateCategoryFilterUI(filter);
        applyFilters();
      });
    });
  
    techFilters.forEach((filter) => {
      filter.addEventListener('click', () => {
        const tech = filter.dataset.tech || '';
        toggleTechnologyFilter(tech, filter);
        applyFilters();
      });
    });
  
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => clearAllFilters());
    }
  
    // --- Helper Functions ---
    function updateCategoryFilterUI(activeFilter: HTMLButtonElement) {
      categoryFilters.forEach((f) => f.classList.remove('active'));
      activeFilter.classList.add('active');
    }
  
    function toggleTechnologyFilter(tech: string, filterElement: HTMLButtonElement) {
      const index = activeFilters.technologies.indexOf(tech);
      if (index > -1) {
        activeFilters.technologies.splice(index, 1);
        filterElement.classList.remove('active');
      } else {
        activeFilters.technologies.push(tech);
        filterElement.classList.add('active');
      }
      updateSelectedFiltersBar();
    }
  
    function updateSelectedFiltersBar() {
      if (!selectedFiltersBar) return;
      selectedFiltersBar.innerHTML = '';
  
      if (activeFilters.technologies.length === 0) {
        selectedFiltersBar.classList.add('hidden');
        return;
      }
  
      selectedFiltersBar.className =
        'mb-8 flex flex-wrap items-center gap-3 bg-gray-100 border border-gray-200 rounded-xl p-4 shadow-sm';
  
      activeFilters.technologies.forEach((tech) => {
        const pill = document.createElement('div');
        pill.className =
          'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white ' +
          'bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:shadow-lg transition';
  
        pill.innerHTML = `
          <span>${tech}</span>
          <button
            class="text-white text-lg leading-none hover:text-gray-200 transition"
            title="Remove filter"
          >
            &times;
          </button>
        `;
  
        pill.querySelector('button')?.addEventListener('click', () => {
          activeFilters.technologies = activeFilters.technologies.filter((t) => t !== tech);
  
          const btn = document.querySelector<HTMLButtonElement>(
            `.portfolio-tech-filter[data-tech="${tech}"]`
          );
          if (btn) btn.classList.remove('active');
  
          updateSelectedFiltersBar();
          applyFilters();
        });
  
        selectedFiltersBar.appendChild(pill);
      });
    }
  
    function applyFilters() {
      const projectCards = root.querySelectorAll<HTMLElement>('.project-card');
      let visibleCount = 0;
  
      projectCards.forEach((card) => {
        const category = card.dataset.category;
        const technologies = card.dataset.technologies?.split(',') || [];
        const title = card.dataset.title?.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
  
        let isVisible = true;
  
        if (activeFilters.category !== 'All' && category !== activeFilters.category) {
          isVisible = false;
        }
  
        if (activeFilters.technologies.length > 0) {
          const hasRequiredTech = activeFilters.technologies.some((tech) =>
            technologies.some((cardTech) => cardTech.trim().toLowerCase() === tech.toLowerCase())
          );
          if (!hasRequiredTech) isVisible = false;
        }
  
        if (
          activeFilters.search &&
          !title.includes(activeFilters.search) &&
          !description.includes(activeFilters.search) &&
          !technologies.some((tech) => tech.toLowerCase().includes(activeFilters.search))
        ) {
          isVisible = false;
        }
  
        if (isVisible) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
  
      if (resultsCount) resultsCount.textContent = visibleCount.toString();
    }
  
    function clearAllFilters() {
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      categoryFilters.forEach((f, index) => {
        f.classList.remove('active');
        if (index === 0) f.classList.add('active');
      });
      techFilters.forEach((f) => f.classList.remove('active'));
  
      activeFilters = { category: 'All', technologies: [], search: '', sort: 'featured' };
  
      updateSelectedFiltersBar();
      applyFilters();
    }
  
    // Utility: debounce
    function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
      let timeout: ReturnType<typeof setTimeout>;
      return function executedFunction(this: any, ...args: Parameters<T>) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  
    // Initial run
    applyFilters();
  }
  