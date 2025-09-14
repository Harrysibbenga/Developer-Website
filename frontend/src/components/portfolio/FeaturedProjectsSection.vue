<script setup lang="ts">
import { ref, computed } from "vue"
import { getFeaturedProjects, type Project } from "../../utils/projects"

const featuredProjects = ref<Project[]>(getFeaturedProjects())

// Show only the most recent 2 featured projects
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
        <div v-if="featuredProjects.length > 2" class="text-xs text-gray-400">
          Showing most recent 4
        </div>
      </div>
    </div>

    <!-- Featured Projects Grid -->
    <div class="featured-grid">
      <article
        v-for="(project, index) in displayedFeatured"
        :key="project.id"
        class="relative overflow-hidden rounded-2xl shadow-lg group"
      >
        <!-- Project Image -->
        <div class="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <!-- Overlay gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"
          />
          <!-- Top badges -->
          <div class="absolute top-4 left-4 flex flex-col gap-2">
            <span
              v-if="project.status === 'live'"
              class="px-3 py-1 text-sm font-medium bg-green-600/90 text-white rounded-full shadow"
              >Live</span
            >
            <span
              v-else-if="project.status === 'consultation'"
              class="px-3 py-1 text-sm font-medium bg-blue-600/90 text-white rounded-full shadow"
              >Consultation</span
            >
            <span
              v-else
              class="px-3 py-1 text-sm font-medium bg-purple-600/90 text-white rounded-full shadow"
              >Case Study</span
            >
          </div>
          <div
            v-if="project.featured"
            class="absolute top-4 right-4 px-3 py-1 text-xs font-semibold bg-yellow-500/90 text-white rounded-full shadow"
          >
            ⭐ Featured
          </div>
        </div>

        <!-- Content Overlay -->
        <div
          class="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-10 text-white"
        >
          <h3
            class="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-cyan-300 transition-colors"
          >
            {{ project.title }}
          </h3>
          <p
            class="text-base sm:text-lg text-gray-200 line-clamp-3 mb-4 max-w-2xl"
          >
            {{ project.description }}
          </p>

          <!-- Technologies -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span
              v-for="tech in project.technologies.slice(0, 3)"
              :key="tech"
              class="px-3 py-1 bg-white/10 backdrop-blur-sm text-sm rounded-full border border-white/20"
            >
              {{ tech }}
            </span>
            <span
              v-if="project.technologies.length > 3"
              class="px-3 py-1 bg-white/10 text-sm rounded-full border border-white/20"
            >
              +{{ project.technologies.length - 3 }} more
            </span>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
            >
              View Live
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6h4m4 0h-4m0 0v4m0-4l-8 8"
                />
              </svg>
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </article>
    </div>

    <!-- View All Featured Link -->
    <div v-if="featuredProjects.length > 2" class="text-center mt-10">
      <a
        href="#all-projects"
        class="inline-flex items-center px-8 py-4 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors font-semibold text-lg"
      >
        View All Featured Projects
        <svg
          class="w-6 h-6 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
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
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .featured-grid {
    gap: 3rem;
  }
}

/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
