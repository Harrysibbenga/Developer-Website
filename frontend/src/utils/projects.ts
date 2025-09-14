// src/utils/projects.ts
/**
 * Portfolio projects configuration and utility functions
 * Includes both completed projects with live links and CV projects for consultation
 */

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  technologies: string[]
  status: 'live' | 'consultation' | 'case-study'
  image: string
  liveUrl?: string
  githubUrl?: string
  features: string[]
  challenges: string[]
  results: string[]
  client?: string
  duration: string
  year: number
  featured: boolean
}

import PortfolioWebsite from "../assets/projects/portfolio-website.png"
import RomanEvents from "../assets/projects/roman-events.png"
import DataProcessing from "../assets/projects/data-processing.png"
import WebDevelopment from "../assets/projects/web-development.png"
import IoTIntegration from "../assets/projects/iot-integration.png"
import RealTimeSystems from "../assets/projects/real-time-systems.png"

// Portfolio Projects with Live Links (these you can show and link to)
export const LIVE_PROJECTS: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio & Development Services",
    description: "Modern web development portfolio built with Astro.js, Vue.js, Tailwind CSS and FastAPI",
    longDescription: "A comprehensive portfolio website showcasing development services with interactive project galleries, service booking system, and responsive design. Built using modern web technologies with performance optimization and SEO best practices.",
    category: "Web Applications",
    technologies: ["Astro.js", "Vue.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI"],
    status: "live",
    image: PortfolioWebsite.src,
    liveUrl: "https://harrysibbenga.dev",
    features: [
      "Responsive design optimized for all devices",
      "Interactive project gallery with filtering",
      "Service booking system with quote calculator",
      "SEO optimized with structured data",
      "Fast loading with Astro static generation",
      "Modern UI with smooth animations"
    ],
    challenges: [
      "Balancing static generation with interactive components",
      "Optimizing performance while maintaining rich interactions",
      "Creating a professional design that stands out"
    ],
    results: [
      "100% Lighthouse performance score",
      "Fully responsive across all device sizes",
      "Professional online presence for client acquisition"
    ],
    duration: "2 weeks",
    year: 2025,
    featured: true
  },
  {
    id: "roman-events-mk",
    title: "Roman Events MK Website",
    description: "Event booking website with LED numbers & letters for weddings, birthdays, Halloween, and more.",
    longDescription: "A modern full-stack event booking website built with Astro.js, Vue.js, and FastAPI. The platform showcases Roman Events' LED numbers and letters, offering an interactive booking system with a contact form, cookie manager, and legal pages for terms and privacy. The responsive design ensures a smooth user experience across devices while promoting a wide range of event services for weddings, birthdays, corporate parties, Halloween, and special occasions.",
    category: "Web Applications",
    technologies: ["Astro.js", "Vue.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI"],
    status: "live",
    image: RomanEvents.src,
    liveUrl: "https://romaneventsmk.co.uk",
    features: [
      "Interactive booking form with validation",
      "Event package showcase with LED numbers & letters",
      "Contact form integration",
      "Cookie manager with preferences",
      "Terms & Privacy policy pages",
      "Mobile-first responsive design"
    ],
    challenges: [
      "Designing a booking flow that is simple yet detailed enough for event customization",
      "Balancing visual design with fast performance for image-heavy galleries",
      "Implementing clear cookie & privacy compliance features"
    ],
    results: [
      "Enabled customers to easily book event packages online",
      "Increased lead conversion through responsive design",
      "Improved brand visibility with a professional web presence"
    ],
    client: "Roman Events MK",
    duration: "2 weeks",
    year: 2025,
    featured: true
  },  
]

