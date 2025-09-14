<!-- src/components/sections/ContactTabs.vue -->
<template>
  <div class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Tabs -->
      <div class="flex justify-center mb-12 animate-on-scroll">
        <div class="inline-flex bg-white rounded-2xl p-2 shadow-lg">
          <button 
            @click="activeTab = 'project'"
            :class="[
              'px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center',
              activeTab === 'project' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Project Inquiry
          </button>
          <button 
            @click="activeTab = 'general'"
            :class="[
              'px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center',
              activeTab === 'general' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            ]"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-2.4-.32l-3.6 1.2 1.2-3.6A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
            </svg>
            General Contact
          </button>
        </div>
      </div>

      <!-- Project Inquiry Form -->
      <Transition name="fade" mode="out-in">
        <div v-if="activeTab === 'project'" key="project" class="animate-on-scroll">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Start Your Project
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell me about your project requirements and get a detailed quote with timeline and technical approach.
            </p>
          </div>
          
          <BookingForm />
        </div>

        <!-- General Contact Form -->
        <div v-else key="general" class="animate-on-scroll">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question, want to discuss a partnership, or just say hello? I'd love to hear from you.
            </p>
          </div>
          
          <ContactForm />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookingForm from '../forms/BookingForm.vue'
import ContactForm from '../forms/ContactForm.vue'

const activeTab = ref('project')

// Handle URL hash or query params to set initial tab
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const tabParam = urlParams.get('tab')
  const hash = window.location.hash
  
  if (tabParam && ['project', 'general'].includes(tabParam)) {
    activeTab.value = tabParam
  } else if (hash === '#general') {
    activeTab.value = 'general'
  }
  
  // Update URL when tab changes without page reload
  const updateURL = () => {
    const url = new URL(window.location)
    url.searchParams.set('tab', activeTab.value)
    window.history.replaceState({}, '', url)
  }
  
  // Watch for tab changes and update URL
  const unwatch = watch(activeTab, updateURL)
  
  // Cleanup
  onUnmounted(() => {
    unwatch()
  })
})

// Expose method for external access (like from CTA buttons)
defineExpose({
  setTab: (tab) => {
    if (['project', 'general'].includes(tab)) {
      activeTab.value = tab
    }
  }
})
</script>

<style scoped>
/* Smooth slide-fade transition */
.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Tab content positioning */
.tab-content {
  width: 100%;
}

/* Container for consistent height */
.relative {
  position: relative;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .tab-button {
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }
  
  .tab-button svg {
    width: 1rem;
    height: 1rem;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(20px);
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: opacity 0.2s ease !important;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: none !important;
  }
}
</style>