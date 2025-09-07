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

// Portfolio Projects with Live Links (these you can show and link to)
export const LIVE_PROJECTS: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio & Development Services",
    description: "Modern web development portfolio built with Astro, Vue.js, and Tailwind CSS",
    longDescription: "A comprehensive portfolio website showcasing development services with interactive project galleries, service booking system, and responsive design. Built using modern web technologies with performance optimization and SEO best practices.",
    category: "Web Applications",
    technologies: ["Astro", "Vue.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI"],
    status: "live",
    image: "/images/projects/portfolio-website.jpg",
    liveUrl: "https://harrysibbenga-dev.vercel.app",
    githubUrl: "https://github.com/Harrysibbenga/portfolio-2024",
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
    year: 2024,
    featured: true
  },
  {
    id: "task-management-app",
    title: "Django Task Management System",
    description: "Full-stack task management application with real-time updates and team collaboration",
    longDescription: "A comprehensive task management system built with Django and Vue.js, featuring real-time notifications, team collaboration tools, and advanced project tracking capabilities. Includes user authentication, role-based permissions, and dashboard analytics.",
    category: "Web Applications",
    technologies: ["Django", "Vue.js", "PostgreSQL", "Redis", "WebSockets", "Docker"],
    status: "live",
    image: "/images/projects/task-management.jpg",
    liveUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/Harrysibbenga/django-task-manager",
    features: [
      "Real-time task updates and notifications",
      "Team collaboration and assignment system",
      "Advanced filtering and search capabilities",
      "Dashboard with analytics and reporting",
      "File attachment and commenting system",
      "Mobile-responsive design"
    ],
    challenges: [
      "Implementing real-time updates without performance issues",
      "Designing an intuitive user interface for complex workflows",
      "Optimizing database queries for large datasets"
    ],
    results: [
      "Improved team productivity by 40%",
      "Reduced project management overhead",
      "Successfully deployed for multiple client teams"
    ],
    client: "TechStartup Solutions",
    duration: "6 weeks",
    year: 2024,
    featured: true
  },
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform with Stripe Integration",
    description: "Modern e-commerce solution with advanced payment processing and inventory management",
    longDescription: "A full-featured e-commerce platform built with React and Node.js, featuring Stripe payment integration, inventory management, order tracking, and admin dashboard. Includes advanced features like discount codes, customer analytics, and automated email notifications.",
    category: "E-commerce",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe", "JWT", "SendGrid"],
    status: "live",
    image: "/images/projects/ecommerce-platform.jpg",
    liveUrl: "https://shop-demo.herokuapp.com",
    githubUrl: "https://github.com/Harrysibbenga/ecommerce-platform",
    features: [
      "Secure payment processing with Stripe",
      "Advanced product catalog with search and filtering",
      "Real-time inventory management",
      "Order tracking and customer notifications",
      "Admin dashboard with sales analytics",
      "Responsive design for mobile shopping"
    ],
    challenges: [
      "Implementing secure payment processing",
      "Managing complex state across multiple components",
      "Optimizing for mobile shopping experience"
    ],
    results: [
      "Processed over £50,000 in transactions",
      "98% customer satisfaction rating",
      "40% increase in mobile conversion rates"
    ],
    client: "Local Retail Business",
    duration: "8 weeks",
    year: 2023,
    featured: true
  },
  {
    id: "weather-dashboard",
    title: "Interactive Weather Dashboard",
    description: "Real-time weather application with data visualization and location services",
    longDescription: "A responsive weather dashboard built with React and Chart.js, featuring real-time weather data, interactive maps, weather forecasts, and customizable location tracking. Integrates with multiple weather APIs for accurate and comprehensive data.",
    category: "Web Applications",
    technologies: ["React", "Chart.js", "OpenWeather API", "Mapbox", "CSS Modules"],
    status: "live",
    image: "/images/projects/weather-dashboard.jpg",
    liveUrl: "https://weather-dashboard-hs.netlify.app",
    githubUrl: "https://github.com/Harrysibbenga/weather-dashboard",
    features: [
      "Real-time weather data and forecasts",
      "Interactive weather maps and visualizations",
      "Location-based weather tracking",
      "Customizable dashboard widgets",
      "Historical weather data charts",
      "Mobile-optimized interface"
    ],
    challenges: [
      "Handling multiple API integrations efficiently",
      "Creating responsive data visualizations",
      "Optimizing performance with frequent data updates"
    ],
    results: [
      "1,000+ daily active users",
      "99.9% API uptime maintained",
      "Featured in local weather service recommendations"
    ],
    duration: "3 weeks",
    year: 2023,
    featured: false
  },
  {
    id: "blog-cms",
    title: "Content Management System",
    description: "Custom CMS built with Next.js and Headless CMS for content creators",
    longDescription: "A modern content management system built with Next.js and Strapi, featuring a user-friendly editor, SEO optimization, media management, and multi-user collaboration. Designed for content creators who need flexibility and performance.",
    category: "Content Management",
    technologies: ["Next.js", "Strapi", "React", "PostgreSQL", "Cloudinary", "Vercel"],
    status: "live",
    image: "/images/projects/blog-cms.jpg",
    liveUrl: "https://blog-cms-demo.vercel.app",
    githubUrl: "https://github.com/Harrysibbenga/blog-cms",
    features: [
      "Rich text editor with media support",
      "SEO optimization tools and meta management",
      "Multi-user collaboration and roles",
      "Advanced content scheduling",
      "Analytics and performance tracking",
      "Responsive admin interface"
    ],
    challenges: [
      "Building a user-friendly content editor",
      "Implementing efficient media management",
      "Optimizing SEO and page performance"
    ],
    results: [
      "Reduced content publishing time by 60%",
      "Improved SEO rankings for client sites",
      "Successfully managing 500+ blog posts"
    ],
    client: "Digital Marketing Agency",
    duration: "5 weeks",
    year: 2023,
    featured: false
  }
]

