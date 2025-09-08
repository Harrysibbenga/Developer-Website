<!-- src/components/ui/LegalSection.vue -->
<template>
  <section 
    :id="id" 
    class="legal-section scroll-mt-20"
    :class="{ 'highlighted': highlight }"
  >
    <div class="flex items-start mb-6">
      <div 
        class="w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
        :class="highlight ? 'bg-blue-100' : 'bg-gray-100'"
      >
        <span class="text-2xl">{{ icon }}</span>
      </div>
      <div class="flex-1">
        <h2 
          class="text-2xl sm:text-3xl font-bold mb-4 cursor-pointer flex items-center group"
          @click="toggleSection"
          :class="highlight ? 'text-blue-900' : 'text-gray-900'"
        >
          {{ title }}
          <svg 
            class="w-5 h-5 ml-2 transform transition-transform group-hover:scale-110"
            :class="{ 'rotate-90': isExpanded }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </h2>
      </div>
    </div>
    
    <div 
      class="content-area transition-all duration-300 ease-in-out overflow-hidden"
      :class="{ 'max-h-0': !isExpanded, 'max-h-none': isExpanded }"
    >
      <div 
        class="prose prose-lg max-w-none"
        :class="{
          'prose-blue': highlight,
          'prose-gray': !highlight
        }"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  id: string
  title: string
  icon: string
  highlight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  highlight: false
})

const isExpanded = ref(true)

const toggleSection = () => {
  isExpanded.value = !isExpanded.value
}

// Expand section if URL hash matches
onMounted(() => {
  if (window.location.hash === `#${props.id}`) {
    isExpanded.value = true
    // Smooth scroll to section
    setTimeout(() => {
      document.getElementById(props.id)?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }, 100)
  }
})
</script>

<style scoped>
.legal-section {
  @apply border-b border-gray-200 pb-8 mb-8;
}

.legal-section.highlighted {
  @apply bg-blue-50 rounded-2xl p-6 border border-blue-200;
}

.content-area {
  transition: max-height 0.3s ease-in-out;
}

.prose {
  @apply text-gray-700 leading-relaxed;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-900 mt-8 mb-4;
}

.prose h4 {
  @apply text-lg font-semibold text-gray-800 mt-6 mb-3;
}

.prose ul {
  @apply space-y-2 my-4;
}

.prose li {
  @apply text-gray-700;
}

.prose p {
  @apply text-gray-700 leading-relaxed mb-4;
}

.prose strong {
  @apply font-semibold text-gray-900;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800 underline;
}

.prose-blue h3,
.prose-blue h4 {
  @apply text-blue-900;
}

.prose-blue strong {
  @apply text-blue-800;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .legal-section {
    @apply px-4 py-6;
  }
  
  .legal-section.highlighted {
    @apply p-4;
  }
}
</style>