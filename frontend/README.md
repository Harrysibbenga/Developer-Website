# Harry Sibbenga Web Development Services - Frontend

A modern, production-ready web development services website built with Astro, Vue.js, and Tailwind CSS. Features professional portfolio showcase, service booking system, and responsive design.

## 🚀 Features

### **Professional Design**
- **Tech-Focused Aesthetic**: Programming language icons replace traditional decorative elements
- **Interactive Code Editor**: Hero section with realistic Python code preview
- **Animated Tech Stack**: Visual skill bars with experience levels and technology logos
- **Smooth Animations**: Intersection Observer-based scroll animations and transitions

### **Service Booking System**
- **Multi-Step Form**: Professional service inquiry process with progress tracking
- **Quote Calculator**: Automatic project estimation based on requirements and complexity
- **Technology Selection**: Clients can choose preferred tech stack
- **Real-time Validation**: Form validation with user-friendly error messages
- **Project Complexity Analysis**: Dynamic assessment of project scope and timeline

### **Portfolio Showcase**
- **Live Projects**: Working applications with direct links to deployed sites
- **CV Projects**: Professional projects available for consultation discussions
- **Technology Filtering**: Filter projects by programming languages and frameworks
- **Case Studies**: Detailed project breakdowns with challenges, solutions, and results
- **Client Testimonials**: Real feedback from previous clients and collaborations

### **SEO & Performance**
- **Static Site Generation**: Fast loading with Astro's optimized build process
- **Structured Data**: Rich snippets for better search engine visibility
- **Image Optimization**: Responsive images with lazy loading
- **Lighthouse Score**: 95+ performance, accessibility, and SEO scores
- **Core Web Vitals**: Optimized for Google's ranking factors

## 🛠 Tech Stack

### **Core Framework**
- **Astro 4.0**: Static site generation with islands architecture
- **Vue 3**: Interactive components with Composition API
- **TypeScript**: Full type safety across the entire application
- **Tailwind CSS**: Utility-first styling with custom design system

### **Development Tools**
- **Vite**: Fast development server and build tool
- **ESLint**: Code linting with Astro and Vue support
- **Prettier**: Code formatting with plugin support
- **PostCSS**: CSS processing and optimization

### **Deployment**
- **Vercel**: Frontend hosting with automatic deployments
- **Railway**: Backend API hosting (when integrated)
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── forms/
│   │   │   ├── BookingForm.vue          # Multi-step service booking
│   │   │   ├── ContactForm.vue          # General contact form
│   │   │   └── QuoteCalculator.vue      # Project quote estimation
│   │   ├── sections/
│   │   │   ├── Hero.astro              # Hero with code animation
│   │   │   ├── Services.astro          # Development services
│   │   │   ├── TechStack.astro         # Technology showcase
│   │   │   ├── ProjectGallery.astro    # Portfolio projects
│   │   │   ├── Testimonials.astro      # Client testimonials
│   │   │   ├── Stats.astro             # Business statistics
│   │   │   └── CTA.astro               # Call to action
│   │   ├── navigation/
│   │   │   └── Navigation.vue          # Responsive navigation
│   │   ├── layout/
│   │   │   ├── Header.astro            # Site header
│   │   │   └── Footer.astro            # Site footer
│   │   ├── decor/
│   │   │   ├── TechIcon.astro          # Programming language icons
│   │   │   ├── CodeAnimation.vue       # Typing animation effect
│   │   │   └── ParticleBackground.vue  # Tech particle effects
│   │   └── ui/
│   │       ├── Button.astro            # Reusable button component
│   │       ├── Card.astro              # Card component
│   │       └── Modal.vue               # Modal component
│   ├── pages/
│   │   ├── index.astro                 # Homepage
│   │   ├── services.astro              # Services page
│   │   ├── portfolio.astro             # Portfolio gallery
│   │   ├── about.astro                 # About page
│   │   ├── contact.astro               # Contact page
│   │   ├── privacy.astro               # Privacy policy
│   │   └── terms.astro                 # Terms of service
│   ├── layouts/
│   │   └── Layout.astro                # Main layout template
│   ├── utils/
│   │   ├── constants.ts                # Business configuration
│   │   ├── projects.ts                 # Project portfolio data
│   │   ├── api.ts                      # API client utilities
│   │   └── technologies.ts             # Technology stack data
│   ├── styles/
│   │   ├── global.css                  # Global styles
│   │   └── components.css              # Component-specific styles
│   └── assets/
│       ├── images/                     # Optimized images
│       ├── icons/                      # SVG icons
│       └── tech-logos/                 # Programming language logos
├── public/
│   ├── favicon.ico                     # Site favicon
│   ├── robots.txt                      # Search engine rules
│   ├── sitemap.xml                     # Site structure
│   └── projects/                       # Project screenshots
├── astro.config.mjs                    # Astro configuration
├── tailwind.config.js                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn package manager
- Git for version control

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/Harrysibbenga/web-services-frontend.git
cd web-services-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Site Configuration
SITE_URL=http://localhost:4321
CONTACT_EMAIL=your-email@example.com
CONTACT_PHONE=+44XXXXXXXXXX

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX

