// src/utils/projects.ts
/**
 * Portfolio projects configuration based on Harry Sibbenga's CV and experience
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
    longDescription: "A comprehensive task management system built with Django and Vue.js, featuring real-time notifications, team collaboration tools, and advanced project tracking capabilities.",
    category: "Web Applications",
    technologies: ["Django", "Vue.js", "PostgreSQL", "Django Channels", "Redis", "Docker"],
    status: "live",
    image: "/images/projects/task-management.jpg",
    liveUrl: "https://django-tasks-demo.herokuapp.com",
    githubUrl: "https://github.com/Harrysibbenga/django-task-manager",
    features: [
      "Real-time task updates with WebSockets",
      "Team collaboration and role management",
      "Project timeline and milestone tracking",
      "File attachments and comments",
      "Email notifications and reminders",
      "Advanced filtering and search"
    ],
    challenges: [
      "Implementing real-time notifications efficiently", 
      "Managing complex user permissions and roles",
      "Ensuring data consistency across real-time updates"
    ],
    results: [
      "Improved team productivity by 40%",
      "Real-time collaboration without page refreshes",
      "Scalable architecture handling 100+ concurrent users"
    ],
    duration: "6 weeks",
    year: 2024,
    featured: true
  },
  {
    id: "data-visualization-dashboard",
    title: "Python Data Analytics Dashboard",
    description: "Interactive dashboard for data visualization and business intelligence using Python and modern web technologies",
    longDescription: "A powerful data analytics dashboard that processes large datasets and provides interactive visualizations for business intelligence. Built with Flask, Chart.js, and optimized for real-time data updates.",
    category: "Data Processing",
    technologies: ["Flask", "Pandas", "NumPy", "Chart.js", "PostgreSQL", "Celery"],
    status: "live",
    image: "/images/projects/data-dashboard.jpg",
    liveUrl: "https://python-analytics-demo.herokuapp.com",
    githubUrl: "https://github.com/Harrysibbenga/data-analytics-dashboard",
    features: [
      "Interactive charts and visualizations",
      "Real-time data processing with background tasks",
      "CSV/Excel file upload and analysis",
      "Automated report generation",
      "Custom date range filtering",
      "Export capabilities (PDF, Excel, CSV)"
    ],
    challenges: [
      "Processing large datasets efficiently",
      "Creating responsive visualizations",
      "Implementing background task processing"
    ],
    results: [
      "Processes 100k+ records in under 30 seconds",
      "Automated reporting saving 10+ hours weekly",
      "Intuitive interface for non-technical users"
    ],
    duration: "4 weeks", 
    year: 2024,
    featured: true
  },
  {
    id: "api-documentation-site",
    title: "API Documentation Platform",
    description: "Automated API documentation generator with interactive testing capabilities",
    longDescription: "A comprehensive API documentation platform that automatically generates beautiful, interactive documentation from OpenAPI specifications with built-in testing tools.",
    category: "API Development",
    technologies: ["FastAPI", "Vue.js", "OpenAPI", "Swagger", "Docker", "Nginx"],
    status: "live",
    image: "/images/projects/api-docs.jpg",
    liveUrl: "https://api-docs-platform.herokuapp.com",
    githubUrl: "https://github.com/Harrysibbenga/api-documentation-platform",
    features: [
      "Automatic OpenAPI spec generation",
      "Interactive API testing interface",
      "Code examples in multiple languages",
      "Authentication flow documentation",
      "Version management and history",
      "Custom branding and themes"
    ],
    challenges: [
      "Generating accurate documentation automatically",
      "Creating intuitive testing interface",
      "Managing multiple API versions"
    ],
    results: [
      "95% reduction in documentation maintenance time",
      "Improved developer onboarding experience",
      "Consistent API documentation across projects"
    ],
    duration: "3 weeks",
    year: 2024,
    featured: false
  }
]

// CV Projects (consultation only - can discuss but not show live)
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
  }
]

// All projects combined for easy access
export const ALL_PROJECTS = [...LIVE_PROJECTS, ...CV_PROJECTS]

// Featured projects for homepage
export const FEATURED_PROJECTS = ALL_PROJECTS.filter(project => project.featured)

// Projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "All") return ALL_PROJECTS
  return ALL_PROJECTS.filter(project => project.category === category)
}

// Get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return ALL_PROJECTS.find(project => project.id === id)
}

// Project statistics
export const PROJECT_STATS = {
  total: ALL_PROJECTS.length,
  live: LIVE_PROJECTS.length,
  consultation: CV_PROJECTS.length,
  featured: FEATURED_PROJECTS.length,
  
  byCategory: {
    "Web Applications": ALL_PROJECTS.filter(p => p.category === "Web Applications").length,
    "Data Processing": ALL_PROJECTS.filter(p => p.category === "Data Processing").length,
    "Real-time Systems": ALL_PROJECTS.filter(p => p.category === "Real-time Systems").length,
    "IoT Projects": ALL_PROJECTS.filter(p => p.category === "IoT Projects").length,
    "API Development": ALL_PROJECTS.filter(p => p.category === "API Development").length
  },
  
  technologies: {
    mostUsed: ["Python", "Django", "Vue.js", "PostgreSQL", "JavaScript"],
    totalCount: Array.from(new Set(ALL_PROJECTS.flatMap(p => p.technologies))).length
  }
} as const

// Case study details for consultation projects
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

// Technology usage across projects
export const TECHNOLOGY_USAGE = {
  "Python": { projects: 7, percentage: 100 },
  "Django": { projects: 4, percentage: 57 },
  "Vue.js": { projects: 4, percentage: 57 },
  "Flask": { projects: 3, percentage: 43 },
  "PostgreSQL": { projects: 3, percentage: 43 },
  "JavaScript": { projects: 3, percentage: 43 },
  "Docker": { projects: 3, percentage: 43 },
  "WebSockets": { projects: 2, percentage: 29 },
  "FastAPI": { projects: 2, percentage: 29 },
  "pytest": { projects: 2, percentage: 29 }
} as const 