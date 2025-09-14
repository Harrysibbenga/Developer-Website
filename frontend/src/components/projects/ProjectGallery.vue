<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { cookieConsent } from "../../stores/cookieStore"
import { useDebounceFn } from "@vueuse/core"

const analyticsEnabled = computed(() => cookieConsent.value?.analytics === true)

import {
  getAllProjects,
  getUniqueCategories,
  getProjectYears,
  getSortingOptions,
  filterProjects,
  sortProjects,
  getFilterStats,
  type Project,
} from "../../utils/projects"

// ✅ variant prop (light or dark)
const props = defineProps<{
  variant?: "dark" | "light"
}>()

const variant = computed(() => props.variant ?? "dark")

// Core data
const allProjects = ref<Project[]>(getAllProjects())
const categories = ref<string[]>(getUniqueCategories())
const years = ref<number[]>(getProjectYears())
const sortOptions = ref(getSortingOptions())

// Filter state
const filters = ref<{
  category: string
  technologies: string[]
  search: string
  status: '' | 'live' | 'consultation' | 'case-study'
  year?: number
  featured?: boolean
}>({
  category: 'All',
  technologies: [],
  search: '',
  status: '',
  year: undefined,
  featured: undefined
})

const sortBy = ref<string>('featured')
const showAdvanced = ref(false)

// Derived data (debounced)
const filteredProjects = ref<Project[]>(allProjects.value)

const applyFilters = useDebounceFn(() => {
  let projects = filterProjects(filters.value)
  projects = sortProjects(projects, sortBy.value)
  filteredProjects.value = projects
}, 250)

// Re-run filters whenever filters/sortBy change
watch([filters, sortBy], applyFilters, { deep: true, immediate: true })

const stats = computed(() => getFilterStats(filters.value))

// Actions
function clearFilters() {
  filters.value = {
    category: 'All',
    technologies: [],
    search: '',
    status: '',
    year: undefined,
    featured: undefined
  }
  sortBy.value = 'featured'
}

function toggleTechnology(tech: string) {
  const t = tech.toLowerCase()
  if (filters.value.technologies.includes(t)) {
    filters.value.technologies = filters.value.technologies.filter(x => x !== t)
  } else {
    filters.value.technologies = [...filters.value.technologies, t]
  }
}
</script>

<template>
  <div>
    <!-- Analytics Info -->
    <div
      class="mb-6 text-center text-sm"
      :class="variant === 'dark' ? 'text-gray-400' : 'text-gray-600'"
    >
      <p v-if="!analyticsEnabled">📉 Analytics disabled</p>
      <p v-else>📈 Analytics enabled</p>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="category in categories"
        :key="category"
        @click="filters.category = category"
        class="px-6 py-3 rounded-full font-medium transition-all duration-300"
        :class="filters.category === category
          ? 'active bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
          : variant === 'dark'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'"
      >
        {{ category }}
      </button>
    </div>

    <!-- Advanced Filters -->
<Transition name="filters">
  <div
    v-if="showAdvanced"
    class="rounded-xl p-6 mb-8 backdrop-blur-sm"
    :class="variant === 'dark'
      ? 'bg-gray-800/50'
      : 'bg-gray-50 border border-gray-200'"
  >
    <div class="grid md:grid-cols-3 gap-4">
      <!-- Search -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-700'"
        >
          Search
        </label>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Search by title, tech, client..."
          class="w-full px-4 py-2 rounded-lg"
          :class="variant === 'dark'
            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500'"
        />
      </div>

      <!-- Status -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-700'"
        >
          Status
        </label>
        <select
          v-model="filters.status"
          class="w-full px-4 py-2 rounded-lg"
          :class="variant === 'dark'
            ? 'bg-gray-700 border border-gray-600 text-white'
            : 'bg-white border border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500'"
        >
          <option value="">All</option>
          <option value="live">Live</option>
          <option value="consultation">Consultation</option>
          <option value="case-study">Case Study</option>
        </select>
      </div>

      <!-- Sort -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-700'"
        >
          Sort By
        </label>
        <select
          v-model="sortBy"
          class="w-full px-4 py-2 rounded-lg"
          :class="variant === 'dark'
            ? 'bg-gray-700 border border-gray-600 text-white'
            : 'bg-white border border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500'"
        >
          <option v-for="opt in sortOptions" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>
      </div>

      <!-- Year -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-700'"
        >
          Year
        </label>
        <select
          v-model="filters.year"
          class="w-full px-4 py-2 rounded-lg"
          :class="variant === 'dark'
            ? 'bg-gray-700 border border-gray-600 text-white'
            : 'bg-white border border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500'"
        >
          <option value="">All Years</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <!-- Featured -->
      <div>
        <label
          class="block text-sm font-medium mb-2"
          :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-700'"
        >
          Featured
        </label>
        <select
          v-model="filters.featured"
          class="w-full px-4 py-2 rounded-lg"
          :class="variant === 'dark'
            ? 'bg-gray-700 border border-gray-600 text-white'
            : 'bg-white border border-gray-300 text-gray-900 focus:ring-cyan-500 focus:border-cyan-500'"
        >
          <option :value="undefined">All</option>
          <option :value="true">Featured Only</option>
          <option :value="false">Non-Featured</option>
        </select>
      </div>
    </div>

    <div class="flex justify-between items-center mt-4">
      <button
        @click="showAdvanced = false"
        class="text-sm"
        :class="variant === 'dark'
          ? 'text-cyan-400 hover:text-cyan-300'
          : 'text-cyan-600 hover:text-cyan-500'"
      >
        Hide Advanced
      </button>
      <button
        @click="clearFilters"
        class="px-4 py-2 rounded-lg text-sm"
        :class="variant === 'dark'
          ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        Clear All Filters
      </button>
    </div>
  </div>
