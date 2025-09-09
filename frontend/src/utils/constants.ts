// src/utils/constants.ts
/**
 * Centralized business configuration for Harry Sibbenga Web Development Services
 * Personal brand with CodeForge Solutions Ltd as the legal entity
 */

export const BUSINESS_INFO = {
  // Personal branding (for website content)
  name: "Harry Sibbenga",
  fullBusinessName: "Harry Sibbenga Software Solution Services",
  tagline: "Full-Stack Solutions",
  description: "Experienced Python developer specializing in scalable web applications, data processing, and real-time systems. 5+ years building robust solutions for humanitarian, corporate, and IoT domains.",
  
  // Legal entity information
  legalEntity: {
    name: "CodeForge Solutions Ltd",
    type: "Limited Company",
    companyNumber: "16703742", // Update when you receive it
    registeredOffice: {
      street: "86-90, Paul Street",
      area: "Shoreditch", 
      city: "London",
      postcode: "EC2A 4NE",
      country: "United Kingdom"
    }
  },
  
  // Contact Information
  contact: {
    email: "sibbengaharry@gmail.com",
    phone: "07802738966",
    address: {
      street: "",
      area: "Bukinghanshire", 
      city: "Milton Keynes",
      postcode: "",
      country: "United Kingdom"
    }
  },

  // Social Media & Professional Links
  social: {
    github: "https://github.com/Harrysibbenga",
    linkedin: "https://www.linkedin.com/in/harry-m-sibbenga-9b8584119/",
    email: "mailto:sibbengaharry@gmail.com"
  },

  // Service Areas
  serviceAreas: [
    "Milton Keynes", "Northampton", "Bedford", "Luton", "Oxford", "Cambridge",
    "London", "Birmingham", "Nottingham", "Leicester", "Coventry", "Reading"
  ],

  // Business Hours
  businessHours: {
    weekdays: "9:00 AM - 6:00 PM",
    weekends: "9:00 AM - 4:00 PM",
    timezone: "GMT"
  }
} as const

// Development Services Configuration
export const SERVICES = {
  websiteDevelopment: {
    title: "Website Development",
    description: "Professional business websites that convert visitors into customers. Mobile-responsive, fast-loading, and SEO optimized.",
    icon: "🌐",
    technologies: ["Python", "Django", "Vue.js", "HTML5", "CSS3", "JavaScript"],
    startingPrice: "From £1,500",
    hourlyRate: "£65-75/hour",
    features: [
      "Custom website design and development",
      "Mobile-responsive layouts",
      "SEO optimization",
      "Content management systems",
      "Contact forms and integrations",
      "Fast loading performance"
    ]
  },

  webDevelopment: {
    title: "Web Application Development",
    description: "Custom web applications using Python frameworks like Django and Flask, with modern frontend technologies",
    icon: "⚙️",
    technologies: ["Python", "Django", "Flask", "Vue.js", "JavaScript", "PostgreSQL"],
    startingPrice: "From £3,000",
    hourlyRate: "£85-100/hour",
    features: [
      "Custom web application development",
      "RESTful API development", 
      "Database design and optimization",
      "User authentication systems",
      "Responsive frontend design",
      "Cross-browser compatibility"
    ]
  },
  
  dataProcessing: {
    title: "Data Analysis & Processing",
    description: "Automated data pipelines, analysis workflows, and insights extraction using Python data science tools",
    icon: "📊", 
    technologies: ["Python", "Pandas", "NumPy", "PostgreSQL", "MongoDB", "Jupyter"],
    startingPrice: "From £2,500",
    hourlyRate: "£90-110/hour",
    features: [
      "Data pipeline development",
      "Automated workflow creation", 
      "Data analysis and visualization",
      "Database optimization",
      "Real-time data processing",
      "Custom reporting solutions"
    ]
  },
  
  realtimeSystems: {
    title: "Real-time Applications", 
    description: "WebSocket servers, real-time communication systems, and IoT device integration",
    icon: "⚡",
    technologies: ["Python", "Django Channels", "WebSockets", "Redis", "Docker"],
    startingPrice: "From £5,000",
    hourlyRate: "£120-140/hour",
    features: [
      "Real-time communication systems",
      "WebSocket server development",
      "IoT device integration", 
      "State management systems",
      "Message queue implementation",
      "Scalable architecture design"
    ]
  },

  consultation: {
    title: "Technical Consultation",
    description: "Architecture review, code optimization, and technical guidance for existing projects",
    icon: "💡",
    technologies: ["Python", "System Architecture", "Code Review", "Performance"],
    startingPrice: "£120-150/hour",
    hourlyRate: "£120-150/hour",
    features: [
      "Code review and optimization",
      "Architecture consultation",
      "Performance improvement",
      "Technical documentation",
      "Team training and mentoring", 
      "Technology stack recommendations"
    ]
  }
} as const

