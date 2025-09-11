<template>
  <div class="bg-white rounded-2xl shadow-xl p-8">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">Send a Message</h2>
      <p class="text-gray-600">
        Fill out the form below and I'll get back to you within 24 hours.
      </p>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Name Fields -->
      <div class="grid md:grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            :value="formData.first_name"
            @input="updateField('first_name', $event.target.value)"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500': formHandler.hasFieldError('first_name') }"
            placeholder="Your first name"
          />
          <p v-if="formHandler.hasFieldError('first_name')" class="mt-1 text-sm text-red-600">
            {{ formHandler.getFieldErrors('first_name')[0] }}
          </p>
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            :value="formData.last_name"
            @input="updateField('last_name', $event.target.value)"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500': formHandler.hasFieldError('last_name') }"
            placeholder="Your last name"
          />
          <p v-if="formHandler.hasFieldError('last_name')" class="mt-1 text-sm text-red-600">
            {{ formHandler.getFieldErrors('last_name')[0] }}
          </p>
        </div>
      </div>

      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          :value="formData.email"
          @input="updateField('email', $event.target.value)"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          :class="{ 'border-red-500': formHandler.hasFieldError('email') }"
          placeholder="your.email@example.com"
        />
        <p v-if="formHandler.hasFieldError('email')" class="mt-1 text-sm text-red-600">
          {{ formHandler.getFieldErrors('email')[0] }}
        </p>
      </div>

      <!-- Phone Field -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          :value="formData.phone"
          @input="updateField('phone', $event.target.value)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          :class="{ 'border-red-500': formHandler.hasFieldError('phone') }"
          placeholder="+44 7XXX XXX XXX"
        />
        <p v-if="formHandler.hasFieldError('phone')" class="mt-1 text-sm text-red-600">
          {{ formHandler.getFieldErrors('phone')[0] }}
        </p>
      </div>

      <!-- Company Field -->
      <div>
        <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
          Company/Organization
        </label>
        <input
          type="text"
          id="company"
          :value="formData.company"
          @input="updateField('company', $event.target.value)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Your company name"
        />
      </div>

      <!-- Inquiry Type -->
      <div>
        <label for="inquiryType" class="block text-sm font-medium text-gray-700 mb-2">
          Inquiry Type *
        </label>
        <select
          id="inquiryType"
          :value="formData.inquiry_type"
          @change="updateField('inquiry_type', $event.target.value)"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          :class="{ 'border-red-500': formHandler.hasFieldError('inquiry_type') }"
        >
          <option value="">Select inquiry type</option>
          <option value="general">General Inquiry</option>
          <option value="technical">Technical Question</option>
          <option value="collaboration">Collaboration Opportunity</option>
          <option value="support">Support Request</option>
        </select>
        <p v-if="formHandler.hasFieldError('inquiry_type')" class="mt-1 text-sm text-red-600">
          {{ formHandler.getFieldErrors('inquiry_type')[0] }}
        </p>
      </div>

      <!-- Subject Field -->
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          :value="formData.subject"
          @input="updateField('subject', $event.target.value)"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          :class="{ 'border-red-500': formHandler.hasFieldError('subject') }"
          placeholder="Brief description of your inquiry"
        />
        <p v-if="formHandler.hasFieldError('subject')" class="mt-1 text-sm text-red-600">
          {{ formHandler.getFieldErrors('subject')[0] }}
        </p>
      </div>

      <!-- Preferred Contact Method -->
      <div>
        <label for="contactMethod" class="block text-sm font-medium text-gray-700 mb-2">
          Preferred Contact Method
        </label>
        <select
          id="contactMethod"
          :value="formData.preferred_contact_method"
          @change="updateField('preferred_contact_method', $event.target.value)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <option value="">No preference</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="video_call">Video Call</option>
        </select>
      </div>

      <!-- Message Field -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          :value="formData.message"
          @input="updateField('message', $event.target.value)"
          rows="6"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
          :class="{ 'border-red-500': formHandler.hasFieldError('message') }"
          placeholder="Please provide details about your inquiry, questions, or how I can help you..."
        ></textarea>
        <p v-if="formHandler.hasFieldError('message')" class="mt-1 text-sm text-red-600">
          {{ formHandler.getFieldErrors('message')[0] }}
        </p>
        
        <!-- Character Count -->
        <div class="mt-1 text-right">
          <span class="text-sm" :class="characterCountColor">
            {{ formData.message.length }}/2000
          </span>
        </div>
      </div>

      <!-- Honeypot field (hidden) -->
      <input
        type="text"
        :value="honeypot"
        @input="honeypot = $event.target.value"
        style="display: none;"
        tabindex="-1"
        autocomplete="off"
      />

      <!-- General Error Message -->
      <div v-if="formHandler.hasFieldError('general')" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          <span class="text-red-800 font-medium">{{ formHandler.getFieldErrors('general')[0] }}</span>
        </div>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="formHandler.getState().loading || !isFormValid"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!formHandler.getState().loading" class="flex items-center justify-center">
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
        <div>
          <span class="text-green-800 font-medium">Message sent successfully!</span>
          <p class="text-green-700 text-sm mt-1">I'll get back to you within 24 hours.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { api, createFormHandler, validators } from '../../utils/api'
