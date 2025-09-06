<template>
  <div class="inline-flex items-center">
    <span class="font-mono text-cyan-400">{{ currentText }}</span>
    <span 
      class="inline-block w-0.5 h-6 ml-1 bg-cyan-400 animate-pulse"
      :class="{ 'opacity-100': showCursor, 'opacity-0': !showCursor }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Typing animation texts
const texts = [
  'Full-Stack Engineer',
  'Data Processing Expert', 
  'Real-time Systems Builder',
  'API Development Specialist',
  'Python Enthusiast',
  'Problem Solver'
]

const currentText = ref('')
const currentIndex = ref(0)
const isDeleting = ref(false)
const showCursor = ref(true)

let typingTimeout: ReturnType<typeof setTimeout>
let cursorTimeout: ReturnType<typeof setTimeout>

const typeSpeed = 100 // milliseconds per character
const deleteSpeed = 50 // milliseconds per character when deleting
const pauseTime = 2000 // pause between words

const typeWriter = () => {
  const current = texts[currentIndex.value]
  
  if (isDeleting.value) {
    // Deleting text
    currentText.value = current.substring(0, currentText.value.length - 1)
    
    if (currentText.value === '') {
      isDeleting.value = false
      currentIndex.value = (currentIndex.value + 1) % texts.length
      typingTimeout = setTimeout(typeWriter, typeSpeed)
    } else {
      typingTimeout = setTimeout(typeWriter, deleteSpeed)
    }
  } else {
    // Typing text
    currentText.value = current.substring(0, currentText.value.length + 1)
    
    if (currentText.value === current) {
      // Finished typing, pause then start deleting
      typingTimeout = setTimeout(() => {
        isDeleting.value = true
        typeWriter()
      }, pauseTime)
    } else {
      typingTimeout = setTimeout(typeWriter, typeSpeed)
    }
  }
}

const animateCursor = () => {
  showCursor.value = !showCursor.value
  cursorTimeout = setTimeout(animateCursor, 530)
}

onMounted(() => {
  // Start typing animation
  typeWriter()
  animateCursor()
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  if (cursorTimeout) clearTimeout(cursorTimeout)
})
</script>

<style scoped>
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
}

/* Smooth cursor animation */
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-pulse {
  animation: blink 1.06s infinite;
}
</style>