// Technology Stack
export const TECHNOLOGIES = {
  backend: [
    { name: "Python", level: 95, years: 5, icon: "🐍", color: "#3776ab" },
    { name: "Django", level: 90, years: 4, icon: "🎯", color: "#092e20" },
    { name: "Flask", level: 85, years: 3, icon: "🌶️", color: "#000000" },
    { name: "FastAPI", level: 80, years: 2, icon: "⚡", color: "#009688" },
    { name: "PostgreSQL", level: 85, years: 4, icon: "🐘", color: "#336791" },
    { name: "MongoDB", level: 75, years: 3, icon: "🍃", color: "#47a248" }
  ],
  
  frontend: [
    { name: "JavaScript", level: 85, years: 4, icon: "📜", color: "#f7df1e" },
    { name: "Vue.js", level: 80, years: 3, icon: "💚", color: "#4fc08d" }, 
    { name: "HTML5", level: 90, years: 5, icon: "📄", color: "#e34f26" },
    { name: "CSS3", level: 85, years: 5, icon: "🎨", color: "#1572b6" },
    { name: "Tailwind CSS", level: 75, years: 2, icon: "💨", color: "#06b6d4" }
  ],
  
  tools: [
    { name: "Docker", level: 80, years: 3, icon: "🐳", color: "#2496ed" },
    { name: "Git/GitHub", level: 90, years: 5, icon: "📚", color: "#181717" },
    { name: "AWS", level: 75, years: 3, icon: "☁️", color: "#ff9900" },
    { name: "Jenkins", level: 70, years: 2, icon: "🔧", color: "#d33833" },
    { name: "pytest", level: 85, years: 4, icon: "🧪", color: "#0a9edc" }
  ],
  
  specialties: [
    { name: "Data Science", technologies: ["Pandas", "NumPy", "Scikit-learn"], icon: "📈" },
    { name: "Real-time Systems", technologies: ["WebSockets", "Django Channels"], icon: "⚡" },
    { name: "IoT Integration", technologies: ["MQTT", "Raspberry Pi", "C#"], icon: "🔌" },
    { name: "API Development", technologies: ["REST", "GraphQL", "OpenAPI"], icon: "🔗" }
  ]
} as const

// SEO Configuration
export const SEO_CONFIG = {
  siteUrl: "https://harrysibbenga.dev",
  defaultTitle: "Harry Sibbenga - Python Developer & Web Development Services",
  defaultDescription: "Professional Python developer with 5+ years experience building scalable web applications, data processing systems, and real-time solutions. Based in Milton Keynes, serving UK businesses.",
  author: "Harry Sibbenga",
  image: "/logo-512.png",
  
  keywords: [
    "Python developer", "Django development", "Flask development", "web development Milton Keynes",
    "data processing", "real-time applications", "IoT development", "API development",
    "full-stack developer", "Vue.js developer", "PostgreSQL", "web applications UK"
  ],
  
  twitterHandle: "@harrysibbenga", // Add if you have Twitter
  
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Harry Sibbenga",
    "jobTitle": "Python Developer",
    "description": "Professional Python developer specializing in web applications and data processing",
    "url": "https://harrysibbenga.dev",
    "worksFor": {
      "@type": "Organization",
      "name": "CodeForge Solutions Ltd",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Milton Keynes",
        "addressCountry": "GB"
      }
    },
    "sameAs": [
      "https://github.com/Harrysibbenga",
      "https://www.linkedin.com/in/harry-m-sibbenga-9b8584119/"
    ],
    "address": {
      "@type": "PostalAddress", 
      "addressLocality": "Milton Keynes",
      "addressCountry": "GB"
    }
  }
} as const

// Project Categories for Portfolio
export const PROJECT_CATEGORIES = [
  "All",
  "Websites",
  "Web Applications", 
  "Data Processing",
  "Real-time Systems",
  "IoT Projects",
  "API Development"
] as const

// Business Statistics
export const STATS = {
  experience: "5+",
  experienceLabel: "Years Experience",
  
  projects: "25+", 
  projectsLabel: "Projects Completed",
  
  clients: "15+",
  clientsLabel: "Happy Clients",
  
  technologies: "12+",
  technologiesLabel: "Technologies Mastered"
} as const

// Testimonials
export const TESTIMONIALS = [
  {
    name: "MapAction Team",
    role: "Humanitarian Organization",
    company: "MapAction",
    testimonial: "Harry's work on our geospatial data pipeline was exceptional. His Python expertise helped us reduce data processing time by 20%, enabling faster humanitarian response.",
    rating: 5,
    avatar: "/images/testimonials/mapaction.jpg"
  },
  {
    name: "Tensator Development Team", 
    role: "Product Manager",
    company: "Tensator Group",
    testimonial: "Harry developed a robust real-time queue management system using Django Channels. His attention to detail and technical skills exceeded our expectations.",
    rating: 5,
    avatar: "/images/testimonials/tensator.jpg"
  },
  {
    name: "Motorsport Client",
    role: "Team Owner", 
    company: "Torque Motorsport",
    testimonial: "The custom web applications Harry built for our motorsport drivers were outstanding. His use of Python and Vue.js created exactly what we needed.",
    rating: 5,
    avatar: "/images/testimonials/motorsport.jpg"
  }
] as const

// Contact Form Configuration
export const CONTACT_CONFIG = {
  subjects: [
    "Website Development",
    "Web Application Development",
    "Data Processing Solution", 
    "Real-time System Development",
    "Technical Consultation",
    "API Development",
    "General Inquiry"
  ],
  
  budgetRanges: [
    "Under £1,500",
    "£1,500 - £3,000", 
    "£3,000 - £5,000",
    "£5,000 - £10,000",
    "£10,000+",
    "Hourly Rate Discussion"
  ],
  
  timelines: [
    "ASAP (Rush job)",
    "Within 2 weeks",
    "Within 1 month", 
    "Within 3 months",
    "3+ months",
    "Flexible timeline"
  ]
} as const