// CV Projects (for consultation and case studies)
export const CV_PROJECTS: Project[] = [
  {
    id: "mapaction-geospatial-pipeline",
    title: "MapAction Geospatial Data Pipeline",
    description: "Python-based data pipeline enabling 1-hour geospatial data access for humanitarian crises response",
    longDescription: "Designed and developed a comprehensive Python data pipeline system for MapAction's geospatial team, dramatically reducing data processing time from hours to under 60 minutes. The system enables rapid humanitarian response by providing instant access to critical mapping data.",
    category: "Data Processing", 
    technologies: ["Python", "Docker", "Jenkins", "GitHub", "Geospatial Libraries", "CI/CD", "Airflow", "pytest"],
    status: "consultation",
    image: DataProcessing.src,
    client: "MapAction (Humanitarian Organization)",
    features: [
      "Automated geospatial data processing workflows",
      "20% reduction in data processing time",
      "Robust error handling and logging systems",
      "Comprehensive unit testing with pytest",
      "Docker containerization for portability",
      "CI/CD pipeline with Jenkins integration"
    ],
    challenges: [
      "Processing large geospatial datasets efficiently",
      "Ensuring system reliability for emergency response",
      "Managing volunteer contributor workflows",
      "Implementing robust testing in live environments"
    ],
    results: [
      "20% faster humanitarian crisis response times",
      "Reliable 1-hour data access guarantee",
      "Streamlined volunteer contribution process",
      "Production-ready CI/CD implementation"
    ],
    duration: "Ongoing (Jan 2024 - Dec 2024)",
    year: 2024,
    featured: true
  },
  {
    id: "tensator-queue-management",
    title: "Real-time Queue Management System",
    description: "Django Channels WebSocket system improving customer wait time accuracy by 15%",
    longDescription: "Developed a sophisticated real-time queue management system using Django Channels and WebSockets, coordinating multiple devices and providing accurate customer wait time predictions. The system improved customer experience and operational efficiency.",
    category: "Real-time Systems",
    technologies: ["Django", "Django Channels", "WebSockets", "Python", "C#", "pytest"],
    status: "consultation", 
    image: RealTimeSystems.src,
    client: "Tensator Group",
    features: [
      "Real-time WebSocket communication",
      "Multi-device state synchronization",
      "15% improvement in wait time accuracy",
      "Robust messaging server architecture",
      "Integration with C# edge devices",
      "Comprehensive error handling and logging"
    ],
    challenges: [
      "Synchronizing state across diverse device types",
      "Ensuring data integrity with real-time updates",
      "Managing complex device communication protocols",
      "Implementing failsafe mechanisms for edge cases"
    ],
    results: [
      "15% more accurate customer wait time estimates",
      "Seamless real-time device communication",
      "Improved customer satisfaction scores",
      "Raspberry Pi compatible cost-effective version"
    ],
    duration: "2 years (Nov 2021 - Dec 2023)",
    year: 2023,
    featured: true
  },
  {
    id: "motorsport-web-applications", 
    title: "Motorsport Driver Portfolio Websites",
    description: "Custom web applications for motorsport industry using Flask, Django, and Vue.js",
    longDescription: "Developed custom web applications for motorsport drivers and teams, creating professional portfolio websites that showcase achievements, attract sponsors, and engage fans. Built using modern Python frameworks and responsive design principles.",
    category: "Web Applications",
    technologies: ["Flask", "Django", "Vue.js", "Python", "JavaScript", "RESTful APIs"],
    status: "consultation",
    image: WebDevelopment.src, 
    client: "Torque Motorsport",
    features: [
      "Custom motorsport-focused web applications",
      "Flask for lightweight, flexible solutions",
      "Django for complex, feature-rich projects",
      "Vue.js responsive user interfaces",
      "RESTful API integrations",
      "Cross-browser compatibility"
    ],
    challenges: [
      "Creating unique designs for different drivers",
      "Integrating with motorsport data APIs",
      "Ensuring fast loading for global audiences",
      "Managing multiple client requirements simultaneously"
    ],
    results: [
      "Professional online presence for multiple drivers",
      "Improved sponsor engagement and acquisition",
      "Mobile-responsive design reaching wider audiences",
      "Successful client relationship spanning 2.5 years"
    ],
    duration: "2.5 years (May 2019 - Nov 2021)",
    year: 2021,
    featured: true
  },
  {
    id: "iot-device-integration",
    title: "IoT Device Integration Platform", 
    description: "Python-based system for managing and communicating with various IoT devices and sensors",
    longDescription: "Built a comprehensive IoT device management platform that handles communication with multiple device types, processes sensor data, and provides real-time monitoring capabilities. Implemented secure networking and data processing pipelines.",
    category: "IoT Projects",
    technologies: ["Python", "Raspberry Pi", "OpenCV", "YoloV5", "MQTT", "WebSockets", "Network Security", "Real-time Processing"],
    status: "consultation",
    image: IoTIntegration.src,
    client: "Tensator Group",
    features: [
      "Multi-device communication protocols",
      "Real-time sensor data processing",
      "Secure local network implementation",
      "Salting and public-key encryption",
      "Raspberry Pi compatible architecture",
      "Comprehensive error handling and logging",
      "Real-time data visualization dashboards"
    ],
    challenges: [
      "Managing diverse IoT device protocols",
      "Ensuring network security for sensitive data",
      "Implementing reliable real-time communication",
      "Creating cost-effective Raspberry Pi solutions"
    ],
    results: [
      "Seamless integration of multiple IoT devices",
      "Secure, non-discoverable network implementation",
      "Cost-effective solution compatible with budget hardware",
      "Reliable real-time data processing and reporting"
    ],
    duration: "Integrated into queue management project",
    year: 2022,
    featured: true
  }
]

