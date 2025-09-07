<!-- src/components/ui/LegalSection.vue -->
<template>
    <section 
      :id="id" 
      class="legal-section scroll-mt-20"
      :class="{ 'highlighted-section': highlight }"
    >
      <!-- Section Header -->
      <div class="flex items-start gap-4 mb-6">
        <div 
          v-if="icon" 
          class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl"
          :class="{ 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white': highlight }"
        >
          {{ icon }}
        </div>
        
        <div class="flex-1">
          <h2 
            class="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
            :class="{ 'text-blue-600': highlight }"
          >
            {{ title }}
          </h2>
          
          <div v-if="subtitle" class="text-lg text-gray-600">
            {{ subtitle }}
          </div>
        </div>
        
        <!-- Anchor Link -->
        <a 
          :href="`#${id}`"
          class="flex-shrink-0 p-2 text-gray-400 hover:text-blue-600 transition-colors"
          :title="`Link to ${title}`"
          @click="copyLink"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
        </a>
      </div>
      
      <!-- Section Content -->
      <div 
        class="prose prose-lg max-w-none"
        :class="contentClasses"
      >
        <slot />
      </div>
      
      <!-- Last Updated (if provided) -->
      <div v-if="lastUpdated" class="mt-6 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          <span class="font-medium">Last updated:</span> 
          {{ formatDate(lastUpdated) }}
        </p>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  
  // Props
  interface Props {
    id: string
    title: string
    subtitle?: string
    icon?: string
    highlight?: boolean
    lastUpdated?: string | Date
  }
  
  const props = withDefaults(defineProps<Props>(), {
    highlight: false
  })
  
  // Reactive state
  const showCopiedMessage = ref(false)
  
  // Computed properties
  const contentClasses = computed(() => {
    return {
      'prose-blue': props.highlight,
      'prose-gray': !props.highlight
    }
  })
  
  // Methods
  const copyLink = async (event: Event) => {
    event.preventDefault()
    
    const url = `${window.location.origin}${window.location.pathname}#${props.id}`
    
    try {
      await navigator.clipboard.writeText(url)
      showCopiedMessage.value = true
      
      // Scroll to section
      const element = document.getElementById(props.id)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
      
      // Hide copied message after 2 seconds
      setTimeout(() => {
        showCopiedMessage.value = false
      }, 2000)
      
    } catch (err) {
      console.error('Failed to copy link:', err)
      // Fallback: just scroll to section
      window.location.hash = props.id
    }
  }
  
  const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  </script>
  
  <style scoped>
  .legal-section {
    margin-bottom: 3rem;
    padding: 2rem;
    border-radius: 1rem;
    background: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .highlighted-section {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border: 2px solid #e2e8f0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .legal-section:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .highlighted-section:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  /* Prose styling customization */
  :deep(.prose) {
    color: #374151;
    line-height: 1.75;
  }
  
  :deep(.prose h3) {
    color: #1f2937;
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  :deep(.prose h4) {
    color: #374151;
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  :deep(.prose p) {
    margin-bottom: 1.25rem;
  }
  
  :deep(.prose ul) {
    margin: 1.25rem 0;
    padding-left: 1.5rem;
  }
  
  :deep(.prose li) {
    margin-bottom: 0.5rem;
  }
  
  :deep(.prose strong) {
    color: #1f2937;
    font-weight: 600;
  }
  
  :deep(.prose a) {
    color: #2563eb;
    text-decoration: underline;
    font-weight: 500;
  }
  
  :deep(.prose a:hover) {
    color: #1d4ed8;
  }
  
  :deep(.prose code) {
    background-color: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.375rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  :deep(.prose blockquote) {
    border-left: 4px solid #e5e7eb;
    margin: 1.5rem 0;
    padding-left: 1rem;
    font-style: italic;
    color: #6b7280;
  }
  
  :deep(.prose table) {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }
  
  :deep(.prose th) {
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    color: #374151;
  }
  
  :deep(.prose td) {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    color: #6b7280;
  }
  
  :deep(.prose tr:nth-child(even)) {
    background-color: #f9fafb;
  }
  
  /* Blue theme for highlighted sections */
  :deep(.prose-blue h3) {
    color: #1e40af;
  }
  
  :deep(.prose-blue h4) {
    color: #3730a3;
  }
  
  :deep(.prose-blue strong) {
    color: #1e40af;
  }
  
  :deep(.prose-blue a) {
    color: #2563eb;
  }
  
  :deep(.prose-blue a:hover) {
    color: #1d4ed8;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .legal-section {
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    
    :deep(.prose) {
      font-size: 1rem;
    }
    
    :deep(.prose h3) {
      font-size: 1.125rem;
    }
    
    :deep(.prose h4) {
      font-size: 1rem;
    }
  }
  
  /* Copy link feedback */
  .copy-feedback {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: #10b981;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  /* Smooth scrolling enhancement */
  html {
    scroll-behavior: smooth;
  }
  
  /* Focus styles for accessibility */
  .legal-section:focus-within {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  </style>