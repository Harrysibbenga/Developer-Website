<template>
  <div class="booking-form-container max-w-4xl mx-auto">
    <!-- Progress Indicator -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <span class="text-sm font-medium text-gray-600">Step {{ currentStep }} of {{ totalSteps }}</span>
        <span class="text-sm text-gray-500">{{ Math.round((currentStep / totalSteps) * 100) }}% Complete</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Form Steps -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      
      <!-- Step 1: Project Type & Basic Info -->
      <div v-show="currentStep === 1" class="form-step animate-fade-in">
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Let's Start Your Project
          </h2>
          <p class="text-gray-600 mb-8">
            Tell me about your project requirements and I'll provide a customized quote.
          </p>

          <!-- Service Selection -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-900 mb-4">
              What type of project do you need?
            </label>
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="(service, key) in SERVICES" 
                :key="key"
                class="service-option relative cursor-pointer"
                :class="{ 'selected': formData.serviceType === key }"
                @click="formData.serviceType = key"
              >
                <input 
                  type="radio" 
                  :value="key" 
                  v-model="formData.serviceType"
                  class="sr-only"
                  required
                />
                <div class="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md">
                  <div class="flex items-start space-x-4">
                    <div class="text-3xl">{{ service.icon }}</div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg text-gray-900 mb-2">
                        {{ service.title }}
                      </h3>
                      <p class="text-gray-600 text-sm mb-3">
                        {{ service.description }}
                      </p>
                      <div class="text-blue-600 font-semibold">
                        Starting at {{ service.startingPrice }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Basic Project Info -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="projectName" class="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                v-model="formData.projectName"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Company Website Redesign"
                required
              />
            </div>
            
            <div>
              <label for="timeline" class="block text-sm font-medium text-gray-700 mb-2">
                Preferred Timeline
              </label>
              <select
                id="timeline"
                v-model="formData.timeline"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select timeline</option>
                <option v-for="timeline in CONTACT_CONFIG.timelines" :key="timeline" :value="timeline">
                  {{ timeline }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Technical Requirements -->
      <div v-show="currentStep === 2" class="form-step animate-fade-in">
        <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            Technical Requirements
          </h2>
          
          <!-- Technology Preferences -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-900 mb-4">
              Preferred Technologies (Optional)
            </label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div 
                v-for="tech in availableTechnologies" 
                :key="tech.name"
                class="tech-option"
                :class="{ 'selected': formData.technologies.includes(tech.name) }"
                @click="toggleTechnology(tech.name)"
              >
                <div class="p-3 border-2 rounded-lg text-center cursor-pointer transition-all duration-300 hover:shadow-sm">
                  <div class="text-2xl mb-2">{{ tech.icon }}</div>
                  <div class="text-sm font-medium">{{ tech.name }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Project Features -->
          <div class="mb-8">
            <label class="block text-lg font-semibold text-gray-900 mb-4">
              Required Features
            </label>
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="feature in projectFeatures" 
                :key="feature"
                class="feature-option"
                :class="{ 'selected': formData.features.includes(feature) }"
                @click="toggleFeature(feature)"
              >
                <div class="p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-sm">
                  <div class="flex items-center space-x-3">
                    <div class="w-5 h-5 rounded border-2 flex items-center justify-center">
                      <svg v-if="formData.features.includes(feature)" class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="font-medium">{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Project Description -->
          <div>
            <label for="projectDescription" class="block text-lg font-semibold text-gray-900 mb-4">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              v-model="formData.description"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please describe your project requirements, goals, and any specific functionality you need..."
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Step 3: Budget & Contact -->
      <div v-show="currentStep === 3" class="form-step animate-fade-in">
        <div class="grid lg:grid-cols-2 gap-8">
          
          <!-- Contact Information -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            
            <div class="space-y-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="formData.firstName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="formData.lastName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  v-model="formData.company"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  v-model="formData.budget"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select budget range</option>
                  <option v-for="budget in CONTACT_CONFIG.budgetRanges" :key="budget" :value="budget">
                    {{ budget }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Quote Estimation -->
          <div class="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-blue-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Project Estimate
            </h2>
            
            <div class="space-y-6">
              <!-- Service Type -->
              <div class="flex justify-between items-center py-3 border-b border-blue-200">
                <span class="font-medium text-gray-700">Service Type</span>
                <span class="font-semibold text-gray-900">
                  {{ formData.serviceType ? SERVICES[formData.serviceType]?.title : 'Not selected' }}
                </span>
              </div>

              <!-- Base Price -->
              <div class="flex justify-between items-center py-3 border-b border-blue-200">
                <span class="font-medium text-gray-700">Base Price</span>
                <span class="font-semibold text-gray-900">
                  {{ formData.serviceType ? SERVICES[formData.serviceType]?.startingPrice : '—' }}
                </span>
              </div>

              <!-- Features Count -->
              <div class="flex justify-between items-center py-3 border-b border-blue-200">
                <span class="font-medium text-gray-700">Selected Features</span>
                <span class="font-semibold text-gray-900">
                  {{ formData.features.length }} features
                </span>
              </div>

              <!-- Technologies -->
              <div class="flex justify-between items-center py-3 border-b border-blue-200">
                <span class="font-medium text-gray-700">Technologies</span>
                <span class="font-semibold text-gray-900">
                  {{ formData.technologies.length }} selected
                </span>
              </div>

              <!-- Complexity Indicator -->
              <div class="bg-white rounded-lg p-4 border border-blue-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-gray-700">Project Complexity</span>
                  <span class="font-semibold" :class="complexityColor">
                    {{ projectComplexity }}
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-500"
                    :class="complexityBarColor"
                    :style="{ width: `${complexityPercentage}%` }"
                  ></div>
                </div>
              </div>

              <!-- Estimated Timeline -->
              <div class="bg-white rounded-lg p-4 border border-blue-200">
                <h4 class="font-semibold text-gray-900 mb-2">Estimated Timeline</h4>
                <p class="text-gray-600">{{ estimatedTimeline }}</p>
              </div>

              <!-- Next Steps -->
              <div class="bg-blue-600 text-white rounded-lg p-4">
                <h4 class="font-semibold mb-2">What Happens Next?</h4>
                <ul class="text-sm space-y-1 opacity-90">
                  <li>• I'll review your requirements within 24 hours</li>
                  <li>• Schedule a free consultation call</li>
                  <li>• Provide detailed project proposal</li>
                  <li>• Begin development upon agreement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center pt-8 border-t border-gray-200">
        <button
          v-if="currentStep > 1"
          type="button"
          @click="previousStep"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300"
        >
          <ChevronLeft class="w-5 h-5 mr-2" />
          Previous
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < totalSteps"
          type="button"
          @click="nextStep"
          :disabled="!canProceed"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          Next
          <ChevronRight class="w-5 h-5 ml-2" />
        </button>

        <button
          v-else
          type="submit"
          :disabled="isSubmitting || !canProceed"
          class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <span v-if="!isSubmitting">Submit Project Request</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div 
      v-if="isSubmitted" 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click="closeSuccessModal"
    >
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Request Submitted!</h3>
        <p class="text-gray-600 mb-6">
          Thank you for your project request. I'll review your requirements and get back to you within 24 hours.
        </p>
        <button
          @click="closeSuccessModal"
          class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { SERVICES, TECHNOLOGIES, CONTACT_CONFIG } from '../../utils/constants'

// Form state
const currentStep = ref(1)
const totalSteps = ref(3)
const isSubmitting = ref(false)
const isSubmitted = ref(false)

// Form data
const formData = ref({
  serviceType: '',
  projectName: '',
  timeline: '',
  technologies: [] as string[],
  features: [] as string[],
  description: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  budget: ''
})

// Available technologies for selection
const availableTechnologies = [
  ...TECHNOLOGIES.backend,
  ...TECHNOLOGIES.frontend,
  ...TECHNOLOGIES.tools
]

// Project features options
const projectFeatures = [
  'User Authentication',
  'Database Integration',
  'API Development',
  'Real-time Features',
  'Payment Processing',
  'Admin Dashboard',
  'Mobile Responsive',
  'Email Notifications',
  'File Upload/Storage',
  'Search Functionality',
  'Data Analytics',
  'Third-party Integrations'
]

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.serviceType && formData.value.projectName && formData.value.timeline
    case 2:
      return formData.value.description.length > 20
    case 3:
      return formData.value.firstName && formData.value.lastName && formData.value.email && formData.value.budget
    default:
      return false
  }
})

const projectComplexity = computed(() => {
  const featureCount = formData.value.features.length
  const techCount = formData.value.technologies.length
  const descriptionLength = formData.value.description.length
  
  const score = featureCount * 10 + techCount * 5 + Math.min(descriptionLength / 10, 20)
  
  if (score < 30) return 'Simple'
  if (score < 60) return 'Medium'
  return 'Complex'
})

const complexityPercentage = computed(() => {
  const featureCount = formData.value.features.length
  const techCount = formData.value.technologies.length
  return Math.min(((featureCount + techCount) / 16) * 100, 100)
})

const complexityColor = computed(() => {
  const complexity = projectComplexity.value
  return {
    'text-green-600': complexity === 'Simple',
    'text-yellow-600': complexity === 'Medium',
    'text-red-600': complexity === 'Complex'
  }
})

const complexityBarColor = computed(() => {
  const complexity = projectComplexity.value
  return {
    'bg-green-500': complexity === 'Simple',
    'bg-yellow-500': complexity === 'Medium',
    'bg-red-500': complexity === 'Complex'
  }
})

const estimatedTimeline = computed(() => {
  const complexity = projectComplexity.value
  const serviceType = formData.value.serviceType
  
  if (!serviceType) return 'Select a service to see timeline'
  
  const baseTimelines = {
    webDevelopment: { Simple: '2-4 weeks', Medium: '4-8 weeks', Complex: '8-16 weeks' },
    dataProcessing: { Simple: '1-3 weeks', Medium: '3-6 weeks', Complex: '6-12 weeks' },
    realtimeSystems: { Simple: '3-6 weeks', Medium: '6-10 weeks', Complex: '10-20 weeks' },
    consultation: { Simple: '1-2 weeks', Medium: '2-4 weeks', Complex: '4-8 weeks' }
  }
  
  return baseTimelines[serviceType as keyof typeof baseTimelines]?.[complexity] || '2-8 weeks'
})

// Methods
const nextStep = () => {
  if (canProceed.value && currentStep.value < totalSteps.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const toggleTechnology = (tech: string) => {
  const index = formData.value.technologies.indexOf(tech)
  if (index > -1) {
    formData.value.technologies.splice(index, 1)
  } else {
    formData.value.technologies.push(tech)
  }
}

const toggleFeature = (feature: string) => {
  const index = formData.value.features.indexOf(feature)
  if (index > -1) {
    formData.value.features.splice(index, 1)
  } else {
    formData.value.features.push(feature)
  }
}

const handleSubmit = async () => {
  if (!canProceed.value) return
  
  isSubmitting.value = true
  
  try {
    // Here you would send the data to your backend
    console.log('Submitting form data:', formData.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    isSubmitted.value = true
  } catch (error) {
    console.error('Form submission error:', error)
    alert('There was an error submitting your request. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

const closeSuccessModal = () => {
  isSubmitted.value = false
  // Reset form
  currentStep.value = 1
  formData.value = {
    serviceType: '',
    projectName: '',
    timeline: '',
    technologies: [],
    features: [],
    description: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    budget: ''
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.service-option.selected {
  @apply ring-2 ring-blue-500;
}

.service-option.selected .border-2 {
  @apply border-blue-500 bg-blue-50;
}

.tech-option.selected {
  @apply ring-2 ring-blue-500;
}

.tech-option.selected .border-2 {
  @apply border-blue-500 bg-blue-50;
}

.feature-option.selected {
  @apply ring-2 ring-blue-500;
}

.feature-option.selected .border-2 {
  @apply border-blue-500 bg-blue-50;
}

.form-step {
  min-height: 400px;
}
</style>