// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace']
      },
      
      colors: {
        // Brand colors
        brand: {
          primary: '#2563eb',
          secondary: '#8b5cf6',
          accent: '#06b6d4'
        },
        
        // Custom color palette
        gray: {
          950: '#0a0a0a'
        },
        
        blue: {
          950: '#0c1e3f'
        }
      },
      
      gradients: {
        'brand': 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
        'tech': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        'success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      },
      
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'bounce-gentle': 'bounce-gentle 2s infinite'
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' 
          }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(-8px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        }
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem'
      },
      
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.3)',
        'gold-glow': '0 0 20px rgba(251, 191, 36, 0.3)',
        'purple-glow': '0 0 20px rgba(139, 92, 246, 0.3)'
      },
      
      backdropBlur: {
        xs: '2px'
      },
      
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            lineHeight: '1.7',
            
            h1: {
              fontSize: '2.25rem',
              fontWeight: '800',
              lineHeight: '1.2'
            },
            
            h2: {
              fontSize: '1.875rem',
              fontWeight: '700',
              lineHeight: '1.3'
            },
            
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.4'
            },
            
            code: {
              backgroundColor: '#f3f4f6',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            },
            
            'code::before': {
              content: '""'
            },
            
            'code::after': {
              content: '""'
            }
          }
        }
      }
    }
  },
  
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    
    // Custom utilities
    function({ addUtilities }) {
      addUtilities({
        '.bg-brand-gradient': {
          background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)'
        },
        '.bg-tech-gradient': {
          background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
        },
        '.bg-success-gradient': {
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text'
        },
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }
      })
    }
  ]
}