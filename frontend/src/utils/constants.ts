// src/utils/constants.ts
/**
 * Business-value-focused configuration for Harry Sibbenga Full-Stack Business Solutions
 * Updated positioning: Business solutions first, technical expertise second
 */

export const BUSINESS_INFO = {
  // Business-focused branding
  name: "Harry Sibbenga",
  fullBusinessName: "Harry Sibbenga - Full-Stack Business Solutions Developer",
  tagline: "Transforming Business Ideas Into Digital Solutions",
  description: "I help growing businesses streamline operations, increase efficiency, and scale revenue through custom web applications, automation, and digital transformation solutions.",
    
  // Legal entity information
  legalEntity: {
    name: "CodeForge Solutions Ltd",
    type: "Limited Company",
    companyNumber: "16703742",
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
    whatsapp: "https://wa.me/447802738966",
    address: {
      street: "",
      area: "Buckinghamshire", 
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

// Business-focused services configuration
export const SERVICES = {
  businessWebsites: {
    title: "Professional Business Websites",
    description: "Convert more visitors into customers with high-performance websites that showcase your expertise and drive growth.",
    icon: "🌐",
    businessValue: "Increase online presence and customer acquisition",
    technologies: ["Modern Web Technologies", "Mobile-Responsive Design", "SEO Optimization"],
    startingPrice: "From £1,500",
    hourlyRate: "£65-75/hour",
    features: [
      "Custom website design that reflects your brand",
      "Mobile-responsive for all devices",
      "SEO-optimized to attract more customers",
      "Fast loading speeds for better user experience",
      "Contact forms and lead capture systems",
      "Easy content management for updates"
    ],
  },

  webApplications: {
    title: "Custom Business Applications",
    description: "Streamline operations and boost productivity with custom web applications tailored to your specific business processes.",
    icon: "⚙️",
    businessValue: "Automate workflows and increase operational efficiency",
    technologies: ["Full-Stack Development", "Database Integration", "API Development"],
    startingPrice: "From £3,000",
    hourlyRate: "£85-100/hour",
    features: [
      "Custom application development for your needs",
      "User-friendly interfaces your team will love",
      "Secure user authentication and permissions",
      "Real-time data synchronization",
      "Integration with existing business tools",
      "Scalable architecture that grows with you"
    ],
  },
  
  dataAutomation: {
    title: "Business Process Automation",
    description: "Eliminate repetitive tasks and reduce errors with intelligent automation solutions that save time and money.",
    icon: "📊", 
    businessValue: "Save time and reduce costs through automation",
    technologies: ["Data Processing", "Workflow Automation", "Integration Solutions"],
    startingPrice: "From £2,500",
    hourlyRate: "£90-110/hour",
    features: [
      "Automated data processing and analysis",
      "Custom reporting and dashboards", 
      "Integration with existing systems",
      "Real-time monitoring and alerts",
      "Scheduled task automation",
      "Data backup and security protocols"
    ],
  },
  
  digitalTransformation: {
    title: "Digital Transformation Consulting", 
    description: "Guide your business through digital transformation with strategic technology solutions that create competitive advantages.",
    icon: "🚀",
    businessValue: "Future-proof your business with digital innovation",
    technologies: ["Strategic Planning", "System Integration", "Modern Architecture"],
    startingPrice: "From £5,000",
    hourlyRate: "£120-140/hour",
    features: [
      "Digital strategy and roadmap development",
      "Legacy system modernization",
      "Cloud migration and optimization", 
      "Team training and knowledge transfer",
      "Ongoing support and maintenance",
      "Performance monitoring and optimization"
    ]
  },

  technicalConsulting: {
    title: "Technical Strategy Consultation",
    description: "Get expert guidance on technology decisions, code reviews, and strategic planning to make informed choices for your business.",
    icon: "💡",
    businessValue: "Make informed technology decisions with expert guidance",
    technologies: ["Strategic Analysis", "Code Review", "Architecture Planning"],
    startingPrice: "£120-150/hour",
    hourlyRate: "£120-150/hour",
    features: [
      "Technology strategy and planning",
      "Code review and optimization recommendations",
      "Architecture consultation and design",
      "Technical documentation and guidelines",
      "Team mentoring and best practices training", 
      "Technology stack recommendations"
    ]
  }
} as const

// Business-focused technology presentation
export const TECHNOLOGIES = {
  backend: [
    { name: "Python", level: 95, years: 5, icon: "🐍", color: "#3776ab", businessUse: "Rapid development and data processing" },
    { name: "Django", level: 90, years: 4, icon: "🎯", color: "#092e20", businessUse: "Secure, scalable web applications" },
    { name: "Flask", level: 85, years: 3, icon: "🌶️", color: "#000000", businessUse: "Lightweight, flexible solutions" },
    { name: "FastAPI", level: 80, years: 2, icon: "⚡", color: "#009688", businessUse: "High-performance API development" },
    { name: "PostgreSQL", level: 85, years: 4, icon: "🐘", color: "#336791", businessUse: "Reliable business data storage" },
    { name: "MongoDB", level: 75, years: 3, icon: "🍃", color: "#47a248", businessUse: "Flexible document storage" }
  ],
  
  frontend: [
    { name: "JavaScript", level: 85, years: 4, icon: "📜", color: "#f7df1e", businessUse: "Interactive user experiences" },
    { name: "Vue.js", level: 80, years: 3, icon: "💚", color: "#4fc08d", businessUse: "Dynamic web applications" }, 
    { name: "HTML5", level: 90, years: 5, icon: "📄", color: "#e34f26", businessUse: "Modern web standards" },
    { name: "CSS3", level: 85, years: 5, icon: "🎨", color: "#1572b6", businessUse: "Professional design and styling" },
    { name: "Tailwind CSS", level: 75, years: 2, icon: "💨", color: "#06b6d4", businessUse: "Rapid UI development" }
  ],
  
  tools: [
    { name: "Docker", level: 80, years: 3, icon: "🐳", color: "#2496ed", businessUse: "Reliable deployment" },
    { name: "Git/GitHub", level: 90, years: 5, icon: "📚", color: "#181717", businessUse: "Version control and collaboration" },
    { name: "AWS", level: 75, years: 3, icon: "☁️", color: "#ff9900", businessUse: "Scalable cloud hosting" },
    { name: "Jenkins", level: 70, years: 2, icon: "🔧", color: "#d33833", businessUse: "Automated testing and deployment" },
    { name: "pytest", level: 85, years: 4, icon: "🧪", color: "#0a9edc", businessUse: "Quality assurance and testing" }
  ],
  
  specialties: [
    { name: "Process Automation", technologies: ["Python", "APIs", "Webhooks"], icon: "🤖", businessValue: "Reduce manual work by up to 60%" },
    { name: "Data Analytics", technologies: ["Python", "SQL", "Dashboards"], icon: "📈", businessValue: "Make data-driven decisions faster" },
    { name: "System Integration", technologies: ["APIs", "Webhooks", "Database"], icon: "🔗", businessValue: "Connect your business tools seamlessly" },
    { name: "E-commerce Solutions", technologies: ["Payment APIs", "Inventory", "CRM"], icon: "🛒", businessValue: "Increase online sales and efficiency" }
  ]
} as const

// SEO Configuration - Business-focused
export const SEO_CONFIG = {
  siteUrl: "https://harrysibbenga.dev",
  defaultTitle: "Harry Sibbenga - Full-Stack Business Solutions Developer",
  defaultDescription: "Transform your business with custom web applications, automation, and digital solutions. Helping UK businesses increase efficiency, reduce costs, and drive growth through technology.",
  author: "Harry Sibbenga",
  image: "/logo-512.png",
  
  keywords: [
    "business web applications", "custom software development", "business automation", "digital transformation",
    "web development Milton Keynes", "business process automation", "custom websites", "startup technology solutions",
    "e-commerce development", "data automation", "business efficiency solutions", "UK web developer"
  ],
  
  twitterHandle: "@harrysibbenga",
  
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Harry Sibbenga",
    "jobTitle": "Full-Stack Business Solutions Developer",
    "description": "Helping businesses transform operations through custom web applications and automation solutions",
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
    },
    "offers": [
      {
        "@type": "Service",
        "name": "Professional Business Websites",
        "description": "Custom websites that convert visitors into customers",
        "priceRange": "£1500-£10000"
      },
      {
        "@type": "Service", 
        "name": "Custom Business Applications",
        "description": "Streamline operations with tailored web applications",
        "priceRange": "£3000-£25000"
      }
    ]
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
    "Professional Website Development",
    "Custom Business Application",
    "Business Process Automation", 
    "Digital Transformation Consulting",
    "Technical Strategy Consultation",
    "E-commerce Development",
    "General Business Inquiry"
  ],
  
  budgetRanges: [
    "Under £2,500",
    "£2,500 - £5,000", 
    "£5,000 - £10,000",
    "£10,000 - £25,000",
    "£25,000+",
    "Ongoing Partnership"
  ],
  
  timelines: [
    "ASAP (Rush project)",
    "Within 4 weeks",
    "Within 2 months", 
    "Within 6 months",
    "Long-term project",
    "Flexible timeline"
  ],
  
  businessGoals: [
    "Increase online sales",
    "Improve operational efficiency", 
    "Reduce manual work",
    "Better customer experience",
    "Scale business operations",
    "Digital transformation",
    "Other"
  ]
} as const