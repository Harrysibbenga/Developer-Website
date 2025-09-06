<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{
      'bg-white/95 backdrop-blur-sm shadow-lg': isScrolled,
      'bg-transparent': !isScrolled
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <a 
            href="/" 
            class="flex items-center space-x-3 group"
            @click="closeMobileMenu"
          >
            <!-- Logo Icon -->
            <div 
              class="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300"
            >
              <span class="text-white font-bold text-lg lg:text-xl">HS</span>
            </div>
            
            <!-- Brand Text -->
            <div class="hidden sm:block">
              <div 
                class="font-bold text-lg lg:text-xl transition-colors"
                :class="isScrolled ? 'text-gray-900' : 'text-white'"
              >
                {{ BUSINESS_INFO.name }}
              </div>
              <div 
                class="text-sm transition-colors"
                :class="isScrolled ? 'text-gray-600' : 'text-blue-200'"
              >
                {{ BUSINESS_INFO.tagline }}
              </div>
            </div>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <a
            v-for="link in navigationLinks"
            :key="link.name"
            :href="link.path"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 nav-link"
            :class="[
              isCurrentPage(link.path) ? 'nav-link-active' : 'nav-link-default',
              isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
            ]"
            @click="handleNavClick(link.path)"
          >
            <component :is="link.icon" class="w-4 h-4" />
            <span>{{ link.name }}</span>
          </a>
        </div>

        <!-- CTA Button (Desktop) -->
        <div class="hidden lg:flex items-center space-x-4">
          <a
            href="/contact"
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <MessageCircle class="w-4 h-4 mr-2" />
            Get Quote
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
          <button
            type="button"
            class="p-2 rounded-lg transition-colors duration-300"
            :class="isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
            @click="toggleMobileMenu"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isMobileMenuOpen"
        class="lg:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50 shadow-lg"
      >
        <div class="px-4 py-6 space-y-3">
          <!-- Mobile Navigation Links -->
          <a
            v-for="link in navigationLinks"
            :key="link.name"
            :href="link.path"
            class="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300"
            :class="[
              isCurrentPage(link.path) 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
            ]"
            @click="handleMobileNavClick(link.path)"
          >
            <component :is="link.icon" class="w-5 h-5" />
            <span>{{ link.name }}</span>
            <ChevronRight 
              v-if="isCurrentPage(link.path)" 
              class="w-4 h-4 ml-auto text-blue-500" 
            />
          </a>

          <!-- Mobile CTA -->
          <div class="pt-4 border-t border-gray-200">
            <a
              href="/contact"
              class="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
              @click="closeMobileMenu"
            >
              <MessageCircle class="w-5 h-5" />
              <span>Get Quote</span>
            </a>
          </div>

          <!-- Contact Info -->
          <div class="pt-4 border-t border-gray-200">
            <div class="text-sm text-gray-600 space-y-2">
              <div class="flex items-center space-x-2">
                <Mail class="w-4 h-4 text-gray-400" />
                <a 
                  :href="`mailto:${BUSINESS_INFO.contact.email}`"
                  class="hover:text-blue-600 transition-colors"
                >
                  {{ BUSINESS_INFO.contact.email }}
                </a>
              </div>
              <div class="flex items-center space-x-2">
                <Phone class="w-4 h-4 text-gray-400" />
                <a 
                  :href="`tel:${BUSINESS_INFO.contact.phone}`"
                  class="hover:text-blue-600 transition-colors"
                >
                  {{ BUSINESS_INFO.contact.phone }}
                </a>
              </div>
              <div class="flex items-center space-x-2">
                <MapPin class="w-4 h-4 text-gray-400" />
                <span>{{ BUSINESS_INFO.contact.address.city }}, {{ BUSINESS_INFO.contact.address.country }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile Menu Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="isMobileMenuOpen"
        class="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden -z-10"
        @click="closeMobileMenu"
        aria-hidden="true"
      />
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  Home, 
  Briefcase, 
  Code2, 
  FolderOpen, 
  MessageCircle, 
  User,
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-vue-next'
import { BUSINESS_INFO } from '../../utils/constants'

// Navigation links configuration
const navigationLinks = [
  {
    name: 'Home',
    path: '/',
    icon: Home
  },
  {
    name: 'Services',
    path: '/#services',
    icon: Briefcase
  },
  {
    name: 'Tech Stack',
    path: '/#tech-stack',
    icon: Code2
  },
  {
    name: 'Portfolio',
    path: '/#portfolio',
    icon: FolderOpen
  },
  {
    name: 'About',
    path: '/about',
    icon: User
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: MessageCircle
  }
] as const

// Reactive state
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

// Get current page path
const getCurrentPath = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname + window.location.hash
  }
  return '/'
}

// Check if current page matches link
const isCurrentPage = (path: string): boolean => {
  const currentPath = getCurrentPath()
  
  // Handle home page
  if (path === '/') {
    