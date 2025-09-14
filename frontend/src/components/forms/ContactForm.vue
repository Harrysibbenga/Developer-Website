<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 relative">
    <!-- Loading Overlay for Contact Form -->
    <div v-if="formHandler.getState().loading" class="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl z-10 flex items-center justify-center">
      <div class="text-center">
        <div class="w-12 h-12 mx-auto mb-4">
          <svg class="animate-spin w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Sending Your Message</h3>
        <p class="text-gray-600">Please wait while we send your inquiry...</p>
        <div class="mt-4 bg-gray-200 rounded-full h-1 max-w-xs mx-auto">
          <div class="bg-blue-600 h-1 rounded-full animate-pulse" style="width: 60%"></div>
        </div>
      </div>
    </div>

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
            @blur="validateField('first_name')"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            :class="formHandler.hasFieldError('first_name') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
            placeholder="Your first name"
          />
          <p v-if="formHandler.hasFieldError('first_name')" class="mt-1 text-sm text-red-600 font-medium">
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
            @blur="validateField('last_name')"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            :class="formHandler.hasFieldError('last_name') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
            placeholder="Your last name"
          />
          <p v-if="formHandler.hasFieldError('last_name')" class="mt-1 text-sm text-red-600 font-medium">
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
          @blur="validateField('email')"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="formHandler.hasFieldError('email') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
          placeholder="your.email@example.com"
        />
        <p v-if="formHandler.hasFieldError('email')" class="mt-1 text-sm text-red-600 font-medium">
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
          @blur="validateField('phone')"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="formHandler.hasFieldError('phone') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
          placeholder="+44 7XXX XXX XXX"
        />
        <p v-if="formHandler.hasFieldError('phone')" class="mt-1 text-sm text-red-600 font-medium">
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
          @blur="validateField('inquiry_type')"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="formHandler.hasFieldError('inquiry_type') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
        >
            <option value="">Select inquiry type</option>
            <option
            v-for="type in inquiryTypes"
            :key="type"
            :value="type"
            >
            {{ type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
            </option>
        </select>
        <p v-if="formHandler.hasFieldError('inquiry_type')" class="mt-1 text-sm text-red-600 font-medium">
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
          @blur="validateField('subject')"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          :class="formHandler.hasFieldError('subject') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
          placeholder="Brief description of your inquiry"
        />
        <p v-if="formHandler.hasFieldError('subject')" class="mt-1 text-sm text-red-600 font-medium">
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
          @blur="validateField('message')"
          rows="6"
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
          :class="formHandler.hasFieldError('message') ? 'border-red-500 bg-red-50 focus:ring-red-500' : ''"
          placeholder="Please provide details about your inquiry, questions, or how I can help you..."
        ></textarea>
        <p v-if="formHandler.hasFieldError('message')" class="mt-1 text-sm text-red-600 font-medium">
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
          :disabled="formHandler.getState().loading || !isFormValid || isValidating"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!formHandler.getState().loading && !isValidating" class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
            Send Message
          </span>
          <span v-else-if="isValidating" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Validating...
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
import type { ContactCreate } from '../../types/api'
import { InquiryType } from '../../types/api'


const inquiryTypes = Object.values(InquiryType);

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
const isValidating = ref(false)

// Update field helper
const updateField = (field: keyof ContactCreate, value: any) => {
  formData[field] = value
  formHandler.setField(field, value)
  
  // Clear field error when user starts typing
  if (formHandler.hasFieldError(field as string)) {
    formHandler.clearFieldErrors([field as string])
  }
}

// Individual field validation
const validateField = async (field: keyof ContactCreate) => {
  if (isValidating.value) return
  
  isValidating.value = true
  const errors: Array<{ field: string; message: string }> = []
  
  // Add small delay to show validation state
  await new Promise(resolve => setTimeout(resolve, 200))
  
  switch (field) {
    case 'first_name':
      if (!formData.first_name?.trim()) {
        errors.push({ field: 'first_name', message: 'First name is required' })
      } else if (formData.first_name.trim().length < 2) {
        errors.push({ field: 'first_name', message: 'First name must be at least 2 characters' })
      } else if (formData.first_name.length > 50) {
        errors.push({ field: 'first_name', message: 'First name must be less than 50 characters' })
      }
      break
      
    case 'last_name':
      if (!formData.last_name?.trim()) {
        errors.push({ field: 'last_name', message: 'Last name is required' })
      } else if (formData.last_name.trim().length < 2) {
        errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters' })
      } else if (formData.last_name.length > 50) {
        errors.push({ field: 'last_name', message: 'Last name must be less than 50 characters' })
      }
      break
      
    case 'email':
      if (!formData.email?.trim()) {
        errors.push({ field: 'email', message: 'Email address is required' })
      } else {
        const emailError = validators.email(formData.email.trim())
        if (emailError) {
          errors.push({ field: 'email', message: emailError })
        }
      }
      break
      
    case 'phone':
      if (formData.phone && formData.phone.trim()) {
        const phoneError = validators.phone(formData.phone.trim())
        if (phoneError) {
          errors.push({ field: 'phone', message: phoneError })
        }
      }
      break
      
    case 'inquiry_type':
      if (!formData.inquiry_type) {
        errors.push({ field: 'inquiry_type', message: 'Please select an inquiry type' })
      }
      break
      
    case 'subject':
      if (!formData.subject?.trim()) {
        errors.push({ field: 'subject', message: 'Subject is required' })
      } else if (formData.subject.trim().length < 5) {
        errors.push({ field: 'subject', message: 'Subject must be at least 5 characters' })
      } else if (formData.subject.length > 200) {
        errors.push({ field: 'subject', message: 'Subject must be less than 200 characters' })
      }
      break
      
    case 'message':
      if (!formData.message?.trim()) {
        errors.push({ field: 'message', message: 'Message is required' })
      } else if (formData.message.trim().length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters' })
      } else if (formData.message.length > 2000) {
        errors.push({ field: 'message', message: 'Message must be less than 2000 characters' })
      }
      break
  }
  
  // Clear existing errors for this field first
  formHandler.clearFieldErrors([field as string])
  
  // Set new errors if any
  if (errors.length > 0) {
    formHandler.setErrors([...formHandler.getState().errors.filter(e => e.field !== field), ...errors])
  }
  
  isValidating.value = false
}

// Computed properties
const isFormValid = computed(() => {
  return formData.first_name?.trim() &&
         formData.last_name?.trim() &&
         formData.email?.trim() &&
         formData.inquiry_type &&
         formData.subject?.trim() &&
         formData.message?.trim() && 
         formData.message.trim().length >= 10 &&
         !formHandler.hasErrors()
})

const characterCountColor = computed(() => {
  const length = formData.message?.length || 0
  if (length > 1800) return 'text-red-600'
  if (length > 1500) return 'text-yellow-600'
  return 'text-gray-500'
})

// Client-side validation
const validateForm = async (): Promise<boolean> => {
  isValidating.value = true
  formHandler.clearErrors()
  
  // Add delay to show validation state
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const errors: Array<{ field: string; message: string }> = []

  // Required fields validation
  const requiredFields = [
    { field: 'first_name', message: 'First name is required' },
    { field: 'last_name', message: 'Last name is required' },
    { field: 'email', message: 'Email address is required' },
    { field: 'inquiry_type', message: 'Please select an inquiry type' },
    { field: 'subject', message: 'Subject is required' },
    { field: 'message', message: 'Message is required' }
  ]
  
  requiredFields.forEach(({ field, message }) => {
    const value = formData[field as keyof ContactCreate]
    if (!value || !String(value).trim()) {
      errors.push({ field, message })
    }
  })

  // Length validations
  if (formData.first_name && formData.first_name.trim().length < 2) {
    errors.push({ field: 'first_name', message: 'First name must be at least 2 characters' })
  }
  if (formData.last_name && formData.last_name.trim().length < 2) {
    errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters' })
  }
  if (formData.subject && formData.subject.trim().length < 5) {
    errors.push({ field: 'subject', message: 'Subject must be at least 5 characters' })
  }
  if (formData.message && formData.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' })
  }

  // Email validation
  if (formData.email) {
    const emailError = validators.email(formData.email.trim())
    if (emailError) {
      errors.push({ field: 'email', message: emailError })
    }
  }

  // Phone validation (if provided)
  if (formData.phone && formData.phone.trim()) {
    const phoneError = validators.phone(formData.phone.trim())
    if (phoneError) {
      errors.push({ field: 'phone', message: phoneError })
    }
  }

  // Length limits
  if (formData.first_name && formData.first_name.length > 50) {
    errors.push({ field: 'first_name', message: 'First name must be less than 50 characters' })
  }
  if (formData.last_name && formData.last_name.length > 50) {
    errors.push({ field: 'last_name', message: 'Last name must be less than 50 characters' })
  }
  if (formData.subject && formData.subject.length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be less than 200 characters' })
  }
  if (formData.message && formData.message.length > 2000) {
    errors.push({ field: 'message', message: 'Message must be less than 2000 characters' })
  }

  isValidating.value = false

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
  if (!await validateForm()) {
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
  isValidating.value = false
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