// ===== UTILITY FUNCTIONS =====

let cachedCategories: string[] | null = null
let cachedTechnologies: string[] | null = null
let cachedYears: number[] | null = null

/**
 * Get all projects combined and sorted
 */
export const getAllProjects = (): Project[] => {
  return [...LIVE_PROJECTS, ...CV_PROJECTS].sort((a, b) => {
    // Featured projects first, then by year (newest first)
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.year - a.year
  })
}

/**
 * Get only featured projects
 */
export const getFeaturedProjects = (): Project[] => {
  return getAllProjects().filter(project => project.featured)
}

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'All') return getAllProjects()
  return getAllProjects().filter(project => project.category === category)
}

/**
 * Get projects by technology
 */
export const getProjectsByTechnology = (technology: string): Project[] => {
  return getAllProjects().filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  )
}

/**
 * Get projects by status
 */
export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return getAllProjects().filter(project => project.status === status)
}

/**
 * Get projects by year
 */
export const getProjectsByYear = (year: number): Project[] => {
  return getAllProjects().filter(project => project.year === year)
}

/**
 * Search projects by query
 */
export const searchProjects = (query: string): Project[] => {
  const lowercaseQuery = query.toLowerCase().trim()
  if (!lowercaseQuery) return getAllProjects()
  
  return getAllProjects().filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.longDescription.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => 
      tech.toLowerCase().includes(lowercaseQuery)
    ) ||
    project.category.toLowerCase().includes(lowercaseQuery) ||
    (project.client && project.client.toLowerCase().includes(lowercaseQuery)) ||
    // ENHANCED: Also search features, challenges, results like filterProjects does
    project.features.some(feature => 
      feature.toLowerCase().includes(lowercaseQuery)
    ) ||
    project.challenges.some(challenge => 
      challenge.toLowerCase().includes(lowercaseQuery)
    ) ||
    project.results.some(result => 
      result.toLowerCase().includes(lowercaseQuery)
    )
  )
}

/**
 * Get unique categories from all projects (including 'All')
 */
export const getUniqueCategories = (): string[] => {
  if (cachedCategories === null) {
    const categories = getAllProjects().map(project => project.category)
    cachedCategories = ['All', ...new Set(categories)].sort()
  }
  return cachedCategories
}

/**
 * Get unique technologies from all projects
 */
export const getUniqueTechnologies = (): string[] => {
  if (cachedTechnologies === null) {
    const technologies = getAllProjects().flatMap(project => project.technologies)
    cachedTechnologies = [...new Set(technologies)].sort()
  }
  return cachedTechnologies
}
/**
 * Get unique years from all projects
 */
export const getProjectYears = (): number[] => {
  if (cachedYears === null) {
    const years = getAllProjects().map(project => project.year)
    cachedYears = [...new Set(years)].sort((a, b) => b - a)
  }
  return cachedYears
}

/**
 * Get project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  return getAllProjects().find(project => project.id === id)
}

/**
 * Get recent projects (last 2 years)
 */
export const getRecentProjects = (): Project[] => {
  const currentYear = new Date().getFullYear()
  return getAllProjects().filter(project => project.year >= currentYear - 2)
}

/**
 * Get related projects based on technologies or category
 */
