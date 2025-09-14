<script setup lang="ts">
import { ref, computed } from "vue"
import { getFeaturedProjects, type Project } from "../../utils/projects"

const featuredProjects = ref<Project[]>(getFeaturedProjects())

// Show only the most recent 4 featured projects (2x2 grid)
const displayedFeatured = computed(() => featuredProjects.value.slice(0, 4))
</script>

<template>
  <section
    v-if="featuredProjects.length > 0"
    class="mb-20 border-b border-gray-200 pb-16"
  >
    <!-- Section Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4"
    >
      <div>
        <h2 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Featured Projects
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl">
          Showcasing the most impactful and innovative work
        </p>
      </div>
      <div class="flex flex-col sm:items-end gap-2">
        <div
          class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
        >
          {{ featuredProjects.length }} featured project{{
            featuredProjects.length !== 1 ? "s" : ""
          }}
        </div>
        <div v-if="featuredProjects.length > 4" class="text-xs text-gray-400">
          Showing most recent 4
        </div>
      </div>
    </div>

    <!-- Featured Projects Grid (2x2) -->
    <div class="featured-grid">
      <article
        v-for="(project, index) in displayedFeatured"
        :key="project.id"
        class="project-card group relative rounded-2xl overflow-hidden border transition-all duration-500 bg-white border-gray-200 hover:border-cyan-300 shadow-sm"
        :style="`--stagger: ${index * 80}ms`"
      >
        <!-- Image -->
        <div class="relative aspect-[16/10] overflow-hidden">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            v-if="project.status === 'live'"
            class="absolute top-4 left-4 px-3 py-1 bg-green-600/90 rounded-full text-sm font-medium text-white"
          >
            Live
          </div>
          <div
            v-else-if="project.status === 'consultation'"
            class="absolute top-4 left-4 px-3 py-1 bg-blue-600/90 rounded-full text-sm font-medium text-white"
          >
            Consultation
          </div>
          <div
            v-else
            class="absolute top-4 left-4 px-3 py-1 bg-purple-600/90 rounded-full text-sm font-medium text-white"
          >
            Case Study
          </div>
          <div
            class="absolute top-4 right-4 px-2 py-1 bg-gray-900/80 text-white rounded text-sm font-medium"
          >
            {{ project.year }}
          </div>
          <div
            v-if="project.featured"
            class="absolute bottom-4 left-4 px-2 py-1 bg-yellow-600/80 text-white rounded text-xs font-medium"
          >
            ⭐ Featured
          </div>
        </div>

        <!-- Content -->
        <div class="p-6">
          <h3
            class="text-2xl font-bold mb-3 group-hover:text-cyan-400 text-gray-900"
          >
            {{ project.title }}
          </h3>
          <p class="text-lg mb-6 text-gray-600">
            {{ project.description }}
          </p>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tech in project.technologies.slice(0, 4)"
              :key="tech"
              class="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-700 transition-all"
            >
              {{ tech }}
            </span>
            <span
              v-if="project.technologies.length > 4"
              class="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-600"
            >
              +{{ project.technologies.length - 4 }} more
            </span>
          </div>

          <!-- Action buttons -->
          <div class="space-y-3">
            <a
              v-if="project.status === 'live' && project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full text-center px-4 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600"
            >
              🚀 Live View
            </a>
            <a
              v-else
              href="/contact"
              class="block w-full text-center px-4 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600"
            >
              💬 Discuss the Project
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* Featured Projects Grid */
.featured-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr; /* Mobile: 1 column */
}

@media (min-width: 640px) {
  .featured-grid {
    grid-template-columns: repeat(2, 1fr); /* 2x2 grid */
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .featured-grid {
    gap: 3rem;
  }
}
</style>