import type { ContactCreate, InquiryType } from '../../types/api'

// Initial form data matching API types
const initialFormData: ContactCreate = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  inquiry_type: '' as InquiryType,
  subject: '',
  message: '',
  preferred_contact_method: ''
}

// Form handler for API integration
const formHandler = createFormHandler(initialFormData)
const formData = reactive({ ...initialFormData })

// Form state
const showSuccess = ref(false)
const honeypot = ref('')

// Update field helper
const updateField = (field: keyof ContactCreate, value: any) => {
  formData[field] = value
  formHandler.setField(field, value)
}

// Computed properties
const isFormValid = computed(() => {
  return formData.first_name.trim() &&
         formData.last_name.trim() &&
         formData.email.trim() &&
         formData.inquiry_type &&
         formData.subject.trim() &&
         formData.message.trim().length >= 10
})

const characterCountColor = computed(() => {
  const length = formData.message.length
  if (length > 1800) return 'text-red-600'
  if (length > 1500) return 'text-yellow-600'
  return 'text-gray-500'
})

// Client-side validation
const validateForm = (): boolean => {
  formHandler.clearErrors()
  const errors: Array<{ field: string; message: string }> = []

  // First name validation
  if (!formData.first_name.trim()) {
    errors.push({ field: 'first_name', message: 'First name is required' })
  } else if (formData.first_name.trim().length < 2) {
    errors.push({ field: 'first_name', message: 'First name must be at least 2 characters' })
  }

  // Last name validation
  if (!formData.last_name.trim()) {
    errors.push({ field: 'last_name', message: 'Last name is required' })
  } else if (formData.last_name.trim().length < 2) {
    errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters' })
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' })
  } else {
    const emailError = validators.email(formData.email)
    if (emailError) {
      errors.push({ field: 'email', message: emailError })
    }
  }

  // Phone validation (if provided)
  if (formData.phone && formData.phone.trim()) {
    const phoneError = validators.phone(formData.phone)
    if (phoneError) {
      errors.push({ field: 'phone', message: phoneError })
    }
  }

  // Inquiry type validation
  if (!formData.inquiry_type) {
    errors.push({ field: 'inquiry_type', message: 'Please select an inquiry type' })
  }

  // Subject validation
  if (!formData.subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' })
  } else if (formData.subject.trim().length < 5) {
    errors.push({ field: 'subject', message: 'Subject must be at least 5 characters' })
  } else if (formData.subject.length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be less than 200 characters' })
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' })
  } else if (formData.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' })
  } else if (formData.message.length > 2000) {
    errors.push({ field: 'message', message: 'Message must be less than 2000 characters' })
  }

  if (errors.length > 0) {
    formHandler.setErrors(errors)
    return false
  }

  return true
}

// Submit form
const submitForm = async () => {
  // Reset success state
  showSuccess.value = false
  
  // Check honeypot for spam
  if (honeypot.value) {
    console.log('Spam detected via honeypot')
    return
  }
  
  // Validate form
  if (!validateForm()) {
    return
  }

  // Prepare data for API submission
  const submissionData: ContactCreate = {
    first_name: formData.first_name.trim(),
    last_name: formData.last_name.trim(),
    email: formData.email.trim(),
    phone: formData.phone?.trim() || undefined,
    company: formData.company?.trim() || undefined,
    inquiry_type: formData.inquiry_type,
    subject: formData.subject.trim(),
    message: formData.message.trim(),
    preferred_contact_method: formData.preferred_contact_method || undefined
  }

  try {
    const result = await formHandler.submit(async (data) => {
      console.log('Submitting contact data:', data)
      return await api.contacts.create(submissionData)
    })

    if (result) {
      console.log('Contact created successfully:', result)
      showSuccess.value = true
      resetForm()
      
      // Track successful submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_submit', {
          event_category: 'Contact',
          event_label: 'Contact Form Success',
          inquiry_type: formData.inquiry_type
        })
      }
    }
  } catch (error) {
    console.error('Contact submission error:', error)
    
    // Track failed submission
    if (typeof gtag !== 'undefined') {
      gtag('event', 'contact_error', {
        event_category: 'Contact',
        event_label: 'Contact Form Error'
      })
    }
  }
}

// Reset form
const resetForm = () => {
  Object.assign(formData, initialFormData)
  formHandler.reset(initialFormData)
  honeypot.value = ''
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