export const getRelatedProjects = (project: Project, limit: number = 3): Project[] => {
  const allProjects = getAllProjects().filter(p => p.id !== project.id)
  
  // Score projects based on similarity
  const scoredProjects = allProjects.map(p => {
    let score = 0
    
    // Same category gets high score
    if (p.category === project.category) score += 3
    
    // Shared technologies get points
    const sharedTechs = p.technologies.filter(tech => 
      project.technologies.includes(tech)
    ).length
    score += sharedTechs
    
    // Recent projects get slight boost
    if (Math.abs(p.year - project.year) <= 1) score += 1
    
    // Same status gets points
    if (p.status === project.status) score += 1
    
    return { project: p, score }
  })
  
  // Sort by score and return top projects
  return scoredProjects
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project)
}

/**
 * Group projects by year
 */
export const getProjectsByYearGrouped = (): Record<number, Project[]> => {
  const projects = getAllProjects()
  const groupedByYear: Record<number, Project[]> = {}
  
  projects.forEach(project => {
    if (!groupedByYear[project.year]) {
      groupedByYear[project.year] = []
    }
    groupedByYear[project.year].push(project)
  })
  
  return groupedByYear
}

/**
 * Get technology usage statistics
 */
export const getTechnologyStats = (): Array<{ technology: string; count: number; percentage: number }> => {
  const allProjects = getAllProjects()
  const techCounts: Record<string, number> = {}
  
  allProjects.forEach(project => {
    project.technologies.forEach(tech => {
      techCounts[tech] = (techCounts[tech] || 0) + 1
    })
  })
  
  const totalProjects = allProjects.length
  
  return Object.entries(techCounts)
    .map(([technology, count]) => ({
      technology,
      count,
      percentage: Math.round((count / totalProjects) * 100)
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get comprehensive project statistics
 */
export const getProjectStats = () => {
  const allProjects = getAllProjects()
  const liveProjects = getProjectsByStatus('live')
  const consultationProjects = getProjectsByStatus('consultation')
  const caseStudyProjects = getProjectsByStatus('case-study')
  const categories = getUniqueCategories()
  const technologies = getUniqueTechnologies()
  
  return {
    total: allProjects.length,
    live: liveProjects.length,
    consultation: consultationProjects.length,
    caseStudy: caseStudyProjects.length,
    featured: getFeaturedProjects().length,
    categories: categories.length - 1, // Subtract 'All' category
    technologies: technologies.length,
    years: getProjectYears().length,
    recentProjects: getRecentProjects().length,
    averageYear: Math.round(
      allProjects.reduce((sum, project) => sum + project.year, 0) / allProjects.length
    ),
    oldestProject: Math.min(...allProjects.map(p => p.year)),
    newestProject: Math.max(...allProjects.map(p => p.year))
  }
}

/**
 * Filter projects by multiple criteria
 */
export const filterProjects = (filters: {
  category?: string
  technologies?: string[]
  status?: Project['status']
  year?: number
  featured?: boolean
  search?: string
}): Project[] => {
  let filteredProjects = getAllProjects()
  
  // Category filter
  if (filters.category && filters.category !== 'All') {
    filteredProjects = filteredProjects.filter(p => p.category === filters.category)
  }
  
  // Technology filter - FIXED: Better case handling
  if (filters.technologies && filters.technologies.length > 0) {
    filteredProjects = filteredProjects.filter(p =>
      filters.technologies!.some(filterTech =>
        p.technologies.some(projectTech => 
          projectTech.toLowerCase().includes(filterTech.toLowerCase().trim())
        )
      )
    )
  }
  
  // Status filter
  if (filters.status) {
    filteredProjects = filteredProjects.filter(p => p.status === filters.status)
  }
  
  // Year filter
  if (filters.year) {
    filteredProjects = filteredProjects.filter(p => p.year === filters.year)
  }
  
  // Featured filter
  if (filters.featured !== undefined) {
    filteredProjects = filteredProjects.filter(p => p.featured === filters.featured)
  }
  
  // FIXED: Search filter now works with already filtered results
  if (filters.search && filters.search.trim()) {
    const searchQuery = filters.search.toLowerCase().trim()
    filteredProjects = filteredProjects.filter(project =>
      project.title.toLowerCase().includes(searchQuery) ||
      project.description.toLowerCase().includes(searchQuery) ||
      project.longDescription.toLowerCase().includes(searchQuery) ||
      project.technologies.some(tech => 
        tech.toLowerCase().includes(searchQuery)
      ) ||
      project.category.toLowerCase().includes(searchQuery) ||
      (project.client && project.client.toLowerCase().includes(searchQuery)) ||
      (project.features && project.features.some(feature => 
        feature.toLowerCase().includes(searchQuery)
      )) ||
      (project.challenges && project.challenges.some(challenge => 
        challenge.toLowerCase().includes(searchQuery)
      )) ||
      (project.results && project.results.some(result => 
        result.toLowerCase().includes(searchQuery)
      ))
    )
  }
  
  return filteredProjects
}

/**
 * Sort projects by different criteria
 */
export const sortProjects = (projects: Project[], sortBy: string): Project[] => {
  const projectsCopy = [...projects]
  
  switch (sortBy) {
    case 'featured':
    case 'default':
      return projectsCopy.sort((a, b) => {
        // Featured projects first
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        // Then by year (newest first)
        return b.year - a.year
      })
    
    case 'newest':
    case 'year-desc':
      return projectsCopy.sort((a, b) => b.year - a.year)
    
    case 'oldest':
    case 'year-asc':
      return projectsCopy.sort((a, b) => a.year - b.year)
    
    case 'alphabetical':
    case 'title-asc':
      return projectsCopy.sort((a, b) => a.title.localeCompare(b.title))
    
    case 'title-desc':
      return projectsCopy.sort((a, b) => b.title.localeCompare(a.title))
    
    case 'live-first':
      return projectsCopy.sort((a, b) => {
        // Live projects first
        if (a.status === 'live' && b.status !== 'live') return -1
        if (a.status !== 'live' && b.status === 'live') return 1
        // Then by year (newest first)
        return b.year - a.year
      })
    
    case 'consultation-first':
      return projectsCopy.sort((a, b) => {
        // Consultation projects first
        if (a.status === 'consultation' && b.status !== 'consultation') return -1
        if (a.status !== 'consultation' && b.status === 'consultation') return 1
        // Then by year (newest first)
        return b.year - a.year
      })
    
    case 'category-asc':
      return projectsCopy.sort((a, b) => {
        const categoryCompare = a.category.localeCompare(b.category)
        // If same category, sort by year (newest first)
        return categoryCompare !== 0 ? categoryCompare : b.year - a.year
      })
    
    case 'category-desc':
      return projectsCopy.sort((a, b) => {
        const categoryCompare = b.category.localeCompare(a.category)
        // If same category, sort by year (newest first)
        return categoryCompare !== 0 ? categoryCompare : b.year - a.year
      })
    
    case 'client-asc':
      return projectsCopy.sort((a, b) => {
        const aClient = a.client || 'ZZZ' // Put projects without clients at end
        const bClient = b.client || 'ZZZ'
        const clientCompare = aClient.localeCompare(bClient)
        // If same client (or both null), sort by year
        return clientCompare !== 0 ? clientCompare : b.year - a.year
      })
    
    case 'duration-asc':
      return projectsCopy.sort((a, b) => {
        // Extract numeric duration for comparison (rough approximation)
        const getDurationMonths = (duration: string): number => {
          const lower = duration.toLowerCase()
          if (lower.includes('week')) return 0.25
          if (lower.includes('month')) {
            const match = lower.match(/(\d+)\s*month/)
            return match ? parseInt(match[1]) : 1
          }
          if (lower.includes('year')) {
            const match = lower.match(/(\d+(?:\.\d+)?)\s*year/)
            return match ? parseFloat(match[1]) * 12 : 12
          }
          return 1 // Default to 1 month
        }
        
        const aDuration = getDurationMonths(a.duration)
        const bDuration = getDurationMonths(b.duration)
        return aDuration - bDuration
      })
    
    default:
      console.warn(`Unknown sort option: ${sortBy}, using default`)
      return projectsCopy.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.year - a.year
      })
  }
}

/**
 * ENHANCED: Get available sorting options with labels
 */
export const getSortingOptions = (): Array<{ value: string; label: string }> => {
  return [
    { value: 'featured', label: 'Featured First' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A-Z by Title' },
    { value: 'title-desc', label: 'Z-A by Title' },
    { value: 'live-first', label: 'Live Projects First' },
    { value: 'consultation-first', label: 'Consultation First' },
    { value: 'category-asc', label: 'Category A-Z' },
    { value: 'category-desc', label: 'Category Z-A' },
    { value: 'client-asc', label: 'Client A-Z' },
    { value: 'duration-asc', label: 'Shortest Duration First' }
  ]
}

/**
 * ENHANCED: Advanced search with field-specific queries
 */
export const advancedSearchProjects = (queries: {
  title?: string
  description?: string
  technology?: string
  client?: string
  category?: string
  general?: string
}): Project[] => {
  let results = getAllProjects()
  
  if (queries.title) {
    const titleQuery = queries.title.toLowerCase().trim()
    results = results.filter(p => p.title.toLowerCase().includes(titleQuery))
  }
  
  if (queries.description) {
    const descQuery = queries.description.toLowerCase().trim()
    results = results.filter(p => 
      p.description.toLowerCase().includes(descQuery) ||
      p.longDescription.toLowerCase().includes(descQuery)
    )
  }
  
  if (queries.technology) {
    const techQuery = queries.technology.toLowerCase().trim()
    results = results.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes(techQuery))
    )
  }
  
  if (queries.client) {
    const clientQuery = queries.client.toLowerCase().trim()
    results = results.filter(p => 
      p.client && p.client.toLowerCase().includes(clientQuery)
    )
  }
  
  if (queries.category) {
    const categoryQuery = queries.category.toLowerCase().trim()
    results = results.filter(p => p.category.toLowerCase().includes(categoryQuery))
  }
  
  if (queries.general) {
    // General search across all fields
    const generalQuery = queries.general.toLowerCase().trim()
    results = results.filter(project =>
      project.title.toLowerCase().includes(generalQuery) ||
      project.description.toLowerCase().includes(generalQuery) ||
      project.longDescription.toLowerCase().includes(generalQuery) ||
      project.technologies.some(tech => tech.toLowerCase().includes(generalQuery)) ||
      project.category.toLowerCase().includes(generalQuery) ||
      (project.client && project.client.toLowerCase().includes(generalQuery)) ||
      project.features.some(feature => feature.toLowerCase().includes(generalQuery)) ||
      project.challenges.some(challenge => challenge.toLowerCase().includes(generalQuery)) ||
      project.results.some(result => result.toLowerCase().includes(generalQuery))
    )
  }
  
  return results
}

/**
 * NEW: Get filter statistics for UI feedback
 */
export const getFilterStats = (filters: {
  category?: string
  technologies?: string[]
  status?: Project['status']
  year?: number
  featured?: boolean
  search?: string
}) => {
  const allProjects = getAllProjects()
  const filteredProjects = filterProjects(filters)
  
  return {
    total: allProjects.length,
    filtered: filteredProjects.length,
    percentage: Math.round((filteredProjects.length / allProjects.length) * 100),
    hidden: allProjects.length - filteredProjects.length
  }
}

/**
 * NEW: Validate filter parameters
 */
export const validateFilters = (filters: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (filters.category && typeof filters.category !== 'string') {
    errors.push('Category must be a string')
  }
  
  if (filters.technologies && !Array.isArray(filters.technologies)) {
    errors.push('Technologies must be an array')
  }
  
  if (filters.status && !['live', 'consultation', 'case-study'].includes(filters.status)) {
    errors.push('Status must be one of: live, consultation, case-study')
  }
  
  if (filters.year && (typeof filters.year !== 'number' || filters.year < 2000 || filters.year > 2030)) {
    errors.push('Year must be a valid number between 2000 and 2030')
  }
  
  if (filters.featured !== undefined && typeof filters.featured !== 'boolean') {
    errors.push('Featured must be a boolean')
  }
  
  if (filters.search && typeof filters.search !== 'string') {
    errors.push('Search must be a string')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * NEW: Get suggested searches based on project content
 */
export const getSuggestedSearches = (): string[] => {
  const allProjects = getAllProjects()
  const suggestions = new Set<string>()
  
  // Add popular technologies
  const techStats = getTechnologyStats()
  techStats.slice(0, 5).forEach(tech => {
    suggestions.add(tech.technology.toLowerCase())
  })
  
  // Add categories
  getUniqueCategories().forEach(category => {
    if (category !== 'All') {
      suggestions.add(category.toLowerCase())
    }
  })
  
  // Add clients
  allProjects.forEach(project => {
    if (project.client) {
      suggestions.add(project.client.toLowerCase())
    }
  })
  
  // Add some common search terms based on features/results
  const commonTerms = ['real-time', 'responsive', 'api', 'dashboard', 'automation', 'integration']
  commonTerms.forEach(term => suggestions.add(term))
  
  return Array.from(suggestions).sort()
}

// Function to clear cache if projects are updated
export const clearProjectCache = (): void => {
  cachedCategories = null
  cachedTechnologies = null
  cachedYears = null
}

// ===== CASE STUDIES =====

export const CASE_STUDIES = {
  "mapaction-geospatial-pipeline": {
    problemStatement: "MapAction needed to reduce geospatial data processing time from several hours to under 1 hour for rapid humanitarian crisis response.",
    solution: "Developed an automated Python pipeline with Docker containerization, robust error handling, and CI/CD integration using Jenkins.",
    technicalApproach: [
      "Designed modular Python data processing workflows",
      "Implemented comprehensive error handling and logging",
      "Created unit tests using pytest for reliability",
      "Dockerized application for consistent deployment",
      "Set up CI/CD pipeline with Jenkins for automated testing"
    ],
    businessImpact: [
      "20% reduction in data processing time",
      "Faster humanitarian response capabilities",
      "Improved reliability for emergency situations",
      "Streamlined volunteer contribution process"
    ]
  },
  
  "tensator-queue-management": {
    problemStatement: "Tensator needed a real-time system to coordinate multiple devices and improve customer wait time predictions accuracy.",
    solution: "Built a Django Channels WebSocket server with robust state management to synchronize data across diverse connected devices.",
    technicalApproach: [
      "Implemented Django Channels for WebSocket communication",
      "Designed state management model for device synchronization",
      "Created robust messaging server architecture",
      "Integrated with C# edge devices and peripherals",
      "Developed comprehensive testing and error handling"
    ],
    businessImpact: [
      "15% improvement in wait time estimate accuracy",
      "Enhanced customer experience and satisfaction",
      "Seamless real-time device communication",
      "Cost-effective Raspberry Pi compatible version"
    ]
  },
  
  "motorsport-web-applications": {
    problemStatement: "Motorsport drivers needed professional websites to showcase achievements, attract sponsors, and engage with fans.",
    solution: "Developed custom web applications using Flask and Django with Vue.js frontends, tailored to motorsport industry needs.",
    technicalApproach: [
      "Flask for lightweight, flexible project requirements",
      "Django for complex applications with admin features",
      "Vue.js for responsive, interactive user interfaces",
      "RESTful API integration for dynamic content",
      "Cross-browser compatibility and mobile optimization"
    ],
    businessImpact: [
      "Professional online presence for multiple drivers",
      "Improved sponsor engagement and acquisition",
      "Wider audience reach through responsive design",
      "Long-term client relationship over 2.5 years"
    ]
  }
} as const

// ===== TECHNOLOGY USAGE =====

export const TECHNOLOGY_USAGE = (): Record<string, { projects: number; percentage: number }> => {
  const techStats = getTechnologyStats()
  const result: Record<string, { projects: number; percentage: number }> = {}
  
  techStats.forEach(tech => {
    result[tech.technology] = {
      projects: tech.count,
      percentage: tech.percentage
    }
  })
  
  return result
}

// ===== DEFAULT EXPORT =====

export default {
  LIVE_PROJECTS,
  CV_PROJECTS,
  getAllProjects,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectsByTechnology,
  getProjectsByStatus,
  getProjectsByYear,
  searchProjects,
  getUniqueCategories,
  getUniqueTechnologies,
  getProjectYears,
  getProjectById,
  getRecentProjects,
  getRelatedProjects,
  getProjectsByYearGrouped,
  getTechnologyStats,
  getProjectStats,
  getSortingOptions,          
  advancedSearchProjects,     
  getFilterStats,            
  validateFilters,           
  getSuggestedSearches,      
  filterProjects,
  sortProjects,
  clearProjectCache,
  CASE_STUDIES,
  TECHNOLOGY_USAGE
}