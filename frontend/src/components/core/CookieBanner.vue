<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCookieConsent } from '../../composables/useCookieConsent'
import CookieModal from './CookieModal.vue'

const { consent, acceptAll, rejectAll } = useCookieConsent()
const show = ref(false)
const modalRef = ref<InstanceType<typeof CookieModal> | null>(null)

onMounted(() => {
  if (!consent.value) {
    // No consent yet, show banner
    show.value = true
  }
})

function openCustomize() {
  modalRef.value?.open()
}
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="show"
      class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50"
    >
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex-1">
          <p class="text-sm">
            We use cookies to enhance your browsing experience and analyze our traffic. 
            <a href="/cookies" class="underline hover:text-blue-300">Learn more</a>
          </p>
        </div>
        <div class="flex gap-3">
          <button 
            @click="openCustomize"
            class="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Customize
          </button>
          <button 
            @click="rejectAll(); show = false"
            class="px-4 py-2 text-sm border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reject
          </button>
          <button 
            @click="acceptAll(); show = false"
            class="px-4 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
      <!-- Attach CookieModal -->
      <CookieModal ref="modalRef" />
    </div>
  </transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