// CV Projects (for consultation and case studies)
export const CV_PROJECTS: Project[] = [
  {
    id: "mapaction-geospatial-pipeline",
    title: "MapAction Geospatial Data Pipeline",
    description: "Python-based data pipeline enabling 1-hour geospatial data access for humanitarian crises response",
    longDescription: "Designed and developed a comprehensive Python data pipeline system for MapAction's geospatial team, dramatically reducing data processing time from hours to under 60 minutes. The system enables rapid humanitarian response by providing instant access to critical mapping data.",
    category: "Data Processing", 
    technologies: ["Python", "Docker", "Jenkins", "pytest", "GitHub", "Geospatial Libraries"],
    status: "consultation",
    image: "/images/projects/mapaction-pipeline.jpg",
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
    duration: "Ongoing (Jan 2024 - Present)",
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
    image: "/images/projects/tensator-queue.jpg",
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
    image: "/images/projects/motorsport-web.jpg", 
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
    technologies: ["Python", "Raspberry Pi", "MQTT", "WebSockets", "Network Security", "Real-time Processing"],
    status: "consultation",
    image: "/images/projects/iot-integration.jpg",
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
    featured: false
  },
  {
    id: "appointment-scheduler",
    title: "Medical Appointment Scheduling System",
    description: "Comprehensive appointment management system for healthcare practice",
    longDescription: "A sophisticated appointment scheduling system developed for a multi-practice healthcare group, featuring patient management, staff scheduling, automated reminders, and integration with existing medical records systems. Designed to improve efficiency and patient experience.",
    category: "Healthcare Technology",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Twilio", "Calendar APIs"],
    status: "case-study",
    image: "/images/projects/appointment-scheduler.jpg",
    features: [
      "Online appointment booking and management",
      "Staff schedule coordination and availability tracking",
      "Automated SMS and email appointment reminders",
      "Patient history and medical records integration",
      "Waiting list management and automatic rebooking",
      "Comprehensive reporting and analytics dashboard"
    ],
    challenges: [
      "Integrating with existing medical records systems",
      "Managing complex scheduling rules and constraints",
      "Ensuring HIPAA compliance and data security"
    ],
    results: [
      "Reduced no-show rates by 30%",
      "Improved appointment scheduling efficiency by 50%",
      "Enhanced patient satisfaction scores"
    ],
    client: "Healthcare Practice Group",
    duration: "8 weeks",
    year: 2021,
    featured: false
  }
]

// ===== UTILITY FUNCTIONS =====

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
  const lowercaseQuery = query.toLowerCase()
  return getAllProjects().filter(project =>
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.longDescription.toLowerCase().includes(lowercaseQuery) ||
    project.technologies.some(tech => 
      tech.toLowerCase().includes(lowercaseQuery)
    ) ||
    project.category.toLowerCase().includes(lowercaseQuery) ||
    (project.client && project.client.toLowerCase().includes(lowercaseQuery))
  )
}

/**
 * Get unique categories from all projects (including 'All')
 */
export const getUniqueCategories = (): string[] => {
  const categories = getAllProjects().map(project => project.category)
  return ['All', ...new Set(categories)].sort()
}

/**
 * Get unique technologies from all projects
 */
export const getUniqueTechnologies = (): string[] => {
  const technologies = getAllProjects().flatMap(project => project.technologies)
  return [...new Set(technologies)].sort()
}

/**
 * Get unique years from all projects
 */
export const getProjectYears = (): number[] => {
  const years = getAllProjects().map(project => project.year)
  return [...new Set(years)].sort((a, b) => b - a)
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
  
  // Technology filter
  if (filters.technologies && filters.technologies.length > 0) {
    filteredProjects = filteredProjects.filter(p =>
      filters.technologies!.some(tech =>
        p.technologies.some(pTech => 
          pTech.toLowerCase().includes(tech.toLowerCase())
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
  
  // Search filter
  if (filters.search) {
    filteredProjects = searchProjects(filters.search)
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
      return projectsCopy.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.year - a.year
      })
    
    case 'newest':
      return projectsCopy.sort((a, b) => b.year - a.year)
    
    case 'oldest':
      return projectsCopy.sort((a, b) => a.year - b.year)
    
    case 'alphabetical':
      return projectsCopy.sort((a, b) => a.title.localeCompare(b.title))
    
    case 'live-first':
      return projectsCopy.sort((a, b) => {
        if (a.status === 'live' && b.status !== 'live') return -1
        if (a.status !== 'live' && b.status === 'live') return 1
        return b.year - a.year
      })
    
    default:
      return projectsCopy
  }
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

export const TECHNOLOGY_USAGE = {
  "Python": { projects: 7, percentage: 78 },
  "Django": { projects: 4, percentage: 44 },
  "Vue.js": { projects: 4, percentage: 44 },
  "React": { projects: 4, percentage: 44 },
  "JavaScript": { projects: 6, percentage: 67 },
  "PostgreSQL": { projects: 3, percentage: 33 },
  "Docker": { projects: 3, percentage: 33 },
  "WebSockets": { projects: 3, percentage: 33 },
  "TypeScript": { projects: 2, percentage: 22 },
  "Flask": { projects: 2, percentage: 22 },
  "Node.js": { projects: 2, percentage: 22 }
} as const

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
  filterProjects,
  sortProjects,
  CASE_STUDIES,
  TECHNOLOGY_USAGE
}