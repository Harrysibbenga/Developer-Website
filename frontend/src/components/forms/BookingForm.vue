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

    <!-- Error Message -->
    <div v-if="formHandler.hasFieldError('general')" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
        <span class="text-red-800 font-medium">{{ formHandler.getFieldErrors('general')[0] }}</span>
      </div>
    </div>

    <!-- Loading Overlay for Form -->
    <div v-if="formHandler.getState().loading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
        <div class="w-16 h-16 mx-auto mb-4">
          <svg class="animate-spin w-16 h-16 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Submitting Your Request</h3>
        <p class="text-gray-600">Please wait while we process your project details...</p>
        <div class="mt-4 bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full animate-pulse" style="width: 75%"></div>
        </div>
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
              What type of project do you need? *
            </label>
            <div class="grid md:grid-cols-2 gap-4">
              <div 
                v-for="(service, key) in SERVICES" 
                :key="key"
                class="service-option relative cursor-pointer"
                :class="{ 'selected': formData.service_type === key }"
                @click="updateField('service_type', key)"
              >
                <input 
                  type="radio" 
                  :value="key" 
                  :checked="formData.service_type === key"
                  @change="updateField('service_type', key)"
                  class="sr-only"
                  required
                />
                <div class="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-md"
                     :class="formHandler.hasFieldError('service_type') ? 'border-red-300 bg-red-50' : ''">
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
            <p v-if="formHandler.hasFieldError('service_type')" class="mt-2 text-sm text-red-600 font-medium">
              {{ formHandler.getFieldErrors('service_type')[0] }}
            </p>
          </div>

          <!-- Basic Project Info -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="projectName" class="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                id="projectName"
                :value="formData.project_name"
                @input="updateField('project_name', $event.target.value)"
                @blur="validateField('project_name')"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                :class="formHandler.hasFieldError('project_name') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                placeholder="e.g., Company Website Redesign"
                required
              />
              <p v-if="formHandler.hasFieldError('project_name')" class="mt-1 text-sm text-red-600 font-medium">
                {{ formHandler.getFieldErrors('project_name')[0] }}
              </p>
            </div>
            
            <div>
              <label for="timeline" class="block text-sm font-medium text-gray-700 mb-2">
                Preferred Timeline *
              </label>
              <select
                id="timeline"
                :value="formData.timeline"
                @change="updateField('timeline', $event.target.value)"
                @blur="validateField('timeline')"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                :class="formHandler.hasFieldError('timeline') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                required
              >
                <option value="">Select timeline</option>
                <option v-for="timeline in CONTACT_CONFIG.timelines" :key="timeline" :value="timeline">
                  {{ timeline }}
                </option>
              </select>
              <p v-if="formHandler.hasFieldError('timeline')" class="mt-1 text-sm text-red-600 font-medium">
                {{ formHandler.getFieldErrors('timeline')[0] }}
              </p>
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
              Project Description *
            </label>
            <textarea
              id="projectDescription"
              :value="formData.description"
              @input="updateField('description', $event.target.value)"
              @blur="validateField('description')"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              :class="formHandler.hasFieldError('description') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
              placeholder="Please describe your project requirements, goals, and any specific functionality you need..."
              required
            ></textarea>
            <p v-if="formHandler.hasFieldError('description')" class="mt-1 text-sm text-red-600 font-medium">
              {{ formHandler.getFieldErrors('description')[0] }}
            </p>
            <div class="mt-1 text-right">
              <span class="text-sm" :class="characterCountColor">
                {{ formData.description.length }}/2000
              </span>
            </div>
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
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    :value="formData.first_name"
                    @input="updateField('first_name', $event.target.value)"
                    @blur="validateField('first_name')"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    :class="formHandler.hasFieldError('first_name') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                    required
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
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    :class="formHandler.hasFieldError('last_name') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                    required
                  />
                  <p v-if="formHandler.hasFieldError('last_name')" class="mt-1 text-sm text-red-600 font-medium">
                    {{ formHandler.getFieldErrors('last_name')[0] }}
                  </p>
                </div>
              </div>

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
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  :class="formHandler.hasFieldError('email') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                  required
                />
                <p v-if="formHandler.hasFieldError('email')" class="mt-1 text-sm text-red-600 font-medium">
                  {{ formHandler.getFieldErrors('email')[0] }}
                </p>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  :value="formData.phone"
                  @input="updateField('phone', $event.target.value)"
                  @blur="validateField('phone')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  :class="formHandler.hasFieldError('phone') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                />
                <p v-if="formHandler.hasFieldError('phone')" class="mt-1 text-sm text-red-600 font-medium">
                  {{ formHandler.getFieldErrors('phone')[0] }}
                </p>
              </div>

              <div>
                <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  :value="formData.company"
                  @input="updateField('company', $event.target.value)"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label for="website" class="block text-sm font-medium text-gray-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  id="website"
                  :value="formData.website"
                  @input="updateField('website', $event.target.value)"
                  @blur="validateField('website')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  :class="formHandler.hasFieldError('website') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                  placeholder="https://example.com"
                />
                <p v-if="formHandler.hasFieldError('website')" class="mt-1 text-sm text-red-600 font-medium">
                  {{ formHandler.getFieldErrors('website')[0] }}
                </p>
              </div>

              <div>
                <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range *
                </label>
                <select
                  id="budget"
                  :value="formData.budget_range"
                  @change="updateField('budget_range', $event.target.value)"
                  @blur="validateField('budget_range')"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  :class="formHandler.hasFieldError('budget_range') ? 'border-red-300 bg-red-50 focus:ring-red-500' : ''"
                  required
                >
                  <option value="">Select budget range</option>
                  <option v-for="budget in CONTACT_CONFIG.budgetRanges" :key="budget" :value="budget">
                    {{ budget }}
                  </option>
                </select>
                <p v-if="formHandler.hasFieldError('budget_range')" class="mt-1 text-sm text-red-600 font-medium">
                  {{ formHandler.getFieldErrors('budget_range')[0] }}
                </p>
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
                  {{ formData.service_type ? SERVICES[formData.service_type]?.title : 'Not selected' }}
                </span>
              </div>

              <!-- Base Price -->
              <div class="flex justify-between items-center py-3 border-b border-blue-200">
                <span class="font-medium text-gray-700">Base Price</span>
                <span class="font-semibold text-gray-900">
                  {{ formData.service_type ? SERVICES[formData.service_type]?.startingPrice : '—' }}
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
          :disabled="formHandler.getState().loading"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft class="w-5 h-5 mr-2" />
          Previous
        </button>
        <div v-else></div>

        <button
          v-if="currentStep < totalSteps"
          type="button"
          @click="nextStep"
          :disabled="!canProceed || formHandler.getState().loading"
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <span v-if="!isValidating">Next</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Validating...
          </span>
          <ChevronRight class="w-5 h-5 ml-2" />
        </button>

        <button
          v-else
          type="submit"
          :disabled="formHandler.getState().loading || !canProceed || isValidating"
          class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <span v-if="!formHandler.getState().loading">Submit Project Request</span>
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
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
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
import { ref, computed, reactive } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { SERVICES, TECHNOLOGIES, CONTACT_CONFIG } from '../../utils/constants'
import { api, createFormHandler, validators } from '../../utils/api'
import type { BookingCreate, ServiceType } from '../../types/api'

