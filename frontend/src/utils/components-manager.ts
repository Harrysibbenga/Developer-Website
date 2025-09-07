// src/utils/components-manager.ts
/**
 * Global Components Manager
 * Handles initialization and reinitialization of all interactive components
 * across all pages after navigation and page transitions
 */

import { initializePortfolioFilters } from '../utils/portfolioFilters';

export class GlobalComponentsManager {
    private static instance: GlobalComponentsManager;
    private observers: Map<string, IntersectionObserver> = new Map();
    private eventListeners: Map<string, Array<{ element: Element; event: string; handler: EventListener }>> = new Map();
    private initialized = false;
  
    private constructor() {}
  
    public static getInstance(): GlobalComponentsManager {
      if (!GlobalComponentsManager.instance) {
        GlobalComponentsManager.instance = new GlobalComponentsManager();
      }
      return GlobalComponentsManager.instance;
    }
  
    // Initialize all components
    public initialize(): void {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
      } else {
        this.initializeComponents();
      }
  
      // Setup page transition handling
      this.setupPageTransitions();
    }
  
    // Main initialization method
    private initializeComponents(): void {
      console.log('🚀 GlobalComponentsManager: Initializing all components...');
  
      // Clean up existing components first
      this.cleanup();
  
      // Initialize all component types
      this.initializeContactPageTabs();
      this.initializeScrollAnimations();
      this.initializeImageLazyLoading();
      this.initializeFormComponents();
      this.initializeNavigationComponents();
      this.initializeModalComponents();
      this.initializeFilterComponents();
      this.initializeAccordionComponents();
      this.initializeCarouselComponents();
      this.initializeTooltipComponents();
  
      this.initialized = true;
      document.body.classList.add('components-loaded');
      
      console.log('✅ GlobalComponentsManager: All components initialized successfully');
    }
  
    // Handle page transitions
    private setupPageTransitions(): void {
      // Astro View Transitions
      document.addEventListener('astro:after-swap', () => {
        console.log('🔄 Page transition detected, reinitializing components...');
        setTimeout(() => {
          this.initializeComponents();
        }, 100);
      });
  
      // Fallback for manual navigation
      let currentUrl = window.location.href;
      setInterval(() => {
        if (window.location.href !== currentUrl) {
          currentUrl = window.location.href;
          setTimeout(() => {
            this.initializeComponents();
          }, 100);
        }
      }, 500);
    }
  
    // ===== CONTACT PAGE TAB FUNCTIONALITY =====
    private initializeContactPageTabs(): void {
      const tabButtons = document.querySelectorAll('.tab-button');
      const tabContents = document.querySelectorAll('.tab-content');
  
      if (tabButtons.length === 0) return;
  
      console.log('📋 Initializing contact page tabs...');
  
      tabButtons.forEach(button => {
        const clickHandler = (e: Event) => {
          e.preventDefault();
          const target = e.currentTarget as HTMLElement;
          const tabId = target.dataset.tab;
  
          if (!tabId) return;
  
          // Remove active class from all buttons
          tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.remove('bg-blue-600', 'text-white');
            btn.classList.add('text-gray-600', 'hover:text-gray-900');
          });
  
          // Add active class to clicked button
          target.classList.add('active');
          target.classList.add('bg-blue-600', 'text-white');
          target.classList.remove('text-gray-600', 'hover:text-gray-900');
  
          // Hide all tab contents
          tabContents.forEach(content => {
            content.classList.add('hidden');
          });
  
          // Show target tab content
          const targetContent = document.getElementById(`${tabId}-tab`);
          if (targetContent) {
            targetContent.classList.remove('hidden');
            
            // Trigger animations for newly visible content
            const animatedElements = targetContent.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
              el.classList.remove('animate-in');
              setTimeout(() => {
                el.classList.add('animate-in');
              }, 50);
            });
          }
  
          // Track tab switch
          if (typeof gtag !== 'undefined') {
            gtag('event', 'tab_switch', {
              event_category: 'Contact',
              event_label: tabId
            });
          }
  
          console.log(`📋 Switched to tab: ${tabId}`);
        };
  
        button.addEventListener('click', clickHandler);
        this.addEventListenerToCleanup('contact-tabs', button, 'click', clickHandler);
      });
  
      // Set initial active state
      const activeButton = document.querySelector('.tab-button.active') as HTMLElement;
      if (activeButton) {
        const tabId = activeButton.dataset.tab;
        if (tabId) {
          const targetContent = document.getElementById(`${tabId}-tab`);
          if (targetContent) {
            targetContent.classList.remove('hidden');
          }
        }
      }
    }
  
    // ===== SCROLL ANIMATIONS =====
    private initializeScrollAnimations(): void {
      const animatedElements = document.querySelectorAll('.animate-on-scroll, [data-animate]');
      
      if (animatedElements.length === 0) return;
  
      console.log('🎭 Initializing scroll animations...');
  
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
  
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Add main animation class
            element.classList.add('animate-in');
            
            // Handle staggered animations
            const staggeredElements = element.querySelectorAll('.stagger-animation');
            staggeredElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-in');
              }, index * 100);
            });
            
            // Unobserve after animation
            animationObserver.unobserve(element);
          }
        });
      }, observerOptions);
  
      animatedElements.forEach((el) => {
        el.classList.remove('animate-in'); // Reset animation state
        animationObserver.observe(el);
      });
  
      this.observers.set('scroll-animations', animationObserver);
    }
  
    // ===== IMAGE LAZY LOADING =====
    private initializeImageLazyLoading(): void {
      const lazyImages = document.querySelectorAll('img[data-src]');
      
      if (lazyImages.length === 0) return;
  
      console.log('🖼️ Initializing image lazy loading...');
  
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            
            if (img.dataset.src) {
              const newImg = new Image();
              newImg.onload = () => {
                img.src = img.dataset.src!;
                img.classList.remove('loading-skeleton');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              };
              newImg.onerror = () => {
                img.src = '/images/placeholder.jpg';
                img.alt = 'Image unavailable';
                img.classList.remove('loading-skeleton');
                imageObserver.unobserve(img);
              };
              newImg.src = img.dataset.src;
            }
          }
        });
      }, { threshold: 0.1, rootMargin: '50px' });
  
      lazyImages.forEach((img) => {
        img.classList.add('loading-skeleton');
        imageObserver.observe(img);
      });
  
      this.observers.set('image-loading', imageObserver);
    }
  
    // ===== FORM COMPONENTS =====
    private initializeFormComponents(): void {
      const forms = document.querySelectorAll('form[data-validate]');
      
      if (forms.length === 0) return;
  
      console.log('📝 Initializing form components...');
  
      forms.forEach(form => {
        const submitHandler = (e: Event) => {
          if (!this.validateForm(form as HTMLFormElement)) {
            e.preventDefault();
          }
        };
  
        form.addEventListener('submit', submitHandler);
        this.addEventListenerToCleanup('forms', form, 'submit', submitHandler);
  
        // Initialize form field validators
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          const blurHandler = () => this.validateField(input as HTMLInputElement);
          input.addEventListener('blur', blurHandler);
          this.addEventListenerToCleanup('forms', input, 'blur', blurHandler);
        });
      });
    }
  
    // ===== NAVIGATION COMPONENTS =====
    private initializeNavigationComponents(): void {
      // Mobile menu toggle
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
  
      if (mobileMenuButton && mobileMenu) {
        console.log('🧭 Initializing navigation components...');
  
        const toggleHandler = () => {
          const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
          
          mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
          mobileMenu.classList.toggle('hidden');
          
          // Update hamburger icon
          const icon = mobileMenuButton.querySelector('svg path');
          if (icon) {
            if (isExpanded) {
              icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            } else {
              icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            }
          }
        };
  
        mobileMenuButton.addEventListener('click', toggleHandler);
        this.addEventListenerToCleanup('navigation', mobileMenuButton, 'click', toggleHandler);
  
        // Close menu when clicking outside
        const outsideClickHandler = (e: Event) => {
          const target = e.target as Element;
          if (!mobileMenuButton.contains(target) && !mobileMenu.contains(target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
          }
        };
  
        document.addEventListener('click', outsideClickHandler);
        this.addEventListenerToCleanup('navigation', document, 'click', outsideClickHandler);
      }
  
      // Smooth scroll for anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        const clickHandler = (e: Event) => {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const targetId = target.getAttribute('href')?.substring(1);
          const targetElement = targetId ? document.getElementById(targetId) : null;
          
          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        };
  
        link.addEventListener('click', clickHandler);
        this.addEventListenerToCleanup('navigation', link, 'click', clickHandler);
      });
    }
  
    // ===== MODAL COMPONENTS =====
    private initializeModalComponents(): void {
      const modalTriggers = document.querySelectorAll('[data-modal-target]');
      const modalCloses = document.querySelectorAll('[data-modal-close]');
      const modals = document.querySelectorAll('[data-modal]');
  
      if (modalTriggers.length === 0) return;
  
      console.log('🪟 Initializing modal components...');
  
      // Modal open triggers
      modalTriggers.forEach(trigger => {
        const clickHandler = (e: Event) => {
          e.preventDefault();
          const target = (e.currentTarget as HTMLElement).dataset.modalTarget;
          const modal = document.querySelector(`[data-modal="${target}"]`) as HTMLElement;
          
          if (modal) {
            modal.classList.remove('hidden');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            
            // Focus first focusable element
            const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
            if (firstFocusable) {
              firstFocusable.focus();
            }
          }
        };
  
        trigger.addEventListener('click', clickHandler);
        this.addEventListenerToCleanup('modals', trigger, 'click', clickHandler);
      });
  
      // Modal close triggers
      modalCloses.forEach(closeBtn => {
        const clickHandler = () => {
          const modal = closeBtn.closest('[data-modal]') as HTMLElement;
          if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
          }
        };
  
        closeBtn.addEventListener('click', clickHandler);
        this.addEventListenerToCleanup('modals', closeBtn, 'click', clickHandler);
      });
  
      // Close modals on escape key
      const escapeHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
              modal.classList.add('hidden');
              modal.setAttribute('aria-hidden', 'true');
            }
          });
          document.body.classList.remove('modal-open');
        }
      };
  
      document.addEventListener('keydown', escapeHandler);
      this.addEventListenerToCleanup('modals', document, 'keydown', escapeHandler);
    }
  
    // ===== FILTER COMPONENTS =====
    private initializeFilterComponents(): void {
      // 🔹 Handle All Projects Section
      const allProjectsSection = document.getElementById('all-projects-section');
      if (allProjectsSection) {
        initializePortfolioFilters(allProjectsSection);
      }
    
      // 🔹 Handle ProjectGallery Section
      const gallerySection = document.getElementById('portfolio');
      if (gallerySection) {
        const filterButtons = gallerySection.querySelectorAll<HTMLButtonElement>('.filter-btn');
        const projectCards = gallerySection.querySelectorAll<HTMLElement>('.project-card');
    
        const filterProjects = (category: string) => {
          projectCards.forEach((card) => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'All' || cardCategory === category;
    
            if (shouldShow) {
              card.classList.remove('hidden');
              card.style.display = 'block';
            } else {
              card.classList.add('hidden');
              card.style.display = 'none';
            }
          });
        };
    
        filterButtons.forEach((button) => {
          const clickHandler = () => {
            const category = button.dataset.filter || 'All';
    
            // Update active button UI
            filterButtons.forEach((btn) => {
              btn.classList.remove('active');
              btn.setAttribute('aria-pressed', 'false');
              btn.className = btn.className.replace(
                'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
                'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              );
            });
    
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            button.className = button.className.replace(
              'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white',
              'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
            );
    
            filterProjects(category);
          };
    
          button.addEventListener('click', clickHandler);
          this.addEventListenerToCleanup('gallery-filters', button, 'click', clickHandler);
        });
    
        // Initialize with All
        filterProjects('All');
      }
    }    
  
    // ===== ACCORDION COMPONENTS =====
    private initializeAccordionComponents(): void {
      const accordionTriggers = document.querySelectorAll('[data-accordion-trigger]');
  
      if (accordionTriggers.length === 0) return;
  
      console.log('📖 Initializing accordion components...');
  
      accordionTriggers.forEach(trigger => {
        const clickHandler = (e: Event) => {
          e.preventDefault();
          const target = (e.currentTarget as HTMLElement).dataset.accordionTrigger;
          const content = document.querySelector(`[data-accordion-content="${target}"]`) as HTMLElement;
          const icon = trigger.querySelector('.accordion-icon');
  
          if (content) {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            
            trigger.setAttribute('aria-expanded', (!isExpanded).toString());
            
            if (isExpanded) {
              content.classList.add('hidden');
              if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
              content.classList.remove('hidden');
              if (icon) icon.style.transform = 'rotate(180deg)';
            }
          }
        };
  
        trigger.addEventListener('click', clickHandler);
        this.addEventListenerToCleanup('accordions', trigger, 'click', clickHandler);
      });
    }
  
    // ===== CAROUSEL COMPONENTS =====
    private initializeCarouselComponents(): void {
      const carousels = document.querySelectorAll('[data-carousel]');
  
      if (carousels.length === 0) return;
  
      console.log('🎠 Initializing carousel components...');
  
      carousels.forEach(carousel => {
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const slides = carousel.querySelectorAll('[data-carousel-slide]');
        let currentSlide = 0;
  
        const updateSlides = () => {
          slides.forEach((slide, index) => {
            if (index === currentSlide) {
              slide.classList.remove('hidden');
              slide.classList.add('animate-in');
            } else {
              slide.classList.add('hidden');
              slide.classList.remove('animate-in');
            }
          });
        };
  
        if (prevBtn) {
          const prevHandler = () => {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            updateSlides();
          };
          prevBtn.addEventListener('click', prevHandler);
          this.addEventListenerToCleanup('carousels', prevBtn, 'click', prevHandler);
        }
  
        if (nextBtn) {
          const nextHandler = () => {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            updateSlides();
          };
          nextBtn.addEventListener('click', nextHandler);
          this.addEventListenerToCleanup('carousels', nextBtn, 'click', nextHandler);
        }
  
        // Auto-play if specified
        const autoplay = carousel.getAttribute('data-carousel-autoplay');
        if (autoplay) {
          setInterval(() => {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            updateSlides();
          }, parseInt(autoplay) || 5000);
        }
  
        updateSlides();
      });
    }
  
    // ===== TOOLTIP COMPONENTS =====
    private initializeTooltipComponents(): void {
      const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  
      if (tooltipTriggers.length === 0) return;
  
      console.log('💬 Initializing tooltip components...');
  
      tooltipTriggers.forEach(trigger => {
        const mouseEnterHandler = (e: Event) => {
          const target = e.currentTarget as HTMLElement;
          const tooltipText = target.dataset.tooltip;
          
          if (tooltipText) {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none';
            tooltip.textContent = tooltipText;
            tooltip.setAttribute('data-tooltip-element', 'true');
            
            document.body.appendChild(tooltip);
            
            const rect = target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
          }
        };
  
        const mouseLeaveHandler = () => {
          const existingTooltip = document.querySelector('[data-tooltip-element="true"]');
          if (existingTooltip) {
            existingTooltip.remove();
          }
        };
  
        trigger.addEventListener('mouseenter', mouseEnterHandler);
        trigger.addEventListener('mouseleave', mouseLeaveHandler);
        
        this.addEventListenerToCleanup('tooltips', trigger, 'mouseenter', mouseEnterHandler);
        this.addEventListenerToCleanup('tooltips', trigger, 'mouseleave', mouseLeaveHandler);
      });
    }
  
    // ===== UTILITY METHODS =====
  
    private validateForm(form: HTMLFormElement): boolean {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!(input as HTMLInputElement).value.trim()) {
          this.showFieldError(input as HTMLInputElement, 'This field is required');
          isValid = false;
        } else {
          this.clearFieldError(input as HTMLInputElement);
        }
      });
      
      return isValid;
    }
  
    private validateField(input: HTMLInputElement): void {
      this.clearFieldError(input);
      
      if (input.hasAttribute('required') && !input.value.trim()) {
        this.showFieldError(input, 'This field is required');
        return;
      }
  
      if (input.type === 'email' && input.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          this.showFieldError(input, 'Please enter a valid email address');
        }
      }
    }
  
    private showFieldError(input: HTMLInputElement, message: string): void {
      this.clearFieldError(input);
      
      const errorElement = document.createElement('div');
      errorElement.className = 'field-error text-red-600 text-sm mt-1';
      errorElement.textContent = message;
      
      input.classList.add('border-red-500');
      input.parentNode?.appendChild(errorElement);
    }
  
    private clearFieldError(input: HTMLInputElement): void {
      input.classList.remove('border-red-500');
      const existingError = input.parentNode?.querySelector('.field-error');
      if (existingError) {
        existingError.remove();
      }
    }
  
    private addEventListenerToCleanup(
      group: string, 
      element: Element | Document, 
      event: string, 
      handler: EventListener
    ): void {
      if (!this.eventListeners.has(group)) {
        this.eventListeners.set(group, []);
      }
      this.eventListeners.get(group)!.push({ element, event, handler });
    }
  
    // Clean up all observers and event listeners
    private cleanup(): void {
      console.log('🧹 Cleaning up existing components...');
      
      // Clean up observers
      this.observers.forEach(observer => observer.disconnect());
      this.observers.clear();
      
      // Clean up event listeners
      this.eventListeners.forEach(listeners => {
        listeners.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
      });
      this.eventListeners.clear();
      
      // Remove temporary elements
      document.querySelectorAll('[data-tooltip-element="true"]').forEach(el => el.remove());
    }
  
    // Public methods for manual component management
    public reinitialize(): void {
      this.initializeComponents();
    }
  
    public initializeSpecificComponent(componentType: string): void {
      switch (componentType) {
        case 'tabs':
          this.initializeContactPageTabs();
          break;
        case 'animations':
          this.initializeScrollAnimations();
          break;
        case 'images':
          this.initializeImageLazyLoading();
          break;
        case 'forms':
          this.initializeFormComponents();
          break;
        case 'navigation':
          this.initializeNavigationComponents();
          break;
        case 'modals':
          this.initializeModalComponents();
          break;
        default:
          console.warn(`Unknown component type: ${componentType}`);
      }
    }
  }
  
  // Export singleton instance
  export const componentsManager = GlobalComponentsManager.getInstance();