<!-- src/components/forms/ContactForm.vue -->
<template>
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Send a Message</h2>
        <p class="text-gray-600">
          Fill out the form below and I'll get back to you within 24 hours.
        </p>
      </div>
  
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500': errors.name }"
            placeholder="Your full name"
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
        </div>
  
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500': errors.email }"
            placeholder="your.email@example.com"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>
  
        <!-- Phone Field -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="+44 7XXX XXX XXX"
          />
        </div>
  
        <!-- Company Field -->
        <div>
          <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
            Company/Organization
          </label>
          <input
            type="text"
            id="company"
            v-model="form.company"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Your company name"
          />
        </div>
  
        <!-- Service Interest -->
        <div>
          <label for="service" class="block text-sm font-medium text-gray-700 mb-2">
            Service Interest
          </label>
          <select
            id="service"
            v-model="form.service"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="ecommerce">E-commerce Solutions</option>
            <option value="web-applications">Web Applications</option>
            <option value="api-development">API Development</option>
            <option value="consulting">Technical Consulting</option>
            <option value="maintenance">Maintenance & Support</option>
            <option value="other">Other</option>
          </select>
        </div>
  
        <!-- Budget Range -->
        <div>
          <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
            Project Budget
          </label>
          <select
            id="budget"
            v-model="form.budget"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Select budget range</option>
            <option value="under-2k">Under £2,000</option>
            <option value="2k-5k">£2,000 - £5,000</option>
            <option value="5k-10k">£5,000 - £10,000</option>
            <option value="10k-20k">£10,000 - £20,000</option>
            <option value="20k-plus">£20,000+</option>
            <option value="discuss">Let's discuss</option>
          </select>
        </div>
  
        <!-- Timeline -->
        <div>
          <label for="timeline" class="block text-sm font-medium text-gray-700 mb-2">
            Project Timeline
          </label>
          <select
            id="timeline"
            v-model="form.timeline"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-2-weeks">1-2 weeks</option>
            <option value="1-month">Within 1 month</option>
            <option value="2-3-months">2-3 months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
  
        <!-- Message Field -->
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
            Project Details *
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="6"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
            :class="{ 'border-red-500': errors.message }"
            placeholder="Tell me about your project, goals, and any specific requirements..."
          ></textarea>
          <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
          
          <!-- Character Count -->
          <div class="mt-1 text-right">
            <span class="text-sm text-gray-500">{{ form.message.length }}/2000</span>
          </div>
        </div>
  
        <!-- Honeypot field (hidden) -->
        <input
          type="text"
          v-model="form.honeypot"
          style="display: none;"
          tabindex="-1"
          autocomplete="off"
        />
  
        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubmitting" class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Send Message
            </span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          </button>
        </div>
  
        <!-- Form Footer -->
        <div class="text-center text-sm text-gray-500">
          <p>
            By submitting this form, you agree to our 
            <a href="/privacy" class="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </form>
  
      <!-- Success Message -->
      <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span class="text-green-800 font-medium">Message sent successfully! I'll get back to you within 24 hours.</span>
        </div>
      </div>
  
      <!-- Error Message -->
      <div v-if="showError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <span class="text-red-800 font-medium">{{ errorMessage }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  
  // Form data
  const form = reactive({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    honeypot: ''
  })
  
  // Form state
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  const showError = ref(false)
  const errorMessage = ref('')
  
  // Validation errors
  const errors = reactive({
    name: '',
    email: '',
    message: ''
  })
  
  // Validation functions
  const validateForm = () => {
    // Reset errors
    errors.name = ''
    errors.email = ''
    errors.message = ''
    
    let isValid = true
  
    // Name validation
    if (!form.name.trim()) {
      errors.name = 'Name is required'
      isValid = false
    } else if (form.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
      isValid = false
    }
  
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!emailPattern.test(form.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
  
    // Message validation
    if (!form.message.trim()) {
      errors.message = 'Message is required'
      isValid = false
    } else if (form.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
      isValid = false
    } else if (form.message.length > 2000) {
      errors.message = 'Message must be less than 2000 characters'
      isValid = false
    }
  
    return isValid
  }
  
  // Submit form
  const submitForm = async () => {
    // Reset messages
    showSuccess.value = false
    showError.value = false
    
    // Check honeypot
    if (form.honeypot) {
      console.log('Bot detected')
      return
    }
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    isSubmitting.value = true
    
    try {
      // Here you would typically send to your backend API
      // For now, we'll simulate the request
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })
      
      if (response.ok) {
        showSuccess.value = true
        resetForm()
        
        // Track successful submission
        if (typeof gtag !== 'undefined') {
          gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: 'Contact Form Success'
          })
        }
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      showError.value = true
      errorMessage.value = 'Failed to send message. Please try again or contact me directly.'
      
      // Track failed submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_error', {
          event_category: 'Contact',
          event_label: 'Contact Form Error'
        })
      }
    } finally {
      isSubmitting.value = false
    }
  }
  
  // Reset form
  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.company = ''
    form.service = ''
    form.budget = ''
    form.timeline = ''
    form.message = ''
    form.honeypot = ''
  }
  </script>
  
  <style scoped>
  /* Loading spinner animation */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  /* Focus styles */
  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }
  
  /* Transition effects */
  input,
  select,
  textarea,
  button {
    transition: all 0.2s ease-in-out;
  }
  
  /* Error state styles */
  .border-red-500:focus {
    ring-color: #ef4444;
    border-color: #ef4444;
  }
  
  /* Character counter */
  textarea ~ div {
    margin-top: 0.25rem;
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    .p-8 {
      padding: 1.5rem;
    }
  }
  </style>