// Form state
const currentStep = ref(1)
const totalSteps = ref(3)
const isSubmitted = ref(false)
const isValidating = ref(false)

// Initial form data matching API types
const initialFormData: BookingCreate = {
  service_type: '' as ServiceType,
  project_name: '',
  description: '',
  timeline: '',
  budget_range: '',
  technologies: [],
  features: [],
  additional_info: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  website: ''
}

// Form handler for API integration
const formHandler = createFormHandler(initialFormData)
const formData = reactive({ ...initialFormData })

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

// Update field helper
const updateField = (field: keyof BookingCreate, value: any) => {
  formData[field] = value
  formHandler.setField(field, value)
  
  // Clear field error when user starts typing
  if (formHandler.hasFieldError(field as string)) {
    formHandler.clearFieldErrors([field as string])
  }
}

// Individual field validation
const validateField = (field: keyof BookingCreate) => {
  const errors: Array<{ field: string; message: string }> = []
  
  switch (field) {
    case 'service_type':
      if (!formData.service_type) {
        errors.push({ field: 'service_type', message: 'Please select a service type' })
      }
      break
      
    case 'project_name':
      if (!formData.project_name?.trim()) {
        errors.push({ field: 'project_name', message: 'Project name is required' })
      } else if (formData.project_name.trim().length < 3) {
        errors.push({ field: 'project_name', message: 'Project name must be at least 3 characters' })
      } else if (formData.project_name.length > 100) {
        errors.push({ field: 'project_name', message: 'Project name must be less than 100 characters' })
      }
      break
      
    case 'timeline':
      if (!formData.timeline) {
        errors.push({ field: 'timeline', message: 'Please select a timeline' })
      }
      break
      
    case 'description':
      if (!formData.description?.trim()) {
        errors.push({ field: 'description', message: 'Project description is required' })
      } else if (formData.description.trim().length < 20) {
        errors.push({ field: 'description', message: 'Please provide a more detailed description (at least 20 characters)' })
      } else if (formData.description.length > 2000) {
        errors.push({ field: 'description', message: 'Description must be less than 2000 characters' })
      }
      break
      
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
      
    case 'website':
      if (formData.website && formData.website.trim()) {
        const urlError = validators.url(formData.website.trim())
        if (urlError) {
          errors.push({ field: 'website', message: urlError })
        }
      }
      break
      
    case 'budget_range':
      if (!formData.budget_range) {
        errors.push({ field: 'budget_range', message: 'Please select a budget range' })
      }
      break
  }
  
  // Clear existing errors for this field first
  formHandler.clearFieldErrors([field as string])
  
  // Set new errors if any
  if (errors.length > 0) {
    formHandler.setErrors([...formHandler.getState().errors.filter(e => e.field !== field), ...errors])
  }
}