</Transition>

<!-- Toggle Advanced -->
<div v-if="!showAdvanced" class="text-center mb-8">
  <button
    @click="showAdvanced = true"
    class="text-sm font-medium"
    :class="variant === 'dark'
      ? 'text-cyan-400 hover:text-cyan-300'
      : 'text-cyan-600 hover:text-cyan-500'"
  >
    Show Advanced Filters
  </button>
</div>

    <!-- Projects Grid -->
    <TransitionGroup
      name="project"
      tag="div"
      class="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
    >
      <article
        v-for="(project, index) in filteredProjects"
        :key="project.id"
        class="project-card group relative rounded-2xl overflow-hidden border transition-all duration-500"
        :class="variant === 'dark'
          ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-cyan-500/50'
          : 'bg-white border-gray-200 hover:border-cyan-300 shadow-sm'"
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
            class="text-2xl font-bold mb-3 group-hover:text-cyan-400"
            :class="variant === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            {{ project.title }}
          </h3>
          <p
            class="text-lg mb-4"
            :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-600'"
          >
            {{ project.description }}
          </p>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.technologies.slice(0, 4)"
              :key="tech"
              class="px-3 py-1 rounded-full text-sm cursor-pointer transition-all"
              :class="[
                filters.technologies.includes(tech.toLowerCase())
                  ? 'bg-cyan-600 text-white'
                  : variant === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-cyan-600 hover:text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-cyan-100 hover:text-cyan-700'
              ]"
              @click="toggleTechnology(tech)"
            >
              {{ tech }}
            </span>
            <span
              v-if="project.technologies.length > 4"
              class="px-3 py-1 rounded-full text-sm"
              :class="variant === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'"
            >
              +{{ project.technologies.length - 4 }} more
            </span>
          </div>

          <!-- Action buttons -->
          <div class="mt-6 space-y-3">
            <a
              v-if="project.status === 'live' && project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full text-center px-4 py-3 rounded-lg font-semibold transition-all"
              :class="props.variant === 'dark'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600'"
              >
              🚀 Live View
            </a>
            <a
              v-else
              href="/contact"
              class="block w-full text-center px-4 py-3 rounded-lg font-semibold transition-all"
              :class="props.variant === 'dark'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 '
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-blue-600 hover:to-cyan-600'"
            >
              💬 Discuss the Project
            </a>
          </div>
          
        </div>
      </article>
    </TransitionGroup>

    <!-- Results Summary -->
    <div class="results-summary text-center mb-8">
      <p :class="variant === 'dark' ? 'text-gray-400' : 'text-gray-600'">
        Showing <span class="text-cyan-400 font-semibold">{{ stats.filtered }}</span>
        of <span class="text-cyan-400 font-semibold">{{ stats.total }}</span> projects
        <span v-if="stats.percentage < 100">({{ stats.percentage }}%)</span>
      </p>
    </div>

    <!-- No Results -->
    <div v-if="filteredProjects.length === 0" class="text-center py-12">
      <h3
        class="text-xl font-bold mb-2"
        :class="variant === 'dark' ? 'text-gray-300' : 'text-gray-800'"
      >
        No Projects Found
      </h3>
      <p
        class="mb-4"
        :class="variant === 'dark' ? 'text-gray-400' : 'text-gray-500'"
      >
        Try adjusting your filters or search terms.
      </p>
      <button
        @click="clearFilters"
        class="px-6 py-2 rounded-lg"
        :class="variant === 'dark'
          ? 'bg-cyan-600 text-white hover:bg-cyan-700'
          : 'bg-cyan-500 text-white hover:bg-cyan-600'"
      >
        Clear Filters
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Project card transitions */
.project-enter-active,
.project-leave-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); /* smoother easing */
  position: relative;
}
.project-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.97);
}
.project-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.project-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.project-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.97);
}
.project-move {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Stagger effect */
.project-card {
  transition-delay: var(--stagger, 0ms);
}

/* Advanced filters slide down */
.filters-enter-active,
.filters-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.filters-enter-from,
.filters-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-15px);
}
.filters-enter-to,
.filters-leave-from {
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
}
</style>
