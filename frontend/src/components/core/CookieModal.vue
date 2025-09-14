<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useCookieConsent } from '../../composables/useCookieConsent'

const { consent, acceptAll, rejectAll, saveConsent } = useCookieConsent()

const show = ref(false)
const analytics = ref(false)
const performance = ref(false)

// Keep analytics/performance checkboxes in sync with current consent
watch(consent, (newVal) => {
  if (newVal) {
    analytics.value = newVal.analytics
    performance.value = newVal.performance
  }
})

function open() {
  if (consent.value) {
    analytics.value = consent.value.analytics
    performance.value = consent.value.performance
  }
  show.value = true
}

function close() {
  show.value = false
}

function savePreferences() {
  saveConsent({
    essential: true,
    analytics: analytics.value,
    performance: performance.value,
    marketing: false,
    timestamp: new Date().toISOString()
  })
  close()
}

// expose so Vue parents can call
defineExpose({ open, close })

// 🔑 register globally so Astro pages/buttons can trigger it
onMounted(() => {
  window.showGlobalCookieModal = open
  window.closeGlobalCookieModal = close
})

onBeforeUnmount(() => {
  delete window.showGlobalCookieModal
  delete window.closeGlobalCookieModal
})
</script>


<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-900">Cookie Settings</h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <p class="text-gray-600 mb-6">
            Manage your cookie preferences below. Some cookies are essential for the website to function.
          </p>

          <!-- Essential -->
          <div class="border border-gray-200 rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-gray-900">Essential Cookies</h4>
              <div class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">Always Active</div>
            </div>
            <p class="text-sm text-gray-600">
              These cookies are necessary for the website to function and cannot be switched off.
            </p>
          </div>

          <!-- Analytics -->
          <div class="border border-gray-200 rounded-lg p-4 mb-4">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-gray-900">Analytics Cookies</h4>
              <input type="checkbox" v-model="analytics" class="h-5 w-5 text-blue-600" />
            </div>
            <p class="text-sm text-gray-600">
              Help us understand how visitors use our website to improve user experience.
            </p>
          </div>

          <!-- Performance -->
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-semibold text-gray-900">Performance Cookies</h4>
              <input type="checkbox" v-model="performance" class="h-5 w-5 text-blue-600" />
            </div>
            <p class="text-sm text-gray-600">
              Used to enhance the performance and functionality of our website.
            </p>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
            <button @click="acceptAll(); close()" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
              Accept All
            </button>
            <button @click="savePreferences" class="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
              Save Preferences
            </button>
            <button @click="rejectAll(); close()" class="flex-1 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50">
              Reject All
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