// Client-side validation for step progression
const validateStep = async (step: number): Promise<boolean> => {
  isValidating.value = true
  formHandler.clearErrors()
  
  // Add a small delay to show validation state
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const errors: Array<{ field: string; message: string }> = []

  switch (step) {
    case 1:
      if (!formData.service_type) {
        errors.push({ field: 'service_type', message: 'Please select a service type' })
      }
      if (!formData.project_name?.trim()) {
        errors.push({ field: 'project_name', message: 'Project name is required' })
      } else if (formData.project_name.trim().length < 3) {
        errors.push({ field: 'project_name', message: 'Project name must be at least 3 characters' })
      }
      if (!formData.timeline) {
        errors.push({ field: 'timeline', message: 'Please select a timeline' })
      }
      break

    case 2:
      if (!formData.description?.trim()) {
        errors.push({ field: 'description', message: 'Project description is required' })
      } else if (formData.description.trim().length < 20) {
        errors.push({ field: 'description', message: 'Please provide a more detailed description (at least 20 characters)' })
      } else if (formData.description.length > 2000) {
        errors.push({ field: 'description', message: 'Description must be less than 2000 characters' })
      }
      break

    case 3:
      // Required fields validation
      const requiredFields = [
        { field: 'first_name', message: 'First name is required' },
        { field: 'last_name', message: 'Last name is required' },
        { field: 'email', message: 'Email address is required' },
        { field: 'budget_range', message: 'Please select a budget range' }
      ]
      
      requiredFields.forEach(({ field, message }) => {
        if (!formData[field as keyof BookingCreate] || !String(formData[field as keyof BookingCreate]).trim()) {
          errors.push({ field, message })
        }
      })
      
      // Additional validations
      if (formData.first_name && formData.first_name.trim().length < 2) {
        errors.push({ field: 'first_name', message: 'First name must be at least 2 characters' })
      }
      if (formData.last_name && formData.last_name.trim().length < 2) {
        errors.push({ field: 'last_name', message: 'Last name must be at least 2 characters' })
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

      // Website validation (if provided)
      if (formData.website && formData.website.trim()) {
        const urlError = validators.url(formData.website.trim())
        if (urlError) {
          errors.push({ field: 'website', message: urlError })
        }
      }
      break
  }

  isValidating.value = false

  if (errors.length > 0) {
    formHandler.setErrors(errors)
    return false
  }

  return true
}

// Computed properties
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.service_type && formData.project_name?.trim() && formData.timeline
    case 2:
      return formData.description?.trim() && formData.description.length >= 20
    case 3:
      return formData.first_name?.trim() && 
             formData.last_name?.trim() && 
             formData.email?.trim() && 
             formData.budget_range &&
             !formHandler.hasErrors()
    default:
      return false
  }
})

