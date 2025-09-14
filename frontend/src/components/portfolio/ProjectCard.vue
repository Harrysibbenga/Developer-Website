<script setup lang="ts">
import { defineProps } from "vue"
import type { Project } from "../../utils/projects"

interface Props {
  project: Project
  index: number
  filters: {
    technologies: string[]
  }
  toggleTechnology: (tech: string) => void
}

const props = defineProps<Props>()
</script>

<template>
  <article
    class="project-card group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500"
    :style="`--stagger: ${props.index * 80}ms`"
  >
    <!-- Image -->
    <div class="relative aspect-[16/10] overflow-hidden">
      <img
        :src="props.project.image"
        :alt="props.project.title"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <!-- Status Badge -->
      <div
        v-if="props.project.status === 'live'"
        class="absolute top-4 left-4 px-3 py-1 bg-green-600/90 rounded-full text-sm font-medium"
      >
        Live
      </div>
      <div
        v-else-if="props.project.status === 'consultation'"
        class="absolute top-4 left-4 px-3 py-1 bg-blue-600/90 rounded-full text-sm font-medium"
      >
        Consultation
      </div>
      <div
        v-else
        class="absolute top-4 left-4 px-3 py-1 bg-purple-600/90 rounded-full text-sm font-medium"
      >
        Case Study
      </div>

      <!-- Year -->
      <div class="absolute top-4 right-4 px-2 py-1 bg-gray-900/80 rounded text-sm font-medium">
        {{ props.project.year }}
      </div>

      <!-- Featured -->
      <div
        v-if="props.project.featured"
        class="absolute bottom-4 left-4 px-2 py-1 bg-yellow-600/80 rounded text-xs font-medium"
      >
        ⭐ Featured
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-2xl font-bold mb-3 group-hover:text-cyan-400">
        {{ props.project.title }}
      </h3>
      <p class="text-gray-300 text-lg mb-4">
        {{ props.project.description }}
      </p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in props.project.technologies.slice(0, 4)"
          :key="tech"
          class="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm cursor-pointer hover:bg-cyan-600 hover:text-white transition-all"
          :class="props.filters.technologies.includes(tech.toLowerCase()) ? 'bg-cyan-600 text-white' : ''"
          @click="props.toggleTechnology(tech)"
        >
          {{ tech }}
        </span>

        <span
          v-if="props.project.technologies.length > 4"
          class="px-3 py-1 bg-gray-600 text-gray-300 rounded-full text-sm"
        >
          +{{ props.project.technologies.length - 4 }} more
        </span>
      </div>

      <!-- Action buttons -->
      <div class="mt-6 space-y-3">
        <a
          v-if="project.status === 'live' && props.project.liveUrl"
          :href="props.project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full text-center px-4 py-3 rounded-lg font-semibold transition-all"
          :class="variant === 'dark'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-500'"
          >
          🚀 Live View
        </a>
        <a
          v-else
          href="/contact"
          class="block w-full text-center px-4 py-3 rounded-lg font-semibold transition-all"
          :class="variant === 'dark'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-blue-500 hover:to-cyan-500'"
          >
          💬 Discuss the Project
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--stagger, 0ms);
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
