<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-br from-gray-600 via-slate-600 to-gray-700 text-white relative overflow-hidden">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <!-- Loading State -->
        <div v-if="state === 'loading'" class="animate-fade-in">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-spin">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold mb-4">
            Processing Your Request
          </h1>
          <p class="text-xl text-gray-100">
            Please wait while we unsubscribe you from our newsletter...
          </p>
        </div>

        <!-- Confirmation State -->
        <div v-else-if="state === 'confirmation'" class="animate-fade-in">
          <div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6">
            Confirm Unsubscription
          </h1>
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <p class="text-lg text-gray-100 mb-6">
              Are you sure you want to unsubscribe from our newsletter?
            </p>
            <p class="text-sm text-gray-300 mb-6">
              Email: {{ props.email }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                @click="handleUnsubscribe"
                class="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300"
              >
                Yes, Unsubscribe Me
              </button>
              <button
                @click="cancelUnsubscribe"
                class="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Keep My Subscription
              </button>
            </div>
          </div>
        </div>

        <!-- Success State -->
        <div v-else-if="state === 'success'" class="animate-fade-in">
          <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6">
            Successfully Unsubscribed
          </h1>
          <p class="text-xl text-gray-100 mb-8">
            You have been successfully unsubscribed from our newsletter. We're sorry to see you go!
          </p>
          
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <h3 class="text-lg font-semibold mb-4">What happens next?</h3>
            <div class="text-sm text-gray-200 space-y-2">
              <p>• You will no longer receive our newsletter emails</p>
              <p>• Your email has been removed from our mailing list</p>
              <p>• You can resubscribe at any time from our website</p>
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
            Unsubscription Failed
          </h1>
          <p class="text-xl text-red-100 mb-8">
            {{ errorMessage }}
          </p>
          
          <div class="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-red-400/30">
            <h3 class="text-lg font-semibold mb-4">Possible Issues:</h3>
            <ul class="text-sm text-red-100 space-y-2 text-left max-w-md mx-auto">
              <li>• The unsubscribe link may have expired</li>
              <li>• You may already be unsubscribed</li>
              <li>• There was a temporary server issue</li>
            </ul>
          </div>
        </div>

        <!-- Already Unsubscribed State -->
        <div v-else-if="state === 'already-unsubscribed'" class="animate-fade-in">
          <div class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold mb-6">
            Already Unsubscribed
          </h1>
          <p class="text-xl text-blue-100 mb-8">
            This email address is already unsubscribed from our newsletter.
          </p>
        </div>

      </div>
    </section>

    <!-- Feedback Section -->
    <!-- <section v-if="showFeedback" class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Help Us Improve
          </h2>
          <p class="text-lg text-gray-600">
            Your feedback helps us create better content. Would you mind sharing why you're unsubscribing?
          </p>
        </div>

        <div class="max-w-2xl mx-auto">
          <div class="bg-gray-50 rounded-2xl p-6">
            <form v-if="!feedbackSubmitted" @submit.prevent="submitFeedback" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  Reason for unsubscribing (optional):
                </label>
                <div class="space-y-3">
                  <label class="flex items-center">
                    <input v-model="feedback.reason" type="radio" value="too_frequent" class="mr-3">
                    <span class="text-sm text-gray-600">Too many emails</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="feedback.reason" type="radio" value="not_relevant" class="mr-3">
                    <span class="text-sm text-gray-600">Content not relevant to me</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="feedback.reason" type="radio" value="changed_interests" class="mr-3">
                    <span class="text-sm text-gray-600">My interests have changed</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="feedback.reason" type="radio" value="never_subscribed" class="mr-3">
                    <span class="text-sm text-gray-600">I never subscribed to this</span>
                  </label>
                  <label class="flex items-center">
                    <input v-model="feedback.reason" type="radio" value="other" class="mr-3">
                    <span class="text-sm text-gray-600">Other reason</span>
                  </label>
                </div>
              </div>

              <div>
                <label for="feedback-message" class="block text-sm font-medium text-gray-700 mb-2">
                  Additional feedback (optional):
                </label>
                <textarea
                  id="feedback-message"
                  v-model="feedback.message"
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Any suggestions for improving our newsletter?"
                ></textarea>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  :disabled="feedbackSubmitting"
                  class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  {{ feedbackSubmitting ? 'Submitting...' : 'Submit Feedback' }}
                </button>
              </div>
            </form>

            <div v-else class="text-center animate-fade-in">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p class="text-gray-600">Your feedback has been submitted and will help us improve our newsletter.</p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

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

    <!-- Resubscribe Option -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Changed Your Mind?
          </h2>
          <p class="text-gray-600 mb-6">
            You can resubscribe to our newsletter at any time. We'd love to have you back!
          </p>
          <a
            href="/#newsletter-form"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Resubscribe to Newsletter
          </a>
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
  },
  autoConfirm: {
    type: Boolean,
    default: false
  }
})

const state = ref('loading')
const errorMessage = ref('')
const showFeedback = ref(false)
const feedbackSubmitted = ref(false)
const feedbackSubmitting = ref(false)

const feedback = ref({
  reason: '',
  message: ''
})

onMounted(async () => {
  console.log('Newsletter unsubscribe - Email:', props.email)
  console.log('Newsletter unsubscribe - Auto confirm:', props.autoConfirm)
  
  if (!props.email || props.email.trim() === '') {
    state.value = 'error'
    errorMessage.value = 'No email address provided in unsubscribe link.'
    return
  }
  
  if (props.autoConfirm) {
    // Auto-confirm unsubscription
    await handleUnsubscribe()
  } else {
    // Show confirmation dialog
    state.value = 'confirmation'
  }
})

async function handleUnsubscribe() {
  state.value = 'loading'
  
  try {
    console.log('Unsubscribing:', props.email)
    
    const response = await api.newsletter.unsubscribe(props.email.trim())
    
    if (response && response.success !== false) {
      state.value = 'success'
      showFeedback.value = true
    } else {
      state.value = 'error'
      errorMessage.value = 'Subscription not found or already unsubscribed.'
    }
    
  } catch (error) {
    console.error('Unsubscribe error:', error)
    
    if (error.status === 404) {
      state.value = 'already-unsubscribed'
    } else {
      state.value = 'error'
      errorMessage.value = 'Unable to unsubscribe. Please try again later or contact support.'
    }
  }
}

function cancelUnsubscribe() {
  window.location.href = '/'
}

async function submitFeedback() {
  feedbackSubmitting.value = true
  
  try {
    // You could send this to your API if you want to store feedback
    console.log('Feedback submitted:', feedback.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    feedbackSubmitted.value = true
  } catch (error) {
    console.error('Feedback submission failed:', error)
    alert('Failed to submit feedback. Please try again.')
  } finally {
    feedbackSubmitting.value = false
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

/* Form styling */
input[type="radio"]:checked {
  accent-color: #2563eb;
}

/* Focus states for accessibility */
input[type="radio"]:focus,
textarea:focus,
button:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>