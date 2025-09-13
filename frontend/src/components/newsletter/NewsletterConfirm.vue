<template>
    <div class="min-h-screen bg-white">
      <!-- Hero Section -->
      <section class="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <!-- Loading State -->
          <div v-if="state === 'loading'" class="animate-fade-in">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold mb-4">
              Confirming Your Subscription
            </h1>
            <p class="text-xl text-blue-100">
              Please wait while we confirm your newsletter subscription...
            </p>
          </div>
  
          <!-- Success State -->
          <div v-else-if="state === 'success'" class="animate-fade-in">
            <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold mb-6">
              Subscription Confirmed!
            </h1>
            <p class="text-xl text-blue-100 mb-8">
              Thank you for subscribing to our newsletter. You'll receive updates about web development insights, project announcements, and technical articles.
            </p>
            
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
              <h3 class="text-lg font-semibold mb-4">What's Next?</h3>
              <div class="grid md:grid-cols-3 gap-4 text-sm">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                  <span>Weekly development updates</span>
                </div>
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  <span>Project announcements</span>
                </div>
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  <span>Technical insights</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Error State -->
          <div v-else-if="state === 'error'" class="animate-fade-in">
            <div class="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold mb-6">
              Confirmation Failed
            </h1>
            <p class="text-xl text-red-100 mb-8">
              {{ errorMessage }}
            </p>
            
            <div class="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-red-400/30">
              <h3 class="text-lg font-semibold mb-4">Possible Issues:</h3>
              <ul class="text-sm text-red-100 space-y-2 text-left max-w-md mx-auto">
                <li>• The confirmation link may have expired</li>
                <li>• You may already be subscribed</li>
                <li>• There was a temporary server issue</li>
              </ul>
            </div>
          </div>
  
          <!-- Already Confirmed State -->
          <div v-else-if="state === 'already-confirmed'" class="animate-fade-in">
            <div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 class="text-4xl sm:text-5xl font-bold mb-6">
              Already Subscribed
            </h1>
            <p class="text-xl text-yellow-100 mb-8">
              Your email is already confirmed and subscribed to our newsletter.
            </p>
          </div>
  
        </div>
      </section>
  
      <!-- Action Buttons Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/"
              class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Back to Homepage
            </a>
            
            <a
              href="/contact"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:text-gray-900 transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-2.4-.32l-3.6 1.2 1.2-3.6A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </section>
  
      <!-- Newsletter Benefits Section -->
      <section class="py-16 bg-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              What You Can Expect
            </h2>
            <p class="text-lg text-gray-600">
              Our newsletter delivers valuable insights directly to your inbox
            </p>
          </div>
  
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Technical Insights</h3>
              <p class="text-gray-600">
                Deep dives into modern web development practices, tools, and emerging technologies.
              </p>
            </div>
  
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Project Updates</h3>
              <p class="text-gray-600">
                Behind-the-scenes looks at current projects and case studies from real client work.
              </p>
            </div>
  
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Industry News</h3>
              <p class="text-gray-600">
                Curated updates on web development trends, framework releases, and industry developments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { api } from '../../utils/api'
  
  // Props from Astro
  const props = defineProps({
    email: {
      type: String,
      required: true
    }
  })
  
  const state = ref('loading')
  const errorMessage = ref('')
  
  onMounted(async () => {
    // Debug logging (remove in production)
    console.log('Vue Debug - Received props:', props);
    console.log('Vue Debug - Email prop:', props.email);
    console.log('Vue Debug - Email type:', typeof props.email);
    console.log('Vue Debug - Email length:', props.email?.length);
    
    if (!props.email || props.email.trim() === '') {
      state.value = 'error'
      errorMessage.value = 'No email address provided in confirmation link.'
      return
    }
    
    // Attempt to confirm subscription
    try {
      await confirmSubscription(props.email.trim())
    } catch (error) {
      console.error('Confirmation failed:', error)
      state.value = 'error'
      errorMessage.value = 'Failed to confirm subscription. Please try again later.'
    }
  })
  
  async function confirmSubscription(emailAddress) {
    try {
      console.log('Confirming subscription for:', emailAddress)
      
      const response = await api.newsletter.confirm(emailAddress)
      
      if (response) {
        if (response.confirmed_at) {
          state.value = 'already-confirmed'
        } else {
          state.value = 'success'
        }
      } else {
        state.value = 'error'
        errorMessage.value = 'Subscription not found or already unsubscribed.'
      }
      
    } catch (error) {
      console.error('API confirmation error:', error)
      
      if (error.status === 404) {
        state.value = 'error'
        errorMessage.value = 'Subscription not found. The confirmation link may be invalid or expired.'
      } else if (error.status === 409) {
        state.value = 'already-confirmed'
      } else {
        state.value = 'error'
        errorMessage.value = 'Unable to confirm subscription. Please try again later or contact support.'
      }
      
      throw error
    }
  }
  </script>
  
  <style scoped>
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .animate-spin {
    animation: spin 2s linear infinite;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  </style>