const characterCountColor = computed(() => {
  const length = formData.description?.length || 0
  if (length > 1800) return 'text-red-600'
  if (length > 1500) return 'text-yellow-600'
  return 'text-gray-500'
})

const projectComplexity = computed(() => {
  const featureCount = formData.features?.length || 0
  const techCount = formData.technologies?.length || 0
  const descriptionLength = formData.description?.length || 0
  
  const score = featureCount * 10 + techCount * 5 + Math.min(descriptionLength / 10, 20)
  
  if (score < 30) return 'Simple'
  if (score < 60) return 'Medium'
  return 'Complex'
})

const complexityPercentage = computed(() => {
  const featureCount = formData.features?.length || 0
  const techCount = formData.technologies?.length || 0
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
  const serviceType = formData.service_type
  
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
const nextStep = async () => {
  if (await validateStep(currentStep.value) && canProceed.value && currentStep.value < totalSteps.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    formHandler.clearErrors()
  }
}

const toggleTechnology = (tech: string) => {
  const index = formData.technologies.indexOf(tech)
  if (index > -1) {
    formData.technologies.splice(index, 1)
  } else {
    formData.technologies.push(tech)
  }
  formHandler.setField('technologies', formData.technologies)
}

const toggleFeature = (feature: string) => {
  const index = formData.features.indexOf(feature)
  if (index > -1) {
    formData.features.splice(index, 1)
  } else {
    formData.features.push(feature)
  }
  formHandler.setField('features', formData.features)
}

const handleSubmit = async () => {
  if (!await validateStep(3) || !canProceed.value) return
  
  // Prepare data for API submission
  const submissionData: BookingCreate = {
    service_type: formData.service_type,
    project_name: formData.project_name.trim(),
    description: formData.description.trim(),
    timeline: formData.timeline,
    budget_range: formData.budget_range,
    technologies: formData.technologies,
    features: formData.features,
    additional_info: '', // Can be populated from additional fields if needed
    first_name: formData.first_name.trim(),
    last_name: formData.last_name.trim(),
    email: formData.email.trim(),
    phone: formData.phone?.trim() || undefined,
    company: formData.company?.trim() || undefined,
    website: formData.website?.trim() || undefined
  }

  try {
    const result = await formHandler.submit(async (data) => {
      console.log('Submitting booking data:', data)
      return await api.bookings.create(submissionData)
    })

    if (result) {
      console.log('Booking created successfully:', result)
      isSubmitted.value = true
      
      // Track successful submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'booking_submit', {
          event_category: 'Booking',
          event_label: 'Booking Form Success',
          service_type: formData.service_type
        })
      }
    }
  } catch (error) {
    console.error('Booking submission error:', error)
    
    // Track failed submission
    if (typeof gtag !== 'undefined') {
      gtag('event', 'booking_error', {
        event_category: 'Booking',
        event_label: 'Booking Form Error'
      })
    }
  }
}

const closeSuccessModal = () => {
  isSubmitted.value = false
  // Reset form
  currentStep.value = 1
  Object.assign(formData, initialFormData)
  formHandler.reset(initialFormData)
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