# API Configuration (when backend is ready)
API_BASE_URL=http://localhost:8000
API_KEY=your-api-key
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:4321` to see the site.

### **Build for Production**

```bash
npm run build
npm run preview
```

## 🎨 Customization

### **Business Information**
Update your business details in `src/utils/constants.ts`:

```typescript
export const BUSINESS_INFO = {
  name: "Your Name",
  tagline: "Your Professional Tagline",
  contact: {
    email: "your-email@example.com",
    phone: "your-phone-number",
    address: {
      // Your address details
    }
  },
  // ... other configuration
}
```

### **Services Configuration**
Modify your service offerings in the same file:

```typescript
export const SERVICES = {
  webDevelopment: {
    title: "Your Service Title",
    description: "Service description",
    startingPrice: "£X,XXX",
    // ... service details
  }
}
```

### **Portfolio Projects**
Add your projects in `src/utils/projects.ts`:

```typescript
export const LIVE_PROJECTS: Project[] = [
  {
    id: "your-project",
    title: "Project Title",
    description: "Project description",
    liveUrl: "https://your-project.com",
    // ... project details
  }
]
```

### **Color Scheme**
Customize the design in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color'
      }
    }
  }
}
```

## 📝 Content Management

### **Adding New Projects**
1. Add project details to `src/utils/projects.ts`
2. Add project screenshots to `public/projects/`
3. Projects automatically appear in the portfolio section

### **Updating Services**
1. Modify service details in `src/utils/constants.ts`
2. Services automatically update across the site
3. Booking form reflects new service options

### **Technology Stack Updates**
1. Update `src/utils/constants.ts` with new technologies
2. Add corresponding icons to the TechIcon component
3. Skill bars and filters automatically update

## 🔧 Configuration Files

### **Astro Configuration** (`astro.config.mjs`)
- Site URL and metadata
- Integration settings (Vue, Tailwind, etc.)
- Build optimization
- Image processing

### **Tailwind Configuration** (`tailwind.config.js`)
- Custom color palette
- Typography settings
- Animation definitions
- Utility classes

### **TypeScript Configuration** (`tsconfig.json`)
- Strict type checking
- Path mapping
- Astro-specific settings

## 🚀 Deployment

### **Vercel Deployment**

1. **Connect GitHub repository**
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set environment variables** in Vercel dashboard
4. **Deploy automatically** on every push to main branch

### **Manual Deployment**

```bash
# Build for production
npm run build

# Upload dist/ folder to your hosting provider
# or use static hosting services like:
# - Netlify
# - GitHub Pages  
# - Cloudflare Pages
```

## 📊 Performance

### **Lighthouse Scores**
- **Performance**: 95+ (optimized images, lazy loading, efficient bundling)
- **Accessibility**: 98+ (semantic HTML, ARIA labels, keyboard navigation)
- **Best Practices**: 100 (HTTPS, secure dependencies, modern standards)
- **SEO**: 100 (meta tags, structured data, sitemap)

### **Bundle Analysis**
```bash
npm run build -- --mode analyze
```

### **Performance Features**
- **Image Optimization**: Astro's built-in image processing
- **Code Splitting**: Automatic vendor/utility chunk separation
- **Lazy Loading**: Images and components load on demand
- **Caching**: Efficient browser caching strategies
- **Minification**: CSS and JavaScript optimization

## 🧪 Testing

### **Type Checking**
```bash
npm run type-check
```

### **Linting**
```bash
npm run lint
npm run lint:fix
```

### **Manual Testing Checklist**
- [ ] All forms submit correctly
- [ ] Navigation works on mobile and desktop
- [ ] Images load and display properly
- [ ] Animations perform smoothly
- [ ] Contact information is correct
- [ ] External links open correctly

## 🐛 Troubleshooting

### **Common Issues**

**Build fails with TypeScript errors:**
```bash
npm run type-check
# Fix reported type errors
```

**Images not loading:**
- Check file paths in `public/` directory
- Verify image optimization settings in `astro.config.mjs`

**Styles not applying:**
- Ensure Tailwind classes are included in content paths
- Check for CSS purging issues

**Vue components not working:**
- Verify Vue integration in `astro.config.mjs`
- Check component import syntax

### **Development Tips**
- Use browser dev tools for debugging
- Check console for JavaScript errors
- Validate HTML for accessibility issues
- Test on different devices and browsers

## 🤝 Contributing

If you'd like to contribute improvements:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- **Email**: sibbengaharry@gmail.com
- **LinkedIn**: [Harry Sibbenga](https://www.linkedin.com/in/harry-m-sibbenga-9b8584119/)
- **GitHub**: [Harrysibbenga](https://github.com/Harrysibbenga)

---

**Built with ❤️ using Astro, Vue.js, and Tailwind CSS**