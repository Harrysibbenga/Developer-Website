<!-- src/components/sections/FAQAccordion.vue -->
<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-on-scroll">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <p class="text-xl text-gray-600">
          Common questions about working together and the development process.
        </p>
      </div>

      <div class="space-y-6 animate-on-scroll">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl"
        >
          <button 
            @click="toggleFAQ(index)"
            class="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            :aria-expanded="openFAQs.includes(index)"
            :aria-controls="`faq-content-${index}`"
          >
            <span class="text-lg font-semibold text-gray-900 pr-4">
              {{ faq.question }}
            </span>
            <svg 
              class="w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0"
              :class="{ 'rotate-180': openFAQs.includes(index) }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          
          <Transition
            name="accordion"
            @enter="onEnter"
            @leave="onLeave"
          >
            <div 
              v-if="openFAQs.includes(index)"
              :id="`faq-content-${index}`"
              class="px-8 py-6 border-t border-gray-100"
            >
              <p class="text-gray-600 leading-relaxed" v-html="faq.answer"></p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const openFAQs = ref([])

const faqs = reactive([
  {
    question: "How long does a typical project take?",
    answer: `Project timelines vary based on complexity and requirements. Simple web applications typically take 2-4 weeks, 
             while complex systems with multiple integrations may take 8-16 weeks. I provide detailed timeline estimates 
             during the initial consultation, including milestone breakdowns and delivery schedules.`
  },
  {
    question: "What technologies do you specialize in?",
    answer: `I specialize in Python development using Django and Flask frameworks, with Vue.js for frontend work. 
             I also work with PostgreSQL, MongoDB, Docker, and various cloud platforms (AWS, GCP, Azure). 
             My expertise includes real-time systems, data processing, API development, and modern web applications.`
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: `Yes! All projects include a 30-day support period for bug fixes and minor adjustments. I also offer 
             ongoing maintenance agreements for regular updates, feature additions, and technical support. Support 
             can be provided on an hourly basis or through monthly retainer agreements tailored to your needs.`
  },
  {
    question: "How do you handle project pricing?",
    answer: `I offer both fixed-price projects and hourly consulting. Fixed-price projects include a detailed scope, 
             timeline, and deliverables. Hourly work is billed at from £65/hour. All quotes include a breakdown of costs 
             and payment schedules. No hidden fees or surprise charges - everything is transparent from the start.`
  },
  {
    question: "What is your development process like?",
    answer: `My development process follows industry best practices: initial consultation and requirements gathering, 
             technical planning and architecture design, iterative development with regular check-ins, thorough testing, 
             deployment, and post-launch support. You'll receive regular updates and have opportunities to provide 
             feedback throughout the entire process.`
  },
  {
    question: "Do you work with international clients?",
    answer: `Absolutely! While I'm based in Milton Keynes, UK, I work with clients worldwide. I'm experienced in 
             managing remote projects and can accommodate different time zones for meetings and communication. 
             All project management and communication is handled digitally for seamless collaboration.`
  }
])

const toggleFAQ = (index) => {
  const faqIndex = openFAQs.value.indexOf(index)
  if (faqIndex > -1) {
    openFAQs.value.splice(faqIndex, 1)
  } else {
    openFAQs.value.push(index)
  }
}

// Smooth accordion animations
const onEnter = (el) => {
  el.style.height = '0'
  el.offsetHeight // force reflow
  el.style.height = el.scrollHeight + 'px'
}

const onLeave = (el) => {
  el.style.height = el.scrollHeight + 'px'
  el.offsetHeight // force reflow
  el.style.height = '0'
}

// Optional: Auto-close others when opening one (accordion behavior)
const toggleFAQExclusive = (index) => {
  if (openFAQs.value.includes(index)) {
    openFAQs.value = []
  } else {
    openFAQs.value = [index]
  }
}

// Expose methods for external control
defineExpose({
  openFAQ: (index) => {
    if (!openFAQs.value.includes(index)) {
      openFAQs.value.push(index)
    }
  },
  closeFAQ: (index) => {
    const faqIndex = openFAQs.value.indexOf(index)
    if (faqIndex > -1) {
      openFAQs.value.splice(faqIndex, 1)
    }
  },
  openAll: () => {
    openFAQs.value = faqs.map((_, index) => index)
  },
  closeAll: () => {
    openFAQs.value = []
  }
})
</script>

<style scoped>
/* Smooth slide-down accordion transition */
.slide-down-enter-active {
  transition: height 0.3s ease-out;
  overflow: hidden;
}

.slide-down-leave-active {
  transition: height 0.25s ease-in;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  height: 0;
}

.animate-on-scroll {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus styles for accessibility */
button:focus {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  button {
    padding: 1rem;
  }
  
  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .slide-down-enter-active,
  .slide-down-leave-active,
  .animate-on-scroll,
  svg {
    animation: none !important;
    transition: none !important;
  }
  
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: opacity 0.2s ease !important;
  